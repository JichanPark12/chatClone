import ChatBubble from './ChatBubble';

interface Props {
  messages: any[];
  user: string;
}

const ChatRoom = ({ messages, user }: Props) => {
  return (
    <div className=" overflow-y-auto pl-3 pr-3 h-5/6 flex flex-col-reverse">
      <div>
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message}
            isMe={user === message.user}></ChatBubble>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
