import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
export class CartaoComponent implements OnInit {
  @Output() doneEvent = new EventEmitter<void>();
  @Input() isNew: boolean | undefined;
  @Input() isView: boolean | undefined;
  @Input() cartao: Cartao | undefined;

  public cartaoForm: FormGroup;

  public showConfirmacaoNew: boolean = false;
  public showConfirmacaoDelete: boolean = false;

  public error: string | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.cartaoForm = this.formBuilder.group({
      nome: [{ value: '', disabled: true }, Validators.required],
      numero: [{ value: '', disabled: true }, Validators.required],
      validade: [{ value: '', disabled: true }, Validators.required],
      cvv: [{ value: '', disabled: true }, Validators.required],
      bandeira: [{ value: '', disabled: true }, Validators.required],
    });

    this.cartaoForm.valueChanges.subscribe(() => {
      this.error = undefined;
    });
  }

  ngOnInit(): void {
    if (this.isView && this.cartao) {
      // Preenche o formulário com os dados do cartão em modo de visualização
      this.cartaoForm.patchValue({
        nome: this.cartao.car_Nome,
        numero: this.cartao.car_Numero,
        validade: this.cartao.car_Validade,
        cvv: this.cartao.car_CVV,
        bandeira: this.cartao.car_Bandeira,
      });
    }

    if (this.isNew) {
      // Habilita o formulário para permitir a criação de um novo cartão
      this.cartaoForm.enable();
      this.cartaoForm.reset();
    }
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

      this.showConfirmacaoNew = true;
    }
  }

  public onDone(): void {
    console.log('submeteu');
    this.doneEvent.emit();
  }

  public newCartao(): void {
    this.isNew = true;
    this.isView = false;
    this.cartaoForm.enable();
    this.cartaoForm.reset();

    this.showConfirmacaoNew = false;
  }

  public deleteCartao(): void {
    this.showConfirmacaoDelete = true;
  }

  public callDelete(): void {
    window.alert('Cartão deletado com sucesso!');
    this.showConfirmacaoDelete = false;
    this.doneEvent.emit();
  }

  public closeModal(): void {
    this.showConfirmacaoDelete = false;
  }
}
