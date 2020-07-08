import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Contact} from '../model/Contact';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  baseUrl = 'http://localhost:8080/api/contacts';
  dataChange: BehaviorSubject<Contact[]> = new BehaviorSubject<Contact[]>([]);
  // Temporarily stores data from dialogs
  dialogData: any;
  constructor(private httpClient: HttpClient) {
  }

  get data(): Contact[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getAll(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(this.baseUrl);
  }

  getAllContacts(): void {
    this.httpClient.get<Contact[]>(this.baseUrl).subscribe(data => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log (error.name + ' ' + error.message);
      });
  }

  createContact(contactPerson) {
    return this.httpClient.post(this.baseUrl, contactPerson);
  }

  deleteContact(id: string) {
    return this.httpClient.delete(this.baseUrl + '/' + id).subscribe(data => {
      console.log(data);
    });
  }

  updateContact(id: string, contactPerson: Contact): void {
    this.httpClient.put(this.baseUrl + '/' + contactPerson.id, contactPerson).subscribe(data => {
      console.log(data);
    });
  }

}
