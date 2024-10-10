import MBCToast from 'components/toasts/mobiconToast';
import moment from 'moment';
import React from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';

export const getFullName = (firstName: string, lastName: string) => {
  const first = firstName || '';
  const last = lastName || '';

  return `${first} ${last}`;
};

export const getParamsURL = (name: string, url: string) => {
  const newURL = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regexString = '[\\?&]' + newURL + '=([^&#]*)';
  const regex = new RegExp(regexString);
  const results = regex.exec(url);
  return results == null ? null : results[1];
};

export const formatPhotoUri = (uri: any) => {
  return isAndroid ? uri : uri?.replace('file://', '');
};

moment.updateLocale('en', {
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: '1s',
    ss: '%ss',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    M: '1M',
    MM: '%dM',
    y: '1Y',
    yy: '%dY',
  },
});

export const toastConfig = {
  success: (props: any) => <MBCToast {...props} />,
  error: (props: any) => <MBCToast error {...props} />,
};

export const toastError = (text1: string, text2?: string) => {
  return Toast.show({
    type: 'error',
    text1: text1,
    text2: text2 || 'Lock cuc',
  });
};

export const toastSuccess = (
  text1: string,
  text2?: string,
  onHide?: () => void,
) => {
  return Toast.show({
    type: 'success',
    text1: text1,
    text2: text2,
    onHide: onHide,
    visibilityTime: 2000,
  });
};

export const formatFullDate = (date: any) => {
  return moment(date, 'YYYY/MM/DD HH:mm').format('YYYY年MM月DD日 HH:mm');
};

export const formatShortDate = (date: any) => {
  return moment(date, 'YYYY-MM-DD').format('YYYY年MM月DD日');
};

export const formatJapanesePhoneNumber = (phoneNumber?: string) => {
  if (!phoneNumber) {
    return '';
  }
  //remove all non-numeric characters
  const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  // Assuming the Japanese phone number is a 10-digit number
  const phoneNumberRegex = /^(\d{2,5})(\d{4})(\d{4})$/;

  if (phoneNumberRegex.test(cleaned)) {
    const formattedNumber = cleaned.replace(phoneNumberRegex, '$1-$2-$3');
    return formattedNumber;
  } else {
    return phoneNumber;
  }
};

// export const constructImageFormData = async (
//   scannedImage: string,
//   preParams: any
// ): Promise<FormData> => {
//   const resizedImageURL = await resizeImageIfNeeded(scannedImage);
//   let formData = new FormData();
//   for (let key in preParams) {
//     formData.append(key, preParams[key]);
//   }
//   if (scannedImage.length > 0) {
//     const fileExtension = scannedImage.split('.').pop();
//     const mimeType = `image/${fileExtension}`;
//     let image = {
//       uri: formatPhotoUri(resizedImageURL),
//       type: mimeType,
//       name: `image.${fileExtension}`,
//     };
//     formData.append('image', image);
//   }
//   return formData;
// };

// const resizeImageIfNeeded = async (imageUrl: string) => {
//   try {
//     const response = await fetch(imageUrl);
//     const blob = await response.blob();

//     const sizeInMB = blob.size / (1024 * 1024); // Convert bytes to MB

//     //server limit image size to 4.5 Mb
//     if (sizeInMB > 4.5) {
//       return resizeImage(imageUrl);
//     } else {
//       return imageUrl;
//     }
//   } catch (error) {
//     //if error, return the original image
//     return imageUrl;
//   }
// };

// const resizeImage = async (imageUrl: string) => {
//   try {
//     const targetSizeInMB = 4.5; //4.5MB
//     let targetWidth = 1000;
//     let targetHeight = 1000;
//     // Adjust dimensions to achieve the target size
//     let resizedImageURL: string = imageUrl;
//     //decrease quality until the image size is less than target size
//     while (true) {
//       const resizedImage = await ImageResizer.createResizedImage(
//         imageUrl,
//         targetWidth,
//         targetHeight,
//         'JPEG',
//         100
//       );
//       const newSizeInMB = resizedImage.size / (1024 * 1024);
//       if (newSizeInMB < targetSizeInMB) {
//         // Resize successful, exit the loop
//         resizedImageURL = resizedImage.uri;
//         break;
//       }
//     }
//     targetWidth -= 50;
//     targetHeight -= 50;
//     return resizedImageURL;
//   } catch (error) {
//     //if error, return the original image
//     return imageUrl;
//   }
// };
