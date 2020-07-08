import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Contact} from '../model/Contact';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-add-search',
  templateUrl: './add-search.component.html',
  styleUrls: ['./add-search.component.css']
})
export class AddSearchComponent implements OnInit {
  contact: Contact = {id: null, name: null, lastName: null, phoneNumber: null};
  validatingForm: FormGroup;
  name: string;
  lastName: string;
  phoneNumber: string;
  @Output() searchEmmiter = new EventEmitter<string>();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.validatingForm = new FormGroup({
      addNameFormModalText: new FormControl('', Validators.required),
      addNumberFormModalText: new FormControl('', [Validators.required,
        Validators.pattern('^([\+]{1})([0-9]{2})([" "])([0-9]{2})([" "])((\\+91-?)|0)?[0-9]{6,}$')])
    });
  }

  get addNameFormModalText() {
    return this.validatingForm.get('addNameFormModalText');
  }

  get addNumberFormModalText() {
    return this.validatingForm.get('addNumberFormModalText');
  }

  submitContact() {
    console.log('Submit!');
    this.contact.name = this.name;
    this.contact.lastName = this.lastName;
    this.contact.phoneNumber = this.phoneNumber;
    console.log(this.contact);
    this.apiService.createContact(this.contact).subscribe(res => {
      console.log(res);
    });
    location.reload();
  }

}
