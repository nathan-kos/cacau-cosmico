import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../DTO/Error/ErrorDTO';
import { IPaginatedResponse } from '../../DTO/Pagination/IPaginatedResponse';
import { CreateEnderecoDTO } from '../../DTO/endereco/CreateEnderecoDTO';
import { Endereco } from '../../DTO/endereco/Endereco';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  // create address
  public async create(
    data: CreateEnderecoDTO,
    id: string
  ): Promise<Endereco | ErrorDTO> {
    try {
      const respose = await firstValueFrom(
        this.http.post<any>(
          `${this.globalService.baseUrl}user/${id}/endereco`,
          data
        )
      );
      return respose;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        return new ErrorDTO(error.error.message, error.status);
      } else {
        return new ErrorDTO('Erro desconhecido', 500);
      }
    }
  }

  // get address
  public async get(
    usu_Id: string,
    end_Id: string
  ): Promise<Endereco | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}user/${usu_Id}/endereco/${end_Id}`
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

  // update address
  public async update(
    data: CreateEnderecoDTO,
    usu_Id: string,
    end_Id: string
  ): Promise<Endereco | ErrorDTO> {
    try {
      if (
        data.end_Complemento === '' ||
        data.end_Complemento === null ||
        data.end_Complemento === undefined
      ) {
        // remove complemento if it is empty
        delete data.end_Complemento;
      }

      const response = await firstValueFrom(
        this.http.put<any>(
          `${this.globalService.baseUrl}user/${usu_Id}/endereco/${end_Id}`,
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

  // delete address
  public async delete(
    usu_Id: string,
    end_Id: string
  ): Promise<Endereco | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.delete<any>(
          `${this.globalService.baseUrl}user/${usu_Id}/endereco/${end_Id}`
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

  // get all addresses
  public async getAll(
    usu_Id: string,
    limit: number,
    page: number
  ): Promise<IPaginatedResponse<Endereco> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${this.globalService.baseUrl}user/${usu_Id}/endereco`,
          {
            params: {
              limit: limit.toString(),
              page: page.toString(),
            },
          }
        )
      );

      // console.log(response);

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
