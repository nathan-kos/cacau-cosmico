import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../../DTO/Usuario/Usuario';
import { fieldsMatchValidator } from '../../../utils/Validators/FildsMatch.validator';
import { passwordStrengthValidator } from '../../../utils/Validators/Password.validator';

@Component({
  selector: 'app-trocar-senha',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './trocar-senha.component.html',
  styleUrl: './trocar-senha.component.css',
})
export class TrocarSenhaComponent {
  @Input() usario: Usuario | undefined;
  @Output() doneEvent = new EventEmitter<void>();

  public trocarSenhaForm: FormGroup;

  public error: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.trocarSenhaForm = this.formBuilder.group(
      {
        senhaAtual: ['', [Validators.required]],
        novaSenha: ['', [Validators.required]],
        confirmarNovaSenha: ['', [Validators.required]],
      },
      {
        validators: [
          fieldsMatchValidator('novaSenha', 'confirmarNovaSenha'),
          passwordStrengthValidator('novaSenha'),
        ],
      }
    );

    this.trocarSenhaForm.valueChanges.subscribe(() => {
      this.error = null;
    });
  }

  public onSubmit(): void {
    this.error = '';

    if (!this.trocarSenhaForm.valid) {
      // Verifica e adiciona mensagens de erro para cada campo
      if (this.trocarSenhaForm.controls['senhaAtual'].invalid) {
        this.error += 'Senha atual é obrigatória<br>';
      }
      if (this.trocarSenhaForm.controls['novaSenha'].invalid) {
        this.error += 'Nova senha é obrigatória<br>';
      }
      if (this.trocarSenhaForm.controls['confirmarNovaSenha'].invalid) {
        this.error += 'Confirmação da nova senha é obrigatória<br>';
      }
      if (
        this.trocarSenhaForm.controls['novaSenha'].value !==
        this.trocarSenhaForm.controls['confirmarNovaSenha'].value
      ) {
        this.error += 'As novas senhas não coincidem<br>';
      }
      if (this.trocarSenhaForm.controls['novaSenha'].value.length < 8) {
        this.error += 'A nova senha deve conter no mínimo 8 caracteres<br>';
      }
      if (!/[A-Z]/.test(this.trocarSenhaForm.controls['novaSenha'].value)) {
        this.error +=
          'A nova senha deve conter pelo menos uma letra maiúscula<br>';
      }
      if (!/[a-z]/.test(this.trocarSenhaForm.controls['novaSenha'].value)) {
        this.error +=
          'A nova senha deve conter pelo menos uma letra minúscula<br>';
      }
      if (
        !/[!@#$%^&*(),.?":{}|<>]/.test(
          this.trocarSenhaForm.controls['novaSenha'].value
        )
      ) {
        this.error +=
          'A nova senha deve conter pelo menos um caractere especial<br>';
      }
      return;
    }

    // Chamar o serviço para trocar a senha

    window.alert('Senha trocada com sucesso');
    this.doneEvent.emit();
  }
}
