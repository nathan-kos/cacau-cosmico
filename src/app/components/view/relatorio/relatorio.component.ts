import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { RelatorioService } from '../../../Services/relatorio/relatorio.service';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-relatorio',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
})
export class RelatorioComponent implements OnInit {
  constructor(public relatorioService: RelatorioService) {}

  async ngOnInit(): Promise<void> {
    await this.getRelatorio();
  }
  public dataInicial: string = '2024-07-01';
  public dataFinal: string = '2024-10-30';
  public dados: {
    vendas: {
      chocolate: string;
      data: {
        quantidade: number;
        data: string;
      }[];
    }[];
  } = {
    vendas: [],
  };

  public stringToDate(string: string): Date {
    return new Date(string);
  }

  public dateToString(date: Date): string {
    return 'testeS';
  }

  public async getRelatorio() {
    const response = await this.relatorioService.getRelatorio(
      this.dataInicial,
      this.dataFinal
    );

    if (response instanceof ErrorDTO) {
      console.log(response.code + ' ' + response.mensagem);
    } else {
      this.dados = response;
      console.log('carregou dados');
    }
  }
}
