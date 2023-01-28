import { memo } from 'react';

const LikesToMemo = () => {
  return (
    <svg
      version="1.1"
      width="23px"
      height="23px"
      stroke="#ffff"
      fill="#ffff"
      strokeWidth="0.256"
      id="Uploaded to svgrepo.com"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          className="bentblocks_een"
          d="M21.081,6C23.752,6.031,26,8.766,26,12c0,5.106-6.47,10.969-10.001,13.593 C12.466,22.974,6,17.12,6,12c0-3.234,2.248-5.969,4.918-6C13.586,6.175,13.926,6.801,16,8.879C18.069,6.806,18.418,6.173,21.081,6 M20.911,4.006L20.912,4C18.993,4,17.259,4.785,16,6.048C14.741,4.785,13.007,4,11.088,4l0.001,0.006C7.044,3.936,4,7.719,4,12 c0,8,11.938,16,11.938,16h0.124C16.062,28,28,20,28,12C28,7.713,24.951,3.936,20.911,4.006z"
        ></path>{' '}
      </g>
    </svg>
  );
};

export const Likes = memo(LikesToMemo);
