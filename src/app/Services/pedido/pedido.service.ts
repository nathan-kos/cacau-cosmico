import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../DTO/Error/ErrorDTO';
import { IPaginatedResponse } from '../../DTO/Pagination/IPaginatedResponse';
import { CreatePedidoDTO } from '../../DTO/Pedido/CreatePedidoDTO';
import { Pedido } from '../../DTO/Pedido/Pedido';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  public async create(data: CreatePedidoDTO): Promise<Pedido | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(`${this.globalService.baseUrl}pedido`, data)
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

  public async get(ped_Id: string): Promise<Pedido | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}pedido/${ped_Id}`)
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

  public async list(
    usu_Id: string,
    page: number,
    limit: number
  ): Promise<IPaginatedResponse<Pedido> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}pedido/user/${usu_Id}`,
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
