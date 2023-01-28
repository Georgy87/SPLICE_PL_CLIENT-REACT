export const detectBrowser = (): string => {
  let result: string = 'Other';

  const detect = (browserName: string): number => {
    return navigator.userAgent.indexOf(browserName);
  };

  if (detect('YaBrowser') !== -1) {
    result = 'Yandex Browser';
  } else if (detect('Firefox') !== -1) {
    result = 'Mozilla Firefox';
  } else if (detect('MSIE') !== -1) {
    result = 'Internet Exploder';
  } else if (detect('Edge') !== -1) {
    result = 'Microsoft Edge';
  } else if (detect('Safari') !== -1) {
    if (detect('Chrome') !== -1 && detect('Safari') !== -1) return 'Chrome';
    result = 'Safari';
  } else if (detect('Opera') !== -1) {
    result = 'Opera';
  }

  return result;
};
