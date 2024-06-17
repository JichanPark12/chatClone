import { useRef } from 'react';

interface Props {
  emitMessage: (message: string, user: string) => void;
  user: string;
}

const ChatRoomInput = ({ emitMessage, user }: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className="h-1/6 bg-white"
      onClick={() => {
        ref.current?.focus();
      }}>
      <div className="p-3 h-full">
        <input
          onKeyDown={(e) => {
            if (e.key === 'Enter' && ref.current) {
              if (ref.current.value === '') return;
              emitMessage(ref.current.value, user);
              ref.current.value = '';
            }
          }}
          ref={ref}
          className="w-full border-gray-300 p-2 rounded resize-none outline-none"
          placeholder="Type your message here..."></input>
      </div>
    </div>
  );
};

export default ChatRoomInput;
