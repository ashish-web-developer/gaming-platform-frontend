import type { FC } from "react";

const LockIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="32"
      fill="none"
      viewBox="0 0 24 32"
    >
      <path
        stroke="#D6FFB7"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 19.333v5.5m-5.5-11V6.5a5.5 5.5 0 1111 0v7.333m-14.667 0h18.334A1.833 1.833 0 0123 15.667V28.5a1.834 1.834 0 01-1.833 1.833H2.833A1.833 1.833 0 011 28.5V15.667a1.833 1.833 0 011.833-1.834z"
      ></path>
    </svg>
  );
};

export default LockIcon;
