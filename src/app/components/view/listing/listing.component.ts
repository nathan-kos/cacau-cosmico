import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorias } from '../../../DTO/chocolate/categorias';
import { Chocolate } from '../../../DTO/chocolate/Chocolate';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { ChocolateService } from '../../../Services/chocolate/chocolate.service';
import { HeaderComponent } from '../../resources/header/header.component'; // Import ActivatedRoute
import { ProdutoComponent } from '../../resources/produto/produto.component';

@Component({
  selector: 'app-listing',
  standalone: true,
  imports: [HeaderComponent, ProdutoComponent, NgFor, NgIf],
  templateUrl: './listing.component.html',
  styleUrl: './listing.component.css',
})
export class ListingComponent implements OnInit {
  // parametro opcional da rota
  public categoria: string = '';

  // paginação
  public pagina: number = 1;
  public limite: number = 10;
  public total: number = 0;

  public produtos: Chocolate[] = [
    {
      cho_Id: '0',
      cho_Nome: 'Produto não encontrado',
      cho_Descricao: 'Produto não encontrado',
      cho_Valor: 0,
      cho_Imagem: 'https://via.placeholder.com/150',
      cho_Ativo: false,
      cho_Peso: 0,
      catergorias: [],
      cho_AtualizadoEm: '2021-09-01',
      cho_CriadoEm: '2021-09-01',
    },
    {
      cho_Id: '0',
      cho_Nome: 'Produto não encontrado',
      cho_Descricao: 'Produto não encontrado',
      cho_Valor: 0,
      cho_Imagem: 'https://via.placeholder.com/150',
      cho_Ativo: false,
      cho_Peso: 0,
      catergorias: [],
      cho_AtualizadoEm: '2021-09-01',
      cho_CriadoEm: '2021-09-01',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private chocolateService: ChocolateService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe((params) => {
      if (params['categoria'] === undefined) {
        this.categoria = 'universo-de-chocolate';
      } else {
        this.categoria = params['categoria'];
      }
    });

    await this.updateProdutos();
  }

  // Método para navegar para a próxima página
  public proximaPagina(): void {
    if (this.pagina < this.paginasTotal()) {
      this.pagina++;
      this.updateProdutos();
    }
  }

  // Método para navegar para a página anterior
  public paginaAnterior(): void {
    if (this.pagina > 1) {
      this.pagina--;
      this.updateProdutos();
    }
  }

  public paginasTotal(): number {
    return Math.ceil(this.total / this.limite);
  }

  async updateProdutos(): Promise<void> {
    if (this.categoria === 'universo-de-chocolate') {
      const response = await this.chocolateService.FindAllAtivos(
        this.pagina,
        this.limite
      );

      if (response instanceof ErrorDTO) {
        window.alert(response.mensagem);
      } else {
        this.produtos = response.results;
        this.total = response.total;
      }
    }

    if (this.categoria === 'ana-chocolate-branco') {
      const response = await this.chocolateService.ListByCategoria(
        this.pagina,
        this.limite,
        Categorias.BRANCO
      );

      if (response instanceof ErrorDTO) {
        window.alert(response.mensagem);
      } else {
        this.produtos = response.results;
        this.total = response.total;
      }
    }

    if (this.categoria === 'buraco-negro-meio-amargo') {
      const response = await this.chocolateService.ListByCategoria(
        this.pagina,
        this.limite,
        Categorias.AMARGO
      );

      if (response instanceof ErrorDTO) {
        window.alert(response.mensagem);
      } else {
        this.produtos = response.results;
        this.total = response.total;
      }
    }

    if (this.categoria === 'planeta-ao-leite') {
      const response = await this.chocolateService.ListByCategoria(
        this.pagina,
        this.limite,
        Categorias.AO_LEITE
      );

      if (response instanceof ErrorDTO) {
        window.alert(response.mensagem);
      } else {
        this.produtos = response.results;
        this.total = response.total;
      }
    }
  }

  // getCategoria(): string {
  //   switch (this.categoria) {
  //     case 'ana-chocolate-branco':
  //       return 'Branco';
  //     case 'buraco-negro-meio-amargo':
  //       return 'Amargo';
  //     case 'planeta-ao-leite':
  //       return 'AoLeite';
  //     case 'universo-de-chocolate':
  //       return 'Universo';
  //     default:
  //       return 'Universo';
  //   }
  // }

  ChangeCategoria(categoria: string): void {
    this.categoria = categoria;
    this.updateProdutos();
  }
}
