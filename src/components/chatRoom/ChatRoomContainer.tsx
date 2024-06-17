'use client';

import { useCallback, useEffect, useState } from 'react';
import ChatRoom from './ChatRoom';
import ChatRoomHeader from './ChatRoomHeader';
import ChatRoomInput from './ChatRoomInput';
import { Socket, io } from 'socket.io-client';

const ChatRoomContainer = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<any[]>([]);
  const [user, setUser] = useState('');

  const emitMessage = useCallback(async (message: string, user: string) => {
    const body = {
      id: `${Math.random()}`,
      message,
      user,
      time: new Date(),
      isLoading: true,
    };
    try {
      setMessages((messages) => [...messages, body]);
      const random = Math.floor(Math.random() * 99 + 1);
      // if (random >= 70) {
      //   setTimeout(async () => {
      //     await fetch('/api/chat', {
      //       method: 'POST',
      //       body: JSON.stringify(body),
      //     });
      //   }, 2000);
      // } else if (random >= 30) {
      //   await fetch('/api/chat', {
      //     method: 'POST',
      //     body: JSON.stringify(body),
      //   });
      // } else {
      //   const res = await fetch('/api/chat', {
      //     method: 'POST',
      //     body: 'error',
      //   });
      //   if (!res.ok) throw new Error('에러');
      // }

      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      const newUser = `할일 없는 백수${String(Math.random()).slice(2)}`;
      localStorage.setItem('user', newUser);

      setUser(newUser);

      return;
    } else {
      setUser(user);
      return;
    }
  }, []);

  useEffect(() => {
    const socketInitializer = async () => {
      await fetch('/api/socket/io');
      const socket = io();
      socket.on('connect', () => {
        setIsConnected(true);
        console.log('connected');
      });
      socket.on('message', (res) => {
        const message = JSON.parse(res);
        message.isLoading = false;
        message.time = new Date(message.time);

        setMessages((messages) => {
          let check = false;
          const newMessages = messages.map((m) => {
            if (message.id === m.id) {
              check = true;
              return message;
            }
            return m;
          });

          if (!check) {
            return [...newMessages, message].sort((a, b) => a.time - b.time);
          }
          return newMessages.sort((a, b) => a.time - b.time);
        });
      });
      socket.on('disconnect', () => {
        console.log('disconnect');
      });
      setSocket(socket);
    };
    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isConnected) {
    return <div>로딩중이래요</div>;
  }

  return (
    <div className=" bg-chatRoom flex flex-col h-screen">
      <ChatRoomHeader />
      <ChatRoom
        messages={messages}
        user={user}
      />
      <ChatRoomInput
        emitMessage={emitMessage}
        user={user}
      />
    </div>
  );
};

export default ChatRoomContainer;
