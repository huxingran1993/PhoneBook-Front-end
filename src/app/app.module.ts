import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { AddSearchComponent } from './add-search/add-search.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MDBBootstrapModule, ModalModule} from 'angular-bootstrap-md';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatPaginatorModule,
  MatTableModule,
  MatToolbarModule
} from '@angular/material';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddComponent } from './add/add.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    AddSearchComponent,
    ContactListComponent,
    AddComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatTableModule,
    MatToolbarModule,
    NoopAnimationsModule,
    AngularFontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]

})
export class AppModule { }
