import { type FC } from 'react';

interface IconButtonProps {
  iconName: string;
  id: string;
  onClick?: () => void;
}

const IconButton: FC<IconButtonProps> = ({ iconName, id, onClick }) => {
  return (
    <button id={`icon-button-${id}`} onClick={onClick}>
      <span className={`iconify ${iconName} text-gray-400 hover:text-white hover:cursor-pointer transition-colors duration-500 ease-in-out`}>
      </span>
    </button>
  );
};

export default IconButton;
