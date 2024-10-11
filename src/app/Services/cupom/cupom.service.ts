import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { cupom } from '../../DTO/Cupom/cupom';
import { ErrorDTO } from '../../DTO/Error/ErrorDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class CupomService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  public async FindByCodigo(codigo: string): Promise<cupom | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}cupom/code/${codigo}`)
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      }
      return new ErrorDTO('Erro desconhecido', 500);
    }
  }

  public async FindById(cup_Id: string): Promise<cupom | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}cupom/${cup_Id}`)
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      }
      return new ErrorDTO('Erro desconhecido', 500);
    }
  }
}
