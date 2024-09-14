import { Injectable } from '@angular/core';
import { Chocolate } from '../../DTO/chocolate/Chocolate';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  constructor() {}

  // adiciona um item ao carrinho
  public AdicionarChocolateAoCarrinho(chocolate: Chocolate) {
    let carrinho = this.ObterCarrinho();
    carrinho.push(chocolate);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  // remove um item do carrinho
  public RemoverChocolateDoCarrinho(chocolate: Chocolate) {
    let carrinho = this.ObterCarrinho();
    carrinho = carrinho.filter((c) => c.cho_Id != chocolate.cho_Id);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  }

  // retorna o carrinho
  public ObterCarrinho(): Chocolate[] {
    let carrinho = localStorage.getItem('carrinho');
    if (carrinho == null) {
      const carrinhoVazio: Chocolate[] = [];
      return carrinhoVazio;
    }
    return JSON.parse(carrinho);
  }
}
