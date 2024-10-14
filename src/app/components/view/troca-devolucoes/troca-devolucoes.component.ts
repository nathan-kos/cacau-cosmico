import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { TrocaDevolucaoDetalhada } from '../../../DTO/TrocaDevolucao/TrocaDevolucaoDetalhadaDTO';
import { TrocaDevolucaoStatus } from '../../../DTO/TrocaDevolucao/TrocaDevolucaoStatus';
import { TrocaDevolucaoService } from '../../../Services/trocaDevolucao/troca-devolucao.service';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-troca-devolucoes',
  standalone: true,
  imports: [HeaderComponent, NgFor, NgIf],
  templateUrl: './troca-devolucoes.component.html',
  styleUrl: './troca-devolucoes.component.css',
})
export class TrocaDevolucoesComponent implements OnInit {
  public trocasDevolucaos: TrocaDevolucaoDetalhada[] = [];

  public status: TrocaDevolucaoStatus = TrocaDevolucaoStatus.TROCA_SOLICITADA;
  public page: number = 1;
  public limit: number = 7;
  public total: number = 0;
  public totalPages: number = 0;

  constructor(private trocaDevolucaoService: TrocaDevolucaoService) {}

  async ngOnInit(): Promise<void> {
    this.setClass(this.status);
    this.pesquisar();
  }

  public async pesquisar() {
    const operacoes = await this.trocaDevolucaoService.listByStatus(
      this.status,
      this.page,
      this.limit
    );

    if (operacoes instanceof ErrorDTO) {
      window.alert('ERROR');
      return;
    }

    this.total = operacoes.total;
    this.trocasDevolucaos = operacoes.results;
    this.lastPage();
  }

  public async aceitar(tde_Id: string) {
    const response = await this.trocaDevolucaoService.aceitar(tde_Id);

    if (response instanceof ErrorDTO) {
      window.alert(response.code + ' ' + response.mensagem);
    }

    await this.pesquisar();
  }

  public async recusar(tde_Id: string) {
    const response = await this.trocaDevolucaoService.recusar(tde_Id);

    if (response instanceof ErrorDTO) {
      window.alert(response.code + ' ' + response.mensagem);
    }

    await this.pesquisar();
  }

  public async changeStatus(status: string) {
    switch (status) {
      case 'TROCA_SOLICITADA':
        this.status = TrocaDevolucaoStatus.TROCA_SOLICITADA;
        break;
      case 'TROCA_ACEITA':
        this.status = TrocaDevolucaoStatus.TROCA_ACEITA;
        break;
      case 'TROCA_RECUSADA':
        this.status = TrocaDevolucaoStatus.TROCA_RECUSADA;
        break;
      case 'TROCA_REALIZADA':
        this.status = TrocaDevolucaoStatus.TROCA_REALIZADA;
        break;
      case 'DEVOLUCAO_SOLICITADA':
        this.status = TrocaDevolucaoStatus.DEVOLUCAO_SOLICITADA;
        break;
      case 'DEVOLUCAO_ACEITA':
        this.status = TrocaDevolucaoStatus.DEVOLUCAO_ACEITA;
        break;
      case 'DEVOLUCAO_RECUSADA':
        this.status = TrocaDevolucaoStatus.DEVOLUCAO_RECUSADA;
        break;
      case 'DEVOLUCAO_REALIZADA':
        this.status = TrocaDevolucaoStatus.DEVOLUCAO_REALIZADA;
        break;
      default:
        this.status = TrocaDevolucaoStatus.TROCA_SOLICITADA;
        break;
    }

    this.setClass(status);
    this.page = 1; // Reinicia a paginação ao mudar o status
    this.trocasDevolucaos = []; // Limpa a lista para evitar dados antigos
    await this.pesquisar();
  }

  // pagination functions
  public async nextPage() {
    this.page++;
    await this.pesquisar();
  }

  public async previousPage() {
    this.page--;
    await this.pesquisar();
  }

  public async lastPage() {
    this.totalPages = Math.ceil(this.total / this.limit);
  }

  public showActions(): boolean {
    if (
      this.status === TrocaDevolucaoStatus.DEVOLUCAO_SOLICITADA ||
      this.status === TrocaDevolucaoStatus.TROCA_SOLICITADA
    ) {
      return true;
    } else {
      return false;
    }
  }

  public formatarValor(valor: number) {
    return valor.toFixed(2).replace('.', ',');
  }

  public setClass(id: string): void {
    // Remover a classe 'activeted' de todos os botões de troca
    document.getElementById('TROCA_SOLICITADA')?.classList.remove('activeted');
    document.getElementById('TROCA_ACEITA')?.classList.remove('activeted');
    document.getElementById('TROCA_RECUSADA')?.classList.remove('activeted');
    document.getElementById('TROCA_REALIZADA')?.classList.remove('activeted');

    // Remover a classe 'activeted' de todos os botões de devolução
    document
      .getElementById('DEVOLUCAO_SOLICITADA')
      ?.classList.remove('activeted');
    document.getElementById('DEVOLUCAO_ACEITA')?.classList.remove('activeted');
    document
      .getElementById('DEVOLUCAO_RECUSADA')
      ?.classList.remove('activeted');
    document
      .getElementById('DEVOLUCAO_REALIZADA')
      ?.classList.remove('activeted');

    // Adicionar a classe 'activeted' no botão clicado
    document.getElementById(id)?.classList.add('activeted');
  }
}
