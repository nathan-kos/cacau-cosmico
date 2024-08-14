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
  public showConfirmacao: boolean = false;

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
      this.error = 'Formulário inválido';
      if (this.enderecoForm.controls['cep'].invalid) {
        this.error += '\nCEP inválido';
      }
      if (this.enderecoForm.controls['rua'].invalid) {
        this.error += '\nRua inválida';
      }
      if (this.enderecoForm.controls['numero'].invalid) {
        this.error += '\nNúmero inválido';
      }
      if (this.enderecoForm.controls['bairro'].invalid) {
        this.error += '\nBairro inválido';
      }
      if (this.enderecoForm.controls['cidade'].invalid) {
        this.error += '\nCidade inválida';
      }
      if (this.enderecoForm.controls['UF'].invalid) {
        this.error += '\nUF inválido';
      }
      if (this.enderecoForm.controls['tipo'].invalid) {
        this.error += '\nTipo inválido';
      }
    } else {
      const endereco = this.enderecoForm.value as Endereco;

      // se estiver válido, chama o backend para salvar

      // se o backend retornar erro, exibe a mensagem de erro

      window.alert('Funcionalidade não implementada ...ainda');

      //perguntar se quer adicionar outro endereço
      // se o backend retornar sucesso, avança para o próximo

      this.showConfirmacao = true;
    }
  }

  public onDone(): void {
    this.doneEvent.emit();
  }

  public newEndereco(): void {
    this.showConfirmacao = false;
    this.enderecoForm.reset();
  }
}
