import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TranslationUploaderComponent } from './translation-uploader/translation-uploader.component';
import { SingleTranslationViewerComponent } from './single-translation-viewer/single-translation-viewer.component';

export const firebaseConfig = {
  apiKey: "AIzaSyCXQrOFb3K6qwHEUj2oYyQmQR6-2S1CW8Y",
  authDomain: "translator-2bbb8.firebaseapp.com",
  databaseURL: "https://translator-2bbb8.firebaseio.com",
  projectId: "translator-2bbb8",
  storageBucket: "translator-2bbb8.appspot.com",
  messagingSenderId: "649743537346"
}

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    TranslationUploaderComponent,
    SingleTranslationViewerComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    // HttpModule,
    MaterialModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
