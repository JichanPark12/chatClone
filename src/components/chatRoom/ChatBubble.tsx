import ProfileIcon from '../icons/profileIcon';

interface Props {
  message: any;
  isMe: boolean;
}

const ChatBubble = ({ message, isMe }: Props) => {
  const hours = message.time.getHours();
  const minutes = message.time.getMinutes();

  return (
    <div className={`chat ${isMe ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <ProfileIcon imageUrl="/chatRoomImg.jpg"></ProfileIcon>
      </div>
      <div className="chat-header">{message.user}</div>
      <div className="flex items-end">
        {isMe ? (
          <>
            {message.isLoading && (
              <span className="loading loading-spinner loading-xs"></span>
            )}
            <time className="text-xs opacity-50 mr-2">{`${hours} : ${minutes}`}</time>
            <div className="chat-bubble bg-white text-black">{message.message}</div>
          </>
        ) : (
          <>
            <div className="chat-bubble bg-white text-black">{message.message}</div>
            <time className="text-xs opacity-50 ml-2">{`${hours} : ${minutes}`}</time>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
