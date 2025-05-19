import { Component, OnInit } from '@angular/core';
import { ImagenService } from 'src/app/imagen-service.service';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnInit {
  images: any[] = [];
  isLoading = true;
  selectImage: any = null;
  error: string | null = null;
  itemsPerPage = 10;
  currentPage = 1;

  constructor(private imagenService: ImagenService) {}

  ngOnInit(): void {
    this.loadImages();
  }

  loadImages(): void {
    this.isLoading = true;
    this.error = null;

    this.imagenService.getImages(this.itemsPerPage).subscribe({
      next: (data) => {
        this.images = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Error loading images';
        this.isLoading = false;
        console.error(error);
      },
    });
  }

  showDetailImage(image: any): void {
    this.selectImage = image;
  }

  closeModal(): void {
    this.selectImage = null;
  }
}
