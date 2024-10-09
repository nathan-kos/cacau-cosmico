import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../DTO/Error/ErrorDTO';
import { CreateTrocaDevolucao } from '../../DTO/TrocaDevolucao/CreateTrocaDevolucaoDTO';
import { TrocaDevolucaoStatus } from '../../DTO/TrocaDevolucao/TrocaDevolucaoStatus';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class TrocaDevolucaoService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  public async create(data: CreateTrocaDevolucao) {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(
          `${this.globalService.baseUrl}troca-devolucao`,
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

  public async aceitar(tde_Id: string) {
    try {
      const response = await firstValueFrom(
        this.http.put<any>(
          `${this.globalService.baseUrl}troca-devolucao/${tde_Id}/aceitacao`,
          {}
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

  public async recusar(tde_Id: string) {
    try {
      const response = await firstValueFrom(
        this.http.put<any>(
          `${this.globalService.baseUrl}troca-devolucao/${tde_Id}/recusa`,
          {}
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

  public async listByStatus(status: TrocaDevolucaoStatus) {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}troca-devolucao/status/${status}`
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

  public async listByChoPed(tde_cho_ped_id: string) {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}troca-devolucao/${tde_cho_ped_id}`
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
