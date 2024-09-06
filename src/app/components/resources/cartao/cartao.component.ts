import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { Cartao } from '../../../DTO/cartao/Cartão';
import { CreateCartDTO } from '../../../DTO/cartao/CreateCartDTO';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { CartaoService } from '../../../Services/cartao/cartao.service';
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

  constructor(
    private formBuilder: FormBuilder,
    private cartaoService: CartaoService,
    private route: ActivatedRoute
  ) {
    this.cartaoForm = this.formBuilder.group({
      nome: [{ value: '', disabled: true }, Validators.required],
      numero: [{ value: '', disabled: true }, Validators.required],
      validade: [{ value: '', disabled: true }, Validators.required],
      cvv: [{ value: '', disabled: true }, Validators.required],
      bandeira: [{ value: '', disabled: true }, Validators.required],
      apelido: [{ value: '', disabled: true }, Validators.required],
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

  public async onSubmit(): Promise<void> {
    if (!this.cartaoForm.valid) {
      // passa um por um e verifica se está válido e soma na mensagem de erro para exibir
      this.error = 'Formulário inválido<br>';
      if (this.cartaoForm.controls['nome'].invalid) {
        this.error += 'Nome inválido<br>';
      }
      if (this.cartaoForm.controls['numero'].invalid) {
        this.error += 'Número inválido<br>';
      }
      if (this.cartaoForm.controls['validade'].invalid) {
        this.error += 'Validade inválida<br>';
      }
      if (this.cartaoForm.controls['cvv'].invalid) {
        this.error += 'CVV inválido<br>';
      }
      if (this.cartaoForm.controls['bandeira'].invalid) {
        this.error += 'Bandeira inválida<br>';
      }
    } else {
      const cartao = new CreateCartDTO(
        this.cartaoForm.controls['nome'].value,
        this.cartaoForm.controls['numero'].value,
        this.cartaoForm.controls['validade'].value,
        this.cartaoForm.controls['cvv'].value,
        this.cartaoForm.controls['bandeira'].value,
        this.cartaoForm.controls['apelido'].value
      );

      let usu_Id = sessionStorage.getItem('last_usu_Id');

      if (!usu_Id) {
        usu_Id = this.route.snapshot.paramMap.get('id');

        if (!usu_Id) {
          window.alert('Usuário não encontrado!');
          return;
        }
      }

      const response = await this.cartaoService.create(cartao, usu_Id);

      if (response instanceof ErrorDTO) {
        this.error = response.mensagem;
        return;
      }

      this.showConfirmacaoNew = true;
    }
  }

  public onDone(): void {
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
    if (!this.cartao) {
      return;
    }

    const response = this.cartaoService.delete(
      this.cartao.car_usu_id,
      this.cartao.car_Id
    );

    if (response instanceof ErrorDTO) {
      this.error = response.mensagem;
      return;
    }

    this.showConfirmacaoDelete = false;
    this.doneEvent.emit();
  }

  public closeModal(): void {
    this.showConfirmacaoDelete = false;
  }
}
