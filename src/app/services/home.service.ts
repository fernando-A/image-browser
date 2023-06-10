import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AkababRsI } from '../interfaces/rs/akababrs.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private GET_AKABAB: string = '/starwars-api/api/all.json';
  private DOMAIN: string = environment.domain;
  public fileExists: boolean = false;

  constructor(private httpCl: HttpClient) { }

  getImgInfo(): Observable<AkababRsI[]> {
    return this.httpCl.get<AkababRsI[]>(this.DOMAIN+this.GET_AKABAB);
  }
  checkFileExistence(filename: string) {
    // esto lo puedes añadir en un servicio
    // También puedes usar los observables eso depende de como trabajes en tu proyecto
    this.httpCl.get(filename).toPromise()
    .then(response => this.fileExists = true)
    .catch(e => this.fileExists = false);
}
}
