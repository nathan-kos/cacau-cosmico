import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  public produtos: any = {
    page: 1,
    limit: 10,
    total: 100,
    data: [
      {
        id: 1,
        nome: 'Chocolate Branco',
        descricao: 'Chocolate Branco',
        preco: 10.0,
        categoria: 'ana-chocolate-branco',
      },
      {
        id: 2,
        nome: 'Chocolate Meio Amargo',
        descricao: 'Chocolate Meio Amargo',
        preco: 10.0,
        categoria: ['buraco-negro-meio-amargo', 'planeta-ao-leite'],
      },
      {
        id: 2,
        nome: 'Chocolate Meio Amargo',
        descricao: 'Chocolate Meio Amargo',
        preco: 10.0,
        categoria: ['buraco-negro-meio-amargo', 'planeta-ao-leite'],
      },
      {
        id: 2,
        nome: 'Chocolate Meio Amargo',
        descricao: 'Chocolate Meio Amargo',
        preco: 10.0,
        categoria: ['buraco-negro-meio-amargo', 'planeta-ao-leite'],
      },
      {
        id: 2,
        nome: 'Chocolate Meio Amargo',
        descricao: 'Chocolate Meio Amargo',
        preco: 10.0,
        categoria: ['buraco-negro-meio-amargo', 'planeta-ao-leite'],
      },
      {
        id: 2,
        nome: 'Chocolate Meio Amargo',
        descricao: 'Chocolate Meio Amargo',
        preco: 10.0,
        categoria: ['buraco-negro-meio-amargo', 'planeta-ao-leite'],
      },
      {
        id: 2,
        nome: 'Chocolate Meio Amargo',
        descricao: 'Chocolate Meio Amargo',
        preco: 10.0,
        categoria: ['buraco-negro-meio-amargo', 'planeta-ao-leite'],
      },
      {
        id: 2,
        nome: 'Chocolate Meio Amargo',
        descricao: 'Chocolate Meio Amargo',
        preco: 10.0,
        categoria: ['buraco-negro-meio-amargo', 'planeta-ao-leite'],
      },
      {
        id: 2,
        nome: 'Chocolate Meio Amargo',
        descricao: 'Chocolate Meio Amargo',
        preco: 10.0,
        categoria: ['buraco-negro-meio-amargo', 'planeta-ao-leite'],
      },
    ],
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['categoria'] === undefined) {
        this.categoria = 'universo-de-chocolate';
      } else {
        this.categoria = params['categoria'];
      }
    });

    // this.updateProdutos();
  }

  // Método para navegar para a próxima página
  public proximaPagina(): void {
    if (this.produtos.page < this.paginasTotal()) {
      this.pagina++;
      this.updateProdutos();
    }
  }

  // Método para navegar para a página anterior
  public paginaAnterior(): void {
    if (this.produtos.page > 1) {
      this.produtos.page--;
      this.updateProdutos();
    }
  }

  public paginasTotal(): number {
    return Math.ceil(this.produtos.total / this.produtos.limit);
  }

  updateProdutos(): void {
    window.alert('Método não implementado ...ainda');
  }

  getCategoria(): string {
    switch (this.categoria) {
      case 'ana-chocolate-branco':
        return 'Branco';
      case 'buraco-negro-meio-amargo':
        return 'Amargo';
      case 'planeta-ao-leite':
        return 'AoLeite';
      case 'universo-de-chocolate':
        return 'Universo';
      default:
        return 'Universo';
    }
  }

  ChangeCategoria(categoria: string): void {
    this.categoria = categoria;
    // this.updateProdutos();
  }
}
