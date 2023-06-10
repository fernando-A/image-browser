import { Component, Input, OnInit } from '@angular/core';
import { ImgCardI } from 'src/app/interfaces/functionality/home.interface';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  @Input() images = new Array<ImgCardI>();
  public showModal: boolean = false;
  public selectCharacter = new Array<ImgCardI>();

  // public fileExists: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  // Habre el moda
  openModal(id: number){
    this.showModal = true; 
    this.selectCharacter = this.images.filter(a => a.id === id);
  }


  // Cierra la modal
  closeModal(m: any){
    this.showModal = false;
  }

}
