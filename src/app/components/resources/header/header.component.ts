import { NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  public menuVisible: boolean = false;

  constructor(private router: Router) {}

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
        this.router.navigate(['/usuario']);
        break;
      case 'adm':
        this.router.navigate(['/usuario/listagem']);
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
}
