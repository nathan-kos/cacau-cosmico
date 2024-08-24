import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Cartao } from '../../DTO/cartao/Cartão';
import { CreateCartDTO } from '../../DTO/cartao/CreateCartDTO';
import { ErrorDTO } from '../../DTO/Error/ErrorDTO';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class CartaoService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  // create card
  public async create(
    data: CreateCartDTO,
    id: string
  ): Promise<Cartao | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(
          `${this.globalService.baseUrl}user/${id}/cartao`,
          data
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

  // get card
  public async get(usu_Id: string, car_Id: string): Promise<Cartao | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}user/${usu_Id}/cartao/${car_Id}`
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

  // delete card
  public async delete(
    usu_Id: string,
    car_Id: string
  ): Promise<Cartao | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.delete<any>(
          `${this.globalService.baseUrl}user/${usu_Id}/cartao/${car_Id}`
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

  // get all cards
  public async getAll(
    usu_Id: string,
    limit: number,
    page: number
  ): Promise<Cartao[] | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}user/${usu_Id}/cartao`,
          {
            params: {
              limit: limit.toString(),
              page: page.toString(),
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
