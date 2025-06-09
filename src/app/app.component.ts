import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfService } from '../services/pdf.service';
import { PdfFile } from '../models/pdf.model';
import { FileUploadComponent } from '../components/file-upload/file-upload.component';
import { PdfListComponent } from '../components/pdf-list/pdf-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FileUploadComponent, PdfListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pdfs: PdfFile[] = [];
  loading = false;
  loadingMessage = '';
  error = '';
  success = '';

  constructor(private pdfService: PdfService) {}

  ngOnInit() {
    this.loadPdfs();
  }

  loadPdfs() {
    this.loading = true;
    this.loadingMessage = 'Carregando PDFs...';

    this.pdfService.getAllPdfs().subscribe({
      next: (pdfs) => {
        this.pdfs = pdfs;
        this.loading = false;
      },
      error: (error) => {
        this.showError(`Erro ao carregar PDFs: ${error.message}`);
        this.loading = false;
      }
    });
  }

  onFilesSelected(files: FileList) {
    this.loading = true;
    this.loadingMessage = 'Enviando arquivos...';

    this.pdfService.uploadPdfs(files).subscribe({
      next: () => {
        this.loadPdfs();
        this.showSuccess('Arquivos enviados com sucesso!');
        this.loading = false;
      },
      error: (error) => {
        this.showError(`Erro ao enviar arquivos: ${error.message}`);
        this.loading = false;
      }
    });
  }

  onPdfDeleted(id: number) {
    this.loading = true;
    this.loadingMessage = 'Excluindo PDF...';

    this.pdfService.deletePdf(id).subscribe({
      next: (response) => {
        this.pdfs = this.pdfs.filter(pdf => pdf.id !== id);
        this.showSuccess('PDF excluído com sucesso!');
        this.loading = false;
      },
      error: (error) => {
        this.showError(`Erro ao excluir PDF: ${error.message}`);
        this.loading = false;
      }
    });
  }

  onPdfViewed(pdf: PdfFile) {
    window.open(`http://localhost:3000/pdf/${pdf.id}`, '_blank');
  }

  onPdfDownloaded(pdf: PdfFile) {
    this.pdfService.getPdfFile(pdf.id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = pdf.originalname;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.showSuccess('Download iniciado!');
      },
      error: (error) => {
        this.showError(`Erro ao baixar PDF: ${error.message}`);
      }
    });
  }

  showError(message: string) {
    this.error = message;
    setTimeout(() => this.dismissError(), 5000);
  }

  showSuccess(message: string) {
    this.success = message;
    setTimeout(() => this.dismissSuccess(), 3000);
  }

  dismissError() {
    this.error = '';
  }

  dismissSuccess() {
    this.success = '';
  }
}