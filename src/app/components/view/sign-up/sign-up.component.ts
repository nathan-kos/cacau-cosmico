import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [HeaderComponent, ReactiveFormsModule, NgxMaskDirective, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  public signUpForm: FormGroup;

  public error: string | undefined;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      nome: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      genero: ['', Validators.required],
      telefone: ['', Validators.required],
    });

    this.signUpForm.valueChanges.subscribe(() => {
      this.error = undefined;
    });
  }

  public onSubmit(): void {
    if (!this.signUpForm.valid) {
      // passa um por um e verifica se está válido e soma na mensagem de erro para exibir
      this.error = 'Formulário inválido';
      if (this.signUpForm.controls['nome'].invalid) {
        this.error += '\nNome inválido';
      }
      if (this.signUpForm.controls['email'].invalid) {
        this.error += '\nEmail inválido';
      }
      if (this.signUpForm.controls['senha'].invalid) {
        this.error += '\nSenha inválida';
      }
      if (this.signUpForm.controls['cpf'].invalid) {
        this.error += '\nCPF inválido';
        this.error += '\nCPF deve conter 11 dígitos';
      }
      if (this.signUpForm.controls['dataNascimento'].invalid) {
        this.error += '\nData de nascimento inválida';
      }
      if (this.signUpForm.controls['genero'].invalid) {
        this.error += '\nGênero inválido';
      }
      if (this.signUpForm.controls['telefone'].invalid) {
        this.error += '\nTelefone inválido';
      }
      return;
    }

    const { nome, email, senha, cpf, dataNascimento, genero, telefone } =
      this.signUpForm.value;

    window.alert('Função não implementada... ainda');
  }
}
