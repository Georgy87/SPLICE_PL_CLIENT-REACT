type PropsType = {
    size: string;
    color?: string;
}

export const Pause: React.FC<PropsType>  = ({ size, color }) => {
    return (
        <svg
            viewBox="-7.92 -7.92 39.84 39.84"
            width={size}
            height={size}
            fill="none"
            cursor="pointer"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M9.5 15V9M14.5 15V9M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                    stroke={color}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                ></path>
            </g>
        </svg>
    );
};
