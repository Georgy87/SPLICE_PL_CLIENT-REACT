export type UseImageSourceInput = {
  src: undefined | string;
  srcSet?: string;
};

export type UseImageSourceResult = {
  src: undefined | string;
  srcSet: undefined | string;
  pending: boolean;
};

export type UseImageSource = (input: UseImageSourceInput) => UseImageSourceResult;
