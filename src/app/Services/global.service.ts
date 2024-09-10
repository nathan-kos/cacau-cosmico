import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public baseUrl: string = 'http://localhost:3333/';
  public defaultUsu_Id: string = '5205fb40-9364-4470-ae15-83ff9f78e9b8';
}
