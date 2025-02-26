

import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import * as FileSystem from 'expo-file-system';

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

type UploadImageFunction = (uri: string) => Promise<string | null>;

type CustomImagePickerProps = {
  setImage: (uri?: string | null | undefined) => void;
  setArray?: any;
  uploadImage: UploadImageFunction; // Assuming UploadImageFunction is a function type
};
export const openImagePicker = async ({
  setImage,
  setArray,
  uploadImage,
}: CustomImagePickerProps) => {
 
  await ensureDirExists();

  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Required",
      "Please grant permission to access your media library."
    );
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    // allowsMultipleSelection: true
    // allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const uri = result?.assets[0]?.uri;
    setImage(uri);

    if (Array.isArray(uploadImage)) {
      
      const links = await Promise.all(uploadImage.map(fn => fn(uri)));
      if (links.every(link => link)) {
        setArray && setArray((prevImages: any) => [...prevImages, uri]);
      }
    } else {

      if (uri) {
        const link = await uploadImage(uri);
        if (link) {
          setImage(link);
          setArray && setArray((prevImages: any) => [...prevImages, link]);
        }
      }
    }
  }

};




