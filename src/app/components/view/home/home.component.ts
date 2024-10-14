import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chocolate } from '../../../DTO/chocolate/Chocolate';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { ChocolateService } from '../../../Services/chocolate/chocolate.service';
import { GlobalService } from '../../../Services/global.service';
import { ProdutoComponent } from '../../resources/produto/produto.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, ProdutoComponent, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  public menuVisible: boolean = false;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    private chocolateService: ChocolateService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getChocolates();
  }

  togleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInsideMenu = (event.target as HTMLElement).closest('.menu');
    if (!clickedInsideMenu) {
      this.menuVisible = false;
    }
  }

  goTo(category: string) {
    switch (category) {
      case 'branco':
        this.router.navigate(['/produtos/ana-chocolate-branco']);
        break;
      case 'amargo':
        this.router.navigate(['/produtos/buraco-negro-meio-amargo']);
        break;
      case 'leite':
        this.router.navigate(['/produtos/planeta-ao-leite']);
        break;
      case 'todos':
        this.router.navigate(['/produtos/universo-de-chocolate']);
        break;
      case 'usuario':
        this.router.navigate([
          '/usuario/conta/' + this.globalService.defaultUsu_Id,
        ]);
        break;
      case 'adm':
        this.router.navigate(['/admin']);
        break;
      case 'home':
        this.router.navigate(['home']);
        break;
      case 'carrinho':
        this.router.navigate(['/carrinho']);
        break;
      default:
        this.router.navigate(['/home']);
        break;
    }
  }

  public chocolates: Chocolate[] = [
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

  public async getChocolates(): Promise<void> {
    const response = await this.chocolateService.ListByIndex();

    if (response instanceof ErrorDTO) {
      console.error(response.code, response.mensagem);
      return;
    }

    this.chocolates = response;
  }
}
