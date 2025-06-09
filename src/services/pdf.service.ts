import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { PdfFile, UploadResponse, DeleteResponse, ThumbnailResponse } from '../models/pdf.model';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  private baseUrl = 'http://localhost:3000/pdf';

  constructor(private http: HttpClient) {}

  uploadPdfs(files: FileList): Observable<UploadResponse> {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return this.http.post<UploadResponse>(`${this.baseUrl}/upload`, formData)
      .pipe(catchError(this.handleError));
  }

  getAllPdfs(): Observable<PdfFile[]> {
    return this.http.get<PdfFile[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getPdfFile(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}`, { responseType: 'blob' })
      .pipe(catchError(this.handleError));
  }

  getThumbnail(id: number): string {
    return `${this.baseUrl}/thumbnail/${id}`;
  }

  generateThumbnail(id: number): Observable<ThumbnailResponse> {
    return this.http.post<ThumbnailResponse>(`${this.baseUrl}/thumbnail/${id}/generate`, {})
      .pipe(catchError(this.handleError));
  }

  deletePdf(id: number): Observable<DeleteResponse> {
    return this.http.delete<DeleteResponse>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    let errorMessage = 'Ocorreu um erro inesperado';
    
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}