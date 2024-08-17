import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { Endereco } from '../../../DTO/endereco/Endereco';
import { ConfirmacaoComponent } from '../confirmacao/confirmacao.component';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgIf, ConfirmacaoComponent],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css',
})
export class EnderecoComponent {
  @Output() doneEvent = new EventEmitter<void>();
  @Input() isNew: boolean = true;
  @Input() isEdit: boolean = false;
  @Input() isView: boolean = false;
  @Input() endereco: Endereco | undefined;

  public enderecoForm: FormGroup;
  public showConfirmacaoNew: boolean = false;
  public showConfirmacaoDelete: boolean = false;

  public buttonText: string = this.setButtonText();

  public error: string | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.enderecoForm = this.formBuilder.group({
      cep: ['', Validators.required],
      rua: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      UF: ['', Validators.required],
      tipo: ['', Validators.required],
    });

    this.enderecoForm.valueChanges.subscribe(() => {
      this.error = undefined;
    });
  }

  public onSubmit(): void {
    if (!this.enderecoForm.valid) {
      // passa um por um e verifica se está válido e soma na mensagem de erro para exibir
      this.error = 'Formulário inválido<br>';
      if (this.enderecoForm.controls['cep'].invalid) {
        this.error += 'CEP inválido<br>';
      }
      if (this.enderecoForm.controls['rua'].invalid) {
        this.error += 'Rua inválida<br>';
      }
      if (this.enderecoForm.controls['numero'].invalid) {
        this.error += 'Número inválido<br>';
      }
      if (this.enderecoForm.controls['bairro'].invalid) {
        this.error += 'Bairro inválido<br>';
      }
      if (this.enderecoForm.controls['cidade'].invalid) {
        this.error += 'Cidade inválida<br>';
      }
      if (this.enderecoForm.controls['UF'].invalid) {
        this.error += 'UF inválido<br>';
      }
      if (this.enderecoForm.controls['tipo'].invalid) {
        this.error += 'Tipo inválido<br>';
      }
    } else {
      const endereco = this.enderecoForm.value as Endereco;

      // se estiver válido, chama o backend para salvar

      // se o backend retornar erro, exibe a mensagem de erro

      window.alert('Funcionalidade não implementada ...ainda');

      //perguntar se quer adicionar outro endereço
      // se o backend retornar sucesso, avança para o próximo

      this.showConfirmacaoNew = true;
    }
  }

  public onDone(): void {
    this.doneEvent.emit();
  }

  public newEndereco(): void {
    this.showConfirmacaoNew = false;
    this.enderecoForm.reset();
  }

  public deleteEndereco(): void {
    this.showConfirmacaoDelete = true;
  }

  public callDelete(): void {
    window.alert('Endereço deletado com sucesso!');
    this.showConfirmacaoDelete = false;
    this.doneEvent.emit();
  }

  public closeModal(): void {
    this.showConfirmacaoDelete = false;
  }

  private setButtonText() {
    if (this.isEdit) {
      return 'Enviar';
    } else {
      return 'Continuar';
    }
  }
}
