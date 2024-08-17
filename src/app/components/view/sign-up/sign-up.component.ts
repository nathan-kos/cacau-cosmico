import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective } from 'ngx-mask';
import { CartaoComponent } from '../../resources/cartao/cartao.component';
import { EnderecoComponent } from '../../resources/endereco/endereco.component';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgIf,
    EnderecoComponent,
    CartaoComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  public signUpForm: FormGroup;

  public error: string | undefined;

  // estagios do cadastro
  public showStageUser = true;
  public showStageAddress = false;
  public showStageCard = false;
  public hasNext = true;

  constructor(private formBuilder: FormBuilder, private router: Router) {
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
      this.error = 'Formulário inválido<br>';
      if (this.signUpForm.controls['nome'].invalid) {
        this.error += 'Nome inválido<br>';
      }
      if (this.signUpForm.controls['email'].invalid) {
        this.error += 'Email inválido<br>';
      }
      if (this.signUpForm.controls['senha'].invalid) {
        this.error += 'Senha inválida<br>';
      }
      if (this.signUpForm.controls['cpf'].invalid) {
        this.error += 'CPF inválido<br>';
        this.error += ' CPF deve conter 11 dígitos<br>';
      }
      if (this.signUpForm.controls['dataNascimento'].invalid) {
        this.error += 'Data de nascimento inválida<br>';
      }
      if (this.signUpForm.controls['genero'].invalid) {
        this.error += 'Gênero inválido<br>';
      }
      if (this.signUpForm.controls['telefone'].invalid) {
        this.error += 'Telefone inválido<br>';
      }
      return;
    }

    const { nome, email, senha, cpf, dataNascimento, genero, telefone } =
      this.signUpForm.value;

    // manda para o backend

    // muda para a próxima etapa
    this.changeToAddress();

    window.alert('Função não implementada... ainda');
  }

  // funções para mudar de etapa
  public changeToAddress(): void {
    this.showStageUser = false;
    this.showStageAddress = true;
    this.showStageCard = false;

    // muda o style das divs etapas
    const user = document.getElementById('user');
    const address = document.getElementById('endereco');
    const card = document.getElementById('cartao');

    if (!user || !address || !card) return;

    //muda a classe para a div atual
    user.className = 'unstaged';
    address.className = 'staged';
    card.className = 'unstaged';
  }

  public changeToCard(): void {
    this.showStageUser = false;
    this.showStageAddress = false;
    this.showStageCard = true;

    this.hasNext = false;

    const user = document.getElementById('user');
    const address = document.getElementById('endereco');
    const card = document.getElementById('cartao');

    if (!user || !address || !card) return;

    user.className = 'unstaged';
    address.className = 'unstaged';
    card.className = 'staged';
  }

  public Done(): void {
    this.router.navigate(['/']);
  }
}
