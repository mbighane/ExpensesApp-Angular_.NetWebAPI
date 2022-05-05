import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EntriesComponent } from './entries/entries.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

//services
import {EntryService} from './entry.service';
import { AppRouterModule } from "./app-router.module"
import { HttpClient, HttpClientModule } from '@angular/common/http';

//material design
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';                                                                                       
import { DataSource } from '@angular/cdk/table';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateEntryComponent } from './update-entry/update-entry.component';
import { DeleteEntryComponent } from './delete-entry/delete-entry.component';
import {MatListModule} from '@angular/material/list';    
import  {AuthService} from './auth.service';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {MatSortModule} from '@angular/material/sort';  
 import {MatPaginatorModule} from '@angular/material/paginator';   
 import {MatIconModule} from '@angular/material/icon';   
@NgModule({
  declarations: [
    AppComponent,
    EntriesComponent,
    HeaderComponent,
    FooterComponent,
    NewEntryComponent,
    UpdateEntryComponent,
    DeleteEntryComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    AppRouterModule ,
    HttpClientModule,
    //material design
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    ReactiveFormsModule ,
    MatInputModule ,
    MatSelectModule,
    MatCardModule 
    ,MatToolbarModule  
    ,MatDialogModule 
    ,MatListModule  
    ,FormsModule  
    ,MatSortModule
    ,    MatPaginatorModule                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    ,MatIconModule
],

  exports: [
    MatButtonModule,
    //MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,

  ],
  entryComponents: [UpdateEntryComponent],
  providers: [EntryService, HttpClient, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
