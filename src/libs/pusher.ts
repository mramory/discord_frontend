import PusherClient from "pusher-js"

export const pusherClient = new PusherClient(
    process.env.NEXT_PUBLIC_PUSHER_PUBLIC_APP_KEY || "d4bde22a5efd0cce2a38",
    {
      cluster: 'eu',
    }
);