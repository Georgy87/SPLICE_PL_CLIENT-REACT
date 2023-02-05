class FileService {
  extractImageFileExtensionFromBase64(base64Data: string | ArrayBuffer | null) {
    if (base64Data && typeof base64Data === 'string' && base64Data) {
      return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'));
    }
  }

  fileUpload({ files, setAvatarState, onDrop }: { files: any; setAvatarState: any; onDrop: boolean }) {
    if (files && files.length > 0) {
      let currentFile;
      
      if (onDrop) {
        currentFile = files[0];
      } else {
        currentFile = files;
      }

      const reader = new FileReader();

      reader.addEventListener(
        'load',
        () => {
          const myResult = reader.result;
          const resultAvatarImg = this.extractImageFileExtensionFromBase64(myResult);

          if (typeof myResult === 'string' && resultAvatarImg) {
            setAvatarState({
              imgSrc: myResult,
              imgSrcExt: resultAvatarImg,
            });
          }
        },
        false,
      );
      reader.readAsDataURL(currentFile[0]);
    }
  }
}

export const fileService = new FileService();
