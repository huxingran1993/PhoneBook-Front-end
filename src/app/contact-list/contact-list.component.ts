import {ChangeDetectorRef, Component, Input, OnInit, Optional, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Contact} from '../model/Contact';
import {MatDialog, MatDialogRef, MatSort, MatTable, MatTableDataSource} from '@angular/material';
import {ApiService} from '../services/api.service';
import {SelectionModel} from '@angular/cdk/collections';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ConfirmationDialogComponent} from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contact: Contact = {id: null, name: null, lastName: null, phoneNumber: null};
  displayedColumns: string[] = ['name', 'lastName', 'phoneNumber', 'edit', 'delete'];
  @Input() contacts: Contact[];
  private dataSource: MatTableDataSource<Contact>;
  private selection: SelectionModel<any>;
  private validatingForm: FormGroup;
  name: string;
  lastName: string;
  phoneNumber: string;
  dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private api: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.api.getAll().subscribe(response => {
      this.contacts = response;
      this.dataSource = new MatTableDataSource(this.contacts);
      this.selection = new SelectionModel<Contact>(true, []);

    });
    this.validatingForm = new FormGroup({
      addNameFormModalText: new FormControl('', Validators.required),
      addLastNameFormModalText: new FormControl('', Validators.required),
      addNumberFormModalText: new FormControl('', [Validators.required,
        Validators.pattern('^([\+]{1})([0-9]{2})([" "])([0-9]{2})([" "])((\\+91-?)|0)?[0-9]{6,}$')])
    });
  }

  openConfirmationDialog(id: any, i: any) {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = 'Are you sure you want to delete?';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(id);
        console.log('index: ' + i);
        this.dataSource.data.splice(i, 1);
        this.dataSource = new MatTableDataSource<Contact>(this.dataSource.data);
        this.api.deleteContact(id);      }
      this.dialogRef = null;
    });
  }

  get addNameFormModalText() {
    return this.validatingForm.get('addNameFormModalText');
  }

  get addLastNameFormModalText() {
    return this.validatingForm.get('addLastNameFormModalText');
  }

  get addNumberFormModalText() {
    return this.validatingForm.get('addNumberFormModalText');
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editRows(id: any, name: any, lastName: any, phoneNumber: any) {
    this.name = name;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;

    this.contact.id = id;
    this.contact.name = name;
    this.contact.lastName = lastName;
    this.contact.phoneNumber = phoneNumber;
    console.log(name + '  ' + lastName + phoneNumber);
    console.log(this.contact);
  }

  submitContact() {
    console.log('Submit!');
    this.contact.name = this.name;
    this.contact.lastName = this.lastName;
    this.contact.phoneNumber = this.phoneNumber;
    console.log(this.contact);
    this.api.updateContact(this.contact.id, this.contact);
    location.reload();
  }
}
