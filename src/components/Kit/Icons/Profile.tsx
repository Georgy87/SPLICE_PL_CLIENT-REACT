import { memo } from 'react';

const ProfileToMemo = () => {
  return (
    <svg
      width="21px"
      height="21px"
      stroke="#ffff"
      fill="#ffff"
      strokeWidth="0.256"
      viewBox="0 0 32 32"
      enableBackground="new 0 0 32 32"
      id="Stock_cut"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <circle
            cx="16"
            cy="16"
            fill="none"
            r="15"
            stroke="#ffff"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></circle>
          <path
            d="M26,27L26,27 c0-5.523-4.477-10-10-10h0c-5.523,0-10,4.477-10,10v0"
            fill="none"
            stroke="#ffff"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></path>
          <circle
            cx="16"
            cy="11"
            fill="none"
            r="6"
            stroke="#ffff"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            strokeWidth="2"
          ></circle>
        </g>
      </g>
    </svg>
  );
};

export const Profile = memo(ProfileToMemo);
