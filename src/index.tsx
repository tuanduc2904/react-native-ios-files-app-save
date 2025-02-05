import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-ios-files-app-save' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const IosFilesAppSave = NativeModules.IosFilesAppSave
  ? NativeModules.IosFilesAppSave
  : new Proxy(
    {},
    {
      get() {
        throw new Error(LINKING_ERROR);
      },
    }
  );

export const enum DestinationPathEnum {
  DIRECTORY_DOCUMENTS = "Documents",
  DIRECTORY_DOWNLOADS = "Download",
  DIRECTORY_MOVIES = "Movies",
  DIRECTORY_MUSIC = "Music",
  DIRECTORY_NOTIFICATIONS = "Notifications",
  DIRECTORY_PICTURES = "Pictures",
  DIRECTORY_PODCASTS = "Podcasts"
}

export interface FileSaveSuccess {
  message: string;
  path: string;
  success: boolean;
}


export function multiply(a: number, b: number): Promise<number> {
  return IosFilesAppSave.multiply(a, b);
}


export const startDownload = async (url: string) => {
  try {
    NativeModules.IosFilesAppSave.startDownload(url).then(() => {
    });
  } catch (e) {
  }
}

//TODO: Add Path Support
//*  path: DestinationPathEnum = DestinationPathEnum.DIRECTORY_DOWNLOADS

/**
 * Options for saving a file.
 */

export interface FileSaveOptions {
  /**
   * The URL of the file to save.
   */
  url: string;

  /**
   * The filename to use for the saved file.
   */
  fileName?: string;

  /**
   * Indicates whether the file data is encoded in Base64 format.
   */
  isBase64?: boolean;
}


export const startDownloadAppSave = (options: FileSaveOptions) => {
  return new Promise((resolve, reject) => {
    try {
      NativeModules.IosFilesAppSave.startDownload(options).then((res: FileSaveSuccess) => {
        resolve(res)
      }).catch((error: any) => {
        const object = error?.userInfo;
        reject(Platform.OS == "ios" ? object : error.error)
      });
    } catch (e) {
    }
  });
}