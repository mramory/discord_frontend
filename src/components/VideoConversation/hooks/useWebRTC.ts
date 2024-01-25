import { useCallback, useEffect, useRef } from "react";
import freeice from 'freeice';
import socket from "@/libs/socket.io";
import useStateWithCallback from "./useStateWithCallback";
import { useTypedSelector } from "@/hooks/useTypedSelector";

const ACTIONS = {
    JOIN: 'join',
    LEAVE: 'leave',
    SHARE_ROOMS: 'share-rooms',
    ADD_PEER: 'add-peer',
    REMOVE_PEER: 'remove-peer',
    RELAY_SDP: 'relay-sdp',
    RELAY_ICE: 'relay-ice',
    ICE_CANDIDATE: 'ice-candidate',
    SESSION_DESCRIPTION: 'session-description'
};

type ClientType = {
    newClient: string,
    img: string
}

type ReturnValue = {
    clients: ClientType[]
    provideMediaRef: (id: string, node: HTMLVideoElement) => void,
}

export const LOCAL_VIDEO = 'LOCAL_VIDEO';

export const useLocalStream = (conversationId: string): ReturnValue => {
    const [clients, updateClients] = useStateWithCallback([]);
    const muted = useTypedSelector(state => state.media.muted)

    const video = useTypedSelector(state => state.media.video)

    const avatar = useTypedSelector(state => state.auth.img)

    const addNewClient = useCallback(({ newClient, img }: { newClient: string, img: string }, cb: () => void) => {
        updateClients((list: string[]) => {
            if (!list.includes(newClient)) {
                return [...list, { newClient, img }]
            }

            return list;
        }, cb);
    }, [clients, updateClients]);

    const peerConnections = useRef<{ [key: string]: RTCPeerConnection }>({});
    const localMediaStream = useRef<MediaStream | null>(null);
    const peerMediaElements = useRef<{ [key: string]: HTMLVideoElement | null }>({
        [LOCAL_VIDEO]: null,
    });


    useEffect(() => {
        const startStream = async () => {
            localMediaStream.current = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: {
                    width: 720,
                    height: 400
                },
            });
            addNewClient({ newClient: LOCAL_VIDEO, img: avatar }, () => {
                const localVideoElement = peerMediaElements.current[LOCAL_VIDEO];

                if (localVideoElement) {
                    localVideoElement.volume = 0;
                    localVideoElement.srcObject = localMediaStream.current;
                }
            });
        };

        startStream()
            .then(() => socket.emit(ACTIONS.JOIN, { room: conversationId, img: avatar }))
            .catch(e => console.error('Error getting userMedia:', e));;

        return () => {
            localMediaStream.current?.getTracks().forEach((track) => track.stop());
            socket.emit(ACTIONS.LEAVE);
        };
    }, [conversationId]);

    useEffect(() => {
        if (localMediaStream.current) {
            localMediaStream.current.getAudioTracks()[0].enabled = !muted
        }
    }, [muted, localMediaStream.current])

    useEffect(() => {
        if (localMediaStream.current) {
            localMediaStream.current.getVideoTracks()[0].enabled = video
        }
    }, [video, localMediaStream.current])

    useEffect(() => {
        async function handleNewPeer({ peerID, createOffer, img }: { peerID: string, createOffer: boolean, img: string }) {
            if (peerID in peerConnections.current) {
                return console.warn(`Already connected to peer ${peerID}`);
            }

            peerConnections.current[peerID] = new RTCPeerConnection({
                iceServers: freeice(),
            });

            peerConnections.current[peerID].onicecandidate = event => {
                if (event.candidate) {
                    socket.emit(ACTIONS.RELAY_ICE, {
                        peerID,
                        iceCandidate: event.candidate,
                    });
                }
            }

            let tracksNumber = 0;
            peerConnections.current[peerID].ontrack = ({ streams: [remoteStream] }) => {
                tracksNumber++

                if (tracksNumber === 2) {
                    tracksNumber = 0;
                    addNewClient({ newClient: peerID, img }, () => {
                        if (peerMediaElements.current[peerID]) {
                            //@ts-ignore
                            peerMediaElements.current[peerID].srcObject = remoteStream;
                        }
                        else {
                            let settled = false;
                            const interval = setInterval(() => {
                                if (peerMediaElements.current[peerID]) {
                                    peerMediaElements.current[peerID]!.srcObject = remoteStream;
                                    settled = true;
                                }

                                if (settled) {
                                    clearInterval(interval);
                                }
                            }, 1000);
                        }
                    })
                }
            }

            localMediaStream.current?.getTracks().forEach(track => {
                if (localMediaStream.current) {
                    peerConnections.current[peerID].addTrack(track, localMediaStream.current);
                }
            });

            if (createOffer) {
                const offer = await peerConnections.current[peerID].createOffer();

                await peerConnections.current[peerID].setLocalDescription(offer);
                socket.emit(ACTIONS.RELAY_SDP, {
                    peerID,
                    img,
                    sessionDescription: offer,
                });
            }
        }

        socket.on(ACTIONS.ADD_PEER, handleNewPeer);

        return () => {
            socket.off(ACTIONS.ADD_PEER);
        }
    }, []);


    useEffect(() => {
        async function setRemoteMedia({ peerID, sessionDescription: remoteDescription }: { peerID: string, img: string, sessionDescription: RTCSessionDescriptionInit }) {
            await peerConnections.current[peerID]?.setRemoteDescription(
                new RTCSessionDescription(remoteDescription)
            );

            if (remoteDescription.type === 'offer') {
                const answer = await peerConnections.current[peerID].createAnswer();

                await peerConnections.current[peerID].setLocalDescription(answer);

                socket.emit(ACTIONS.RELAY_SDP, {
                    peerID,
                    img: avatar,
                    sessionDescription: answer,
                });
            }
        }

        socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia)

        return () => {
            socket.off(ACTIONS.SESSION_DESCRIPTION);
        }
    }, []);


    useEffect(() => {
        socket.on(ACTIONS.ICE_CANDIDATE, ({ peerID, iceCandidate }: { peerID: string, iceCandidate: RTCIceCandidateInit }) => {
            peerConnections.current[peerID]?.addIceCandidate(
                new RTCIceCandidate(iceCandidate)
            );
        });

        return () => {
            socket.off(ACTIONS.ICE_CANDIDATE);
        }
    }, []);


    useEffect(() => {
        const handleRemovePeer = ({ peerID }: { peerID: string }) => {
            if (peerConnections.current[peerID]) {
                peerConnections.current[peerID].close();
            }

            delete peerConnections.current[peerID];
            delete peerMediaElements.current[peerID];

            updateClients((list: string[]) => list.filter(c => c !== peerID));
        };

        socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

        return () => {
            socket.off(ACTIONS.REMOVE_PEER);
        }
    }, []);


    const provideMediaRef = useCallback((id: string, node: HTMLVideoElement) => {
        peerMediaElements.current[id] = node;
        // if (peerMediaElements.current[id]?.srcObject) {
        //     const mediaStream = Object.getPrototypeOf(peerMediaElements.current[id]?.srcObject) as MediaStream
        //     const calll = mediaStream.getVideoTracks.bind(peerMediaElements.current[id]?.srcObject)
        //     console.log(!calll()[0]?.enabled)
        //     return !calll()[0].enabled
        // }
    }, []);


    return { clients, provideMediaRef }
}