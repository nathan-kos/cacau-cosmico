import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public baseUrl: string = 'http://localhost:3333/';
  public defaultUsu_Id: string = '2f206edd-f69f-4bc6-a56f-5dbaa045e6b5';
}
