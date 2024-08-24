import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ErrorDTO } from '../../DTO/Error/ErrorDTO';
import { IPaginatedResponse } from '../../DTO/Pagination/IPaginatedResponse';
import { CreateUserDTO } from '../../DTO/Usuario/CrateUsuarioDTO';
import { UpdateUsuario } from '../../DTO/Usuario/UpdateUsuarioDTO';
import { Usuario } from '../../DTO/Usuario/Usuario';
import { GlobalService } from '../global.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private globalService: GlobalService, private http: HttpClient) {}

  // create user
  public async create(data: CreateUserDTO): Promise<Usuario | ErrorDTO> {
    try {
      data.usu_Genero = data.usu_Genero.toUpperCase();
      const response = await firstValueFrom(
        this.http.post<any>(`${this.globalService.baseUrl}user`, data)
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

  // get user
  public async get(id: number): Promise<Usuario | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}usuario/${id}`)
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

  public async update(data: UpdateUsuario): Promise<Usuario | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.put<any>(
          `${this.globalService.baseUrl}usuario/${data.usu_Id}`,
          { ...data }
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

  // delete user
  public async delete(id: number): Promise<Usuario | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.delete<any>(`${this.globalService.baseUrl}user/${id}`)
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

  // get all users
  public async getAll(
    limit: number,
    page: number
  ): Promise<IPaginatedResponse<Usuario> | ErrorDTO> {
    try {
      const response = await firstValueFrom(
        this.http.get<any>(`${this.globalService.baseUrl}user`, {
          params: {
            limit: limit.toString(),
            page: page.toString(),
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

  // change password
}
