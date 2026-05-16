"use client";

import clsx from "clsx";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { toggleVideo } from "@/Redux/Slices/mediaSlice";
import { useLocalStream } from "./hooks/useWebRTC";
import s from "./VideoConversation.module.scss";
import { VideoWindow } from "./VideoWindow/VideoWindow";

const FOUR_MORE_THRESHOLD = 4;

export type ClientType = {
  newClient: string,
  img: string
}

export default function VideoConversation({
  conversationId,
}: {
  conversationId: string;
}) {
  const { clients, provideMediaRef } = useLocalStream(conversationId);

  const dispatch = useAppDispatch();

  const silent = useTypedSelector((state) => state.media.silent);

  return (
    <div className={s.container}>
      {clients?.map((client: ClientType) => {
        return (
          <div
            key={client.newClient}
            className={clsx(
              s.box,
              clients.length > 2 && s.twoMore,
              clients.length > FOUR_MORE_THRESHOLD && s.fourMore
            )}
          >
            <VideoWindow client={client} silent={silent} provideMediaRef={provideMediaRef} />
          </div>
        );
      })}

      <div>
        <button
          style={{ color: "#fff", cursor: "pointer" }}
          onClick={() => dispatch(toggleVideo())}
        >
          Video
        </button>
      </div>
    </div>
  );
}
