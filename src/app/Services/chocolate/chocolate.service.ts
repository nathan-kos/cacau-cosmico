import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Categorias } from '../../DTO/chocolate/categorias';
import { Chocolate } from '../../DTO/chocolate/Chocolate';
import { ErrorDTO } from '../../DTO/Error/ErrorDTO';
import { IPaginatedResponse } from '../../DTO/Pagination/IPaginatedResponse';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class ChocolateService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  public async FindById(id: string): Promise<Chocolate | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}chocolate/${id}`)
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro desconhecido', 500);
      }
    }
  }

  public async FindAllAtivos(
    page: number,
    limit: number
  ): Promise<IPaginatedResponse<Chocolate> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}chocolate`, {
          params: {
            page: page.toString(),
            limit: limit.toString(),
          },
        })
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro desconhecido', 500);
      }
    }
  }

  public async ListByNome(
    page: number,
    limit: number,
    cho_Nome: string
  ): Promise<IPaginatedResponse<Chocolate> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}chocolate/pesquisar/${cho_Nome}`,
          {
            params: {
              page: page.toString(),
              limit: limit.toString(),
            },
          }
        )
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro desconhecido', 500);
      }
    }
  }

  public async ListByCategoria(
    page: number,
    limit: number,
    cch_Categoria: Categorias
  ): Promise<IPaginatedResponse<Chocolate> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}chocolate/categoria/${cch_Categoria}`,
          {
            params: {
              page: page.toString(),
              limit: limit.toString(),
            },
          }
        )
      );

      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro desconhecido', 500);
      }
    }
  }
}
