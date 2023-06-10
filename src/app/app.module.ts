import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ImageGalleryComponent } from './components/home/image-gallery/image-gallery.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddGenericComponent } from './components/generic/add-generic/add-generic.component';
import { CharacterInformationComponent } from './components/generic/character-information/character-information.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImageGalleryComponent,
    AddGenericComponent,
    CharacterInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
