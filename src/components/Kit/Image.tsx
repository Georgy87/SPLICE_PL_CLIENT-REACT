import { FC, memo } from 'react';

type PropsType = {
    src: string;
    alt: string;
};

export const ImageToMemo: FC<PropsType> = ({ src, alt }) => {
    return <img src={src} alt={alt} />;
};

export const Image = memo(ImageToMemo);
