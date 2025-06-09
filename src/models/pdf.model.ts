export interface PdfFile {
  id: number;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  uploadDate: string;
  thumbnailPath?: string;
}

export interface UploadResponse {
  message: string;
  pdfs: PdfFile[];
}

export interface DeleteResponse {
  message: string;
}

export interface ThumbnailResponse {
  message: string;
  thumbnailPath: string;
}