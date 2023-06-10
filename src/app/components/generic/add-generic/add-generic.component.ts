import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ImgCardI } from 'src/app/interfaces/functionality/home.interface';

@Component({
  selector: 'app-add-generic',
  templateUrl: './add-generic.component.html',
  styleUrls: ['./add-generic.component.scss']
})
export class AddGenericComponent implements OnInit {

  public addClassOpacity: string = '';
  public addClassTans: string = '';
  @Output() clossMOdalEmit= new EventEmitter<string>();
  @Output() saveCharacter = new EventEmitter<Object>();
  @Input() infoCharacter!: ImgCardI; 
  public formGroup!: FormGroup;
  public imgAdd: boolean = false;

  public imgS: any = [];
  public prevImg: string = '';
  public errorImg: boolean = false;

  private infoAdd = {
    id: 0,
    name: '',
    gender: '',
    homeworld: '',
    image: '',
    died: '',
    species: '',
    born: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.buildForm();
    setTimeout(() => {
      this.addClassOpacity = 'transition-modal';
      this.addClassTans = 'transition-content';
    }, 100);
  }

  // Crea el formulario
  private buildForm(){
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      homeworld: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      species: new FormControl('', Validators.required),
      born: new FormControl('', Validators.required),
      died: new FormControl(''),
    });
  }

  closeModal(){
    this.clossMOdalEmit.emit('');
  }
  onSubmit(){
    if (this.prevImg) {      
      this.infoAdd.id = Math.floor((Math.random() * (400 +1)) + 100);
      this.infoAdd.name = this.formGroup.value.name;
      this.infoAdd.gender = this.formGroup.value.gender;
      this.infoAdd.species = this.formGroup.value.species;
      this.infoAdd.homeworld = this.formGroup.value.homeworld;
      this.infoAdd.image = this.prevImg;
      this.infoAdd.born = this.formGroup.value.born;
      this.infoAdd.died = this.formGroup.value.died;
      this.saveCharacter.emit(this.infoAdd);
    }else{      
      this.errorImg = true;
      setTimeout(() => {
        this.errorImg = false
      }, 1000);
    }
  }

  captureFile(event: any){
    const imgAdd = event.target.files[0];
    this.extraerBase64(imgAdd).then((img: any) => {
      this.prevImg = img.base;      
    })
  }

  // extrae la imagen en Base
  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      return reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
    } catch (e) {
      return null;
    }
  })

}
