import { NextApiRequest } from 'next';
import { NextApiResponseServerIO } from '../socket/io';

export default async function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
  if (req.method === 'POST') {
    const message = req.body;
    if (message === 'error') {
      res.status(400).json('에러 발생');
      return;
    }
    if (res.socket) {
      res.socket.server.io.emit('message', message);
      console.log('Message emitted:', message);
    }
    res.status(201).json(message);
  }
}
