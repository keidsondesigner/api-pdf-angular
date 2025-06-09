import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfFile } from '../../models/pdf.model';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-pdf-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-list.component.html',
  styleUrls: ['./pdf-list.component.css']
})
export class PdfListComponent {
  @Input() pdfs: PdfFile[] = [];
  @Output() pdfDeleted = new EventEmitter<number>();
  @Output() pdfViewed = new EventEmitter<PdfFile>();
  @Output() pdfDownloaded = new EventEmitter<PdfFile>();

  deletingIds = new Set<number>();

  constructor(private pdfService: PdfService) {}

  trackByPdfId(index: number, pdf: PdfFile): number {
    return pdf.id;
  }

  getThumbnailUrl(pdf: PdfFile): string {
    return this.pdfService.getThumbnail(pdf.id);
  }

  onThumbnailError(event: Event, pdf: PdfFile) {
    const img = event.target as HTMLImageElement;
    // Esconder a imagem e mostrar o ícone de fallback
    img.style.display = 'none';
    const thumbnail = img.parentElement;
    if (thumbnail) {
      thumbnail.classList.add('no-thumbnail');
    }
  }

  viewPdf(pdf: PdfFile) {
    this.pdfViewed.emit(pdf);
  }

  downloadPdf(pdf: PdfFile) {
    this.pdfDownloaded.emit(pdf);
  }

  deletePdf(pdf: PdfFile) {
    if (confirm(`Tem certeza que deseja excluir "${pdf.originalname}"?`)) {
      this.deletingIds.add(pdf.id);
      this.pdfDeleted.emit(pdf.id);
    }
  }

  onDeleteComplete(id: number) {
    this.deletingIds.delete(id);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}