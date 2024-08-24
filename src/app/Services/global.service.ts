import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public baseUrl: string = 'http://localhost:3333/';
}
