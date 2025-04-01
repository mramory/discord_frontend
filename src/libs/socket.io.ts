import {io} from 'socket.io-client';

const options = {
  "force new connection": true,
  reconnectionAttempts: Infinity, // avoid having user reconnect manually in order to prevent dead clients after a server restart
  timeout : 10000, // before connect_error and connect_timeout are emitted.
  transports : ["websocket"]
}

const socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, options);


export default socket;