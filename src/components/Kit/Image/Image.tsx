import { useMemo, FC, memo } from 'react';

import { UseImageSourceInput } from '@hooks/types';
import { useImageSource } from '@hooks/useImageSource';

import styles from './Image.module.scss';

type PropsType = {
  src: string;
  alt: string;
};

export const ImageToMemo: FC<PropsType> = ({ src, alt }) => {
  const useImageSourceInput: UseImageSourceInput = useMemo(() => ({ src }), [src]);

  const { pending, src: processedSrc } = useImageSource(useImageSourceInput);

  const fadeInClassName = pending ? `${styles.pending}` : `${styles.loaded}`;
  return <img className={fadeInClassName} src={processedSrc} alt={alt} />;
};

export const Image = memo(ImageToMemo);
