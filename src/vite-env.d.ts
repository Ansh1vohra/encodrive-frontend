/// <reference types="vite/client" />
declare module 'encodrive' {
  interface EncodriveConfig {
    apiKey: string;
    encryptionKey: string;
  }

  interface UploadResult {
    downloadUrl: string;
    fileId: string;
    fileName: string;
    fileSize: number;
  }

  interface DownloadResult {
    blob: Blob;
    metadata: {
      fileName: string;
      fileSize: number;
      fileType: string;
    };
  }

  class Encodrive {
    constructor(config: EncodriveConfig);
    uploadFile(file: File): Promise<UploadResult>;
    downloadFile(url: string): Promise<DownloadResult>;
  }

  export { Encodrive };
}