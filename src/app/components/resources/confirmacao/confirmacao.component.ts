import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmacao',
  standalone: true,
  imports: [],
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.css',
})
export class ConfirmacaoComponent {
  @Input() text: string = 'Deseja confirmar?';
  @Output() confirmEvent = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  public confirmar(): void {
    this.confirmEvent.emit();
  }

  public cancelar(): void {
    this.cancelEvent.emit();
  }
}
