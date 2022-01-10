import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PicturefieldComponent } from './components/picturefield/picturefield.component';
import { LoginComponent } from './components/login/login.component';
import { DataService } from './services/data.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PicturefieldComponent,
    LoginComponent,
    SidebarComponent,
    StatisticsComponent,
    FileUploadComponent
  ],
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    BrowserModule,
    FormsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
