import Image from 'next/image';
import ProfileIcon from '../icons/profileIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const ChatRoomHeader = () => {
  return (
    <header className="fixed w-full z-10 bg-chatRoom">
      <div className="p-3 flex items-center justify-between ">
        <div className="flex">
          <ProfileIcon imageUrl={'/chatRoomImg.jpg'}></ProfileIcon>
          <div className="flex flex-col ml-3">
            <p className="">할일 없는 백수들 모임</p>
            <span className=" text-gray-500 text-xs">접속인원: 2명</span>
          </div>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" h-5 w-5"
          />
        </div>
      </div>
    </header>
  );
};

export default ChatRoomHeader;
