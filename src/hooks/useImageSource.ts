import { useEffect, useState, useCallback, useMemo } from 'react';

import { ensureUrlIsExternal } from '@utils/url';
import { addEvent } from '@utils/dom';

import { UseImageSource } from './types';

import { EVENT_NAMES } from '@/constans/eventnames';

export const useImageSource: UseImageSource = ({ src, srcSet }) => {
  const [pending, setPending] = useState<boolean>(true);
  const [image, setImage] = useState<HTMLImageElement>();

  const ensureSrcIsExternal = useCallback((src: undefined | string): boolean => {
    if (!src) {
      return false;
    }

    return ensureUrlIsExternal(src);
  }, []);

  const originalSrcIsExternal = useMemo(
    () => ensureSrcIsExternal(src), //
    [ensureSrcIsExternal, src],
  );

  const processedSrc = useMemo(() => {
    if (originalSrcIsExternal) {
      return src;
    }

    return src;
  }, [src, originalSrcIsExternal]);

  const setCurrentImage = useCallback(() => {
    const currentImage = new Image();
    currentImage.src = processedSrc ?? '';

    setImage(currentImage);
  }, [src, srcSet]);

  const handleSuccessLoad = useCallback(() => {
    setPending(false);
  }, []);

  useEffect(() => {
    if (!image) {
      setCurrentImage();
      return;
    }

    if (image?.complete) {
      return handleSuccessLoad();
    }

    const unOnLoad = addEvent(image, EVENT_NAMES.LOAD, handleSuccessLoad);

    return () => {
      unOnLoad();
    };
  }, [image, originalSrcIsExternal, src, srcSet, setCurrentImage, handleSuccessLoad]);

  return {
    src: processedSrc,
    srcSet,
    pending,
  };
};
