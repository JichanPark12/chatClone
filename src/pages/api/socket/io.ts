import { Server as NetServer } from 'http';
import { Socket } from 'net';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';
import { Server as ServerIO } from 'socket.io';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};
const SocketHandler = (req: NextRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new ServerIO(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
};

export default SocketHandler;
