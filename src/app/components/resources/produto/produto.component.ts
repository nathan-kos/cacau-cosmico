import { Component, Input } from '@angular/core';
import { BadgeComponent } from '../badge/badge.component';

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [BadgeComponent],
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css',
})
export class ProdutoComponent {
  @Input() id: string = '';
  @Input() nome: string = '';
  @Input() preco: number = 0;
  @Input() categoria: string[] = [];

  openProduct() {
    window.alert('função não implementada... ainda');
  }
}
