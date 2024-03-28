import {Dimensions} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';

const dimesion = Dimensions.get('window');
export const windowHeight = dimesion.height;
export const windowWidth = dimesion.width;
export const isUpperCase = (string: string) => /[A-Z]/.test(string);
export const isLowerCase = (string: string) => /[a-z]/.test(string);
export const hasNumber = (string: string) => /[0-9]/.test(string);
export const formatAmount = (value: any) =>
  Number(value)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const capitalizeFirstLetter = (string: string): string =>
  string.charAt(0).toUpperCase() + string.slice(1);

type LaunchType = 'camera' | 'upload';

export const pickImage = async (
  type: LaunchType,
  onPick: (error?: any, imgUrl?: string) => void,
) => {
  let imgOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 1,
    selectionLimit: 1,
    presentationStyle: 'popover',
  };

  let response: ImagePickerResponse;

  try {
    if (type === 'camera') {
      response = await launchCamera(imgOptions);
    } else {
      response = await launchImageLibrary(imgOptions);
    }

    onPick(null, response.assets?.[0].uri as string);
  } catch (error) {
    onPick('Error Picking Image', undefined);
  }
};
