export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      if (!(file instanceof Blob)) {
        reject(new Error("Provided value is not a File or Blob"));
        return;
      }
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };