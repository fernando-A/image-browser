import { Component, OnInit } from '@angular/core';
import { ImgCardI } from 'src/app/interfaces/functionality/home.interface';
import { AkababRsI } from 'src/app/interfaces/rs/akababrs.interface';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public images = new Array<ImgCardI>();
  public valSearch: string = '';
  public arrDrop = [
    {
      id: 1,
      text: 0
    },
    {
      id: 2,
      text: 4
    },
    {
      id: 3,
      text: 8
    },
    {
      id: 4,
      text:12
    },
    {
      id: 5,
      text: 16
    }
  ];
  public txtDropSelect: string = 'Pagination by All';
  public numbPaer: number = 0;
  public selectNumberPage: number = 1;
  public showModal: boolean = false;
  private countPage: number = 0;
  private copyImages = new Array<ImgCardI>();


  constructor( private homeService: HomeService) { 
    this.getImg();
  }

  ngOnInit(): void {    
  }

  // Consumo de servicio
  getImg(){
    this.homeService.getImgInfo().subscribe( res => {
      res.map( a => {

        const info = {
          id: a.id,
          name: a.name,
          gender: a.gender,
          homeworld: a.homeworld,
          image: a.image,
          died: a.died,
          species: a.species,
          born: a.born,
        };

        this.images.push(info);
        this.copyImages.push(info);
      })

    });
  }

  // Hace el filtrado con el buscador 
  filterImg(){
    this.images = this.copyImages;
    this.images = this.images.filter(filtro => filtro.name.toLocaleLowerCase().includes(this.valSearch.toLocaleLowerCase()));
  }

  // Filtro por Drop
  filterDrop(value: number){
    if (value === 0) {
      this.txtDropSelect = 'Pagination by All';
      this.images = this.copyImages;
    }else{
      this.images = this.copyImages.slice(0, value);
      this.txtDropSelect = `Pagination by ${value}`;
      this.numbPaer = Math.trunc((this.copyImages.length / value) + 1);  
      this.countPage = value;    
    }

  }

  // Filtro del paginador
  nextPage(value: number){
    this.selectNumberPage = value;
    this.images = this.copyImages.slice((this.countPage * value) - this.countPage, (this.countPage * value));
  }

  // Filtro BTN Previous y Next
  nextPagePreNex(value: number){
    switch (value) {
      case 0:
        if(this.selectNumberPage > 1){
          this.nextPage(this.selectNumberPage -1 );
        }
        break;
      case 1:
        if (this.selectNumberPage !== this.numbPaer) {
          this.nextPage(this.selectNumberPage + 1 );
        }
      break;
    }
  }

  
  // Habre el moda
  openModal(){
    this.showModal = true; 
  }


  // Cierra la modal
  closeModal(m: any){
    this.showModal = false;
  }

  // inserta la imagen
  saveCharacter(info: any){
    this.images.push(info);
    this.copyImages.push(info);
    this.showModal = false;
    this.filterDrop(0);
    this.selectNumberPage = 1;
  }

}
