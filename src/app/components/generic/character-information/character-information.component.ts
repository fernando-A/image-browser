import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImgCardI } from 'src/app/interfaces/functionality/home.interface';

@Component({
  selector: 'app-character-information',
  templateUrl: './character-information.component.html',
  styleUrls: ['./character-information.component.scss']
})
export class CharacterInformationComponent implements OnInit {

  public addClassOpacity: string = '';
  public addClassTans: string = '';
  @Output() clossMOdalEmit= new EventEmitter<string>();
  @Input() infoCharacter = new Array<ImgCardI>();

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.addClassOpacity = 'transition-modal';
      this.addClassTans = 'transition-content';
    }, 100);
  }

  closeModal(){
    this.clossMOdalEmit.emit('');
  }

}
