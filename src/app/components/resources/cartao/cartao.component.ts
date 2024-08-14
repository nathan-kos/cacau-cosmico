import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Cartao } from '../../../DTO/cartao/Cartão';
import { ConfirmacaoComponent } from '../confirmacao/confirmacao.component';

@Component({
  selector: 'app-cartao',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgIf, ConfirmacaoComponent],
  templateUrl: './cartao.component.html',
  styleUrl: './cartao.component.css',
})
export class CartaoComponent {
  @Output() doneEvent = new EventEmitter<void>();
  @Input() isNew: boolean = true;
  @Input() isEdit: boolean = false;
  @Input() isView: boolean = false;
  @Input() cartao: Cartao | undefined;

  public cartaoForm: FormGroup;

  public showConfirmacao: boolean = false;

  public error: string | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.cartaoForm = this.formBuilder.group({
      nome: ['', Validators.required],
      numero: ['', Validators.required],
      validade: ['', Validators.required],
      cvv: ['', Validators.required],
      bandeira: ['', Validators.required],
    });

    this.cartaoForm.valueChanges.subscribe(() => {
      this.error = undefined;
    });
  }

  public onSubmit(): void {
    if (!this.cartaoForm.valid) {
      // passa um por um e verifica se está válido e soma na mensagem de erro para exibir
      this.error = 'Formulário inválido';
      if (this.cartaoForm.controls['nome'].invalid) {
        this.error += '\nNome inválido';
      }
      if (this.cartaoForm.controls['numero'].invalid) {
        this.error += '\nNúmero inválido';
      }
      if (this.cartaoForm.controls['validade'].invalid) {
        this.error += '\nValidade inválida';
      }
      if (this.cartaoForm.controls['cvv'].invalid) {
        this.error += '\nCVV inválido';
      }
      if (this.cartaoForm.controls['bandeira'].invalid) {
        this.error += '\nBandeira inválida';
      }
    } else {
      const cartao = this.cartaoForm.value as Cartao;

      window.alert('Cartão cadastrado com sucesso!');

      this.showConfirmacao = true;
    }
  }

  public onDone(): void {
    console.log('submeteu');
    this.doneEvent.emit();
  }

  public newCartao(): void {
    console.log('bugou');
    this.showConfirmacao = false;
    this.cartaoForm.reset();
  }
}
