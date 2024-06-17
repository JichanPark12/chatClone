import Image from 'next/image';

interface Props {
  imageUrl: string;
}

const ProfileIcon = ({ imageUrl }: Props) => {
  return (
    <div className="avatar">
      <div className="w-11 mask mask-squircle">
        <Image
          src={imageUrl}
          alt="프로필 아이콘"
          height={30}
          width={30}></Image>
      </div>
    </div>
  );
};

export default ProfileIcon;
