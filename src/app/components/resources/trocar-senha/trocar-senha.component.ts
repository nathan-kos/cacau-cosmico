import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Usuario } from '../../../DTO/Usuario/Usuario';

@Component({
  selector: 'app-trocar-senha',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './trocar-senha.component.html',
  styleUrl: './trocar-senha.component.css',
})
export class TrocarSenhaComponent {
  @Input() usario: Usuario | undefined;
  @Output() doneEvent = new EventEmitter<void>();

  public trocarSenhaForm: FormGroup;

  public error: string | null = null;

  constructor(private formBuilder: FormBuilder) {
    this.trocarSenhaForm = this.formBuilder.group({
      senhaAtual: ['', [Validators.required]],
      novaSenha: ['', [Validators.required]],
      confirmarNovaSenha: ['', [Validators.required]],
    });

    this.trocarSenhaForm.valueChanges.subscribe(() => {
      this.error = null;
    });
  }

  public onSubmit(): void {
    if (!this.trocarSenhaForm.valid) {
      this.error = 'Formulário inválido';
      return;
    }

    if (
      this.trocarSenhaForm.value.novaSenha !==
      this.trocarSenhaForm.value.confirmarNovaSenha
    ) {
      this.error = 'As senhas não coincidem';
      return;
    }

    // Chamar o serviço para trocar a senha

    window.alert('Senha trocada com sucesso');
    this.doneEvent.emit();
  }
}
