import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
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
  constructor(public relatorioService: RelatorioService) {
    Chart.register(...registerables);
  }

  async ngOnInit(): Promise<void> {
    await this.getRelatorio();
  }
  public dataInicial: string = '2024-10-29';
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

  public chartData: ChartData<'line'> | undefined;
  private chart: Chart | undefined;

  public formatDate(date: string): string {
    const parsedDate = new Date(date);
    parsedDate.setDate(parsedDate.getDate() + 1);

    const formattedDate = parsedDate.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

    return formattedDate;
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
      this.chartData = this.buildVendasChartData(this.dados);
      this.renderChart();
    }
  }

  public chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 50,
        ticks: {
          stepSize: 1,
        },
      },
      x: {
        type: 'category',
        ticks: {
          autoSkip: false,
        },
      },
    },
  };

  private buildVendasChartData(response: {
    vendas: {
      chocolate: string;
      data: { quantidade: number; data: string }[];
    }[];
  }): ChartData<'line'> {
    // Extrai todas as datas únicas do relatório, formatando-as
    const allDates = Array.from(
      new Set(
        response.vendas.flatMap((venda) =>
          venda.data.map((entry) => this.formatDate(entry.data))
        )
      )
    ).sort((a, b) => {
      // Converte as datas formatadas para Date ao ordenar
      const dateA = new Date(a.split('/').reverse().join('-')).getTime();
      const dateB = new Date(b.split('/').reverse().join('-')).getTime();
      return dateA - dateB;
    });

    // Monta os datasets para cada chocolate com as quantidades corretas
    const datasets = response.vendas.map((venda) => ({
      label: venda.chocolate,
      data: allDates.map((formattedDate) => {
        // Encontra o dado de venda correspondente à data formatada
        const vendaData = venda.data.find(
          (entry) => this.formatDate(entry.data) === formattedDate
        );
        return vendaData ? vendaData.quantidade : 0; // Retorna 0 se não houver venda
      }),
      borderColor: this.getRandomColor(),
      fill: false,
    }));

    return {
      labels: allDates,
      datasets,
    };
  }

  // Função para gerar uma cor aleatória para cada linha do gráfico
  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.chartData) {
      this.chart = new Chart('lineChart', {
        type: 'line',
        data: this.chartData,
        options: this.chartOptions,
      });
    }
  }
}
