import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Output() filesSelected = new EventEmitter<FileList>();

  selectedFiles: File[] = [];
  isDragOver = false;
  isUploading = false;

  constructor() {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(files);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  private handleFiles(fileList: FileList) {
    const newFiles = Array.from(fileList).filter(file => 
      file.type === 'application/pdf' && file.size <= 7 * 1024 * 1024
    );

    // Limitar para 10 files total
    const remainingSlots = 10 - this.selectedFiles.length;
    const filesToAdd = newFiles.slice(0, remainingSlots);

    this.selectedFiles = [...this.selectedFiles, ...filesToAdd];
  }

  removeFile(fileToRemove: File) {
    this.selectedFiles = this.selectedFiles.filter(file => file !== fileToRemove);
  }

  clearFiles() {
    this.selectedFiles = [];
  }

  upload() {
    if (this.selectedFiles.length === 0) return;

    this.isUploading = true;

    // Converter para FileList-like object
    const dataTransfer = new DataTransfer();
    this.selectedFiles.forEach(file => dataTransfer.items.add(file));

    // Emitir os arquivos selecionados para o componente pai
    this.filesSelected.emit(dataTransfer.files);

    // Limpar os arquivos após emitir o evento
    setTimeout(() => {
      this.isUploading = false;
      this.clearFiles();
    }, 500);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}