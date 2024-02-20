import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "./../db/firebase";

export const uploadImage = async (image: File | null) => {
  if (image) {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const url: string = await getDownloadURL(snapshot.ref);
    return url;
  }
};
