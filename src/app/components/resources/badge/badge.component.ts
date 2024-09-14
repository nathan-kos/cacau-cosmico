import { Component, Input } from '@angular/core';
import { Categorias } from '../../../DTO/chocolate/categorias';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @Input() text: string = '';
  @Input() color: string = 'primary';
  @Input() size: string = 'md';
  @Input() textColor: string = '--branco';

  @Input() categoria: Categorias | undefined;

  onInit() {
    if (!this.text && !this.categoria) {
      throw new Error('Badge text is required');
    }

    if (!this.color && !this.categoria) {
      throw new Error('Badge color is required');
    }

    if (!this.size && !this.categoria) {
      throw new Error('Badge size is required');
    }

    if (!this.textColor && !this.categoria) {
      throw new Error('Badge textColor is required');
    }

    if (this.size !== 'sm' && this.size !== 'md' && this.size !== 'lg') {
      throw new Error('Badge size must be sm, md or lg');
    }

    if (this.categoria) {
      switch (this.categoria) {
        case Categorias.AMARGO:
          this.text = 'Amargo';
          this.color = '#392925';
          break;
        case Categorias.AO_LEITE:
          this.text = 'Ao Leite';
          this.color = '#745249';
          break;
        case Categorias.BRANCO:
          this.text = 'Branco';
          this.color = '#AE7C6E';
          break;
        case Categorias.AMENDOIM:
          this.text = 'Amendoim';
          this.color = '#D9A679';
          break;
        case Categorias.AVELA:
          this.text = 'Avelã';
          this.color = '#C9A77E';
          break;
        case Categorias.BARRA:
          this.text = 'Barra';
          this.color = '#C9A77E';
          break;
        case Categorias.BOMBOM:
          this.text = 'Bombom';
          this.color = '#C9A77E';
          break;
        case Categorias.CAIXA:
          this.text = 'Caixa';
          this.color = '#C9A77E';
          break;
        case Categorias.CARAMELO:
          this.text = 'Caramelo';
          this.color = '#C9A77E';
          break;
        case Categorias.COCO:
          this.text = 'Coco';
          this.color = '#fefefe';
          break;
        case Categorias.CONFEITADO:
          this.text = 'Confeitado';
          this.color = '#423f3f';
          break;
        case Categorias.CROCANTE:
          this.text = 'Crocante';
          this.color = '#C9A77E';
          break;
        case Categorias.CONFETE:
          this.text = 'Confete';
          this.color = '#C9A77E';
          break;
        case Categorias.FRUTAS_VERMELHAS:
          this.text = 'Frutas Vermelhas';
          this.color = '#DB3732';
          break;
        case Categorias.LICOR:
          this.text = 'Licor';
          this.color = '#C9A77E';
          break;
        case Categorias.MENTA:
          this.text = 'Menta';
          this.color = '#0000FF';
          break;
        case Categorias.NOZES:
          this.text = 'Nozes';
          this.color = '#C9A77E';
          break;
        case Categorias.RECHEADO:
          this.text = 'Recheado';
          this.color = '#C9A77E';
          break;
        case Categorias.SEM_ACUCAR:
          this.text = 'Sem Açúcar';
          this.color = '#ffffff';
          break;
        case Categorias.SEM_LACTOSE:
          this.text = 'Sem Lactose';
          this.color = '#ffffff';
          break;
        case Categorias.TRUFA:
          this.text = 'Trufa';
          this.color = '#C9A77E';
          break;
        default:
          this.text = 'Outros';
          this.color = 'dark';
      }
    }
  }
}
