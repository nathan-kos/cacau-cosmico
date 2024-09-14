import { Component, Input, OnInit } from '@angular/core';
import { Chocolate } from '../../../DTO/chocolate/Chocolate';
import { CarrinhoService } from '../../../Services/carrinho/carrinho.service';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css',
})
export class ProdutoComponent implements OnInit {
  @Input() chocolate: Chocolate | undefined;

  constructor(private carrinhoService: CarrinhoService) {}

  ngOnInit() {
    if (this.chocolate === undefined) {
      this.chocolate = {
        cho_Id: '0',
        cho_Nome: 'Produto não encontrado',
        cho_Descricao: 'Produto não encontrado',
        cho_Valor: 0,
        cho_Imagem: 'https://via.placeholder.com/150',
        cho_Ativo: false,
        cho_Peso: 0,
        catergorias: [],
        cho_AtualizadoEm: new Date(),
        cho_CriadoEm: new Date(),
      };
    }
  }

  public AdicionarAoCarrinho() {
    if (this.chocolate === undefined) {
      return;
    }
    this.carrinhoService.AdicionarChocolateAoCarrinho(this.chocolate);
  }
}
