import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../DTO/Error/ErrorDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class RelatorioService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  public async getRelatorio(dateInicial: string, dataFinal: string) {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}relatorio/${dateInicial}/${dataFinal}`
        )
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
