import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private router: Router) {}

  public goToUsuarios() {
    this.router.navigate(['usuario/listagem']);
  }

  public goToPedidos() {
    this.router.navigate(['pedido/listagem']);
  }

  public goToDevolucoes() {
    this.router.navigate(['troca-devolucao/listagem']);
  }
}
