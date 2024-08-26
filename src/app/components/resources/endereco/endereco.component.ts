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
import { CreateEnderecoDTO } from '../../../DTO/endereco/CreateEnderecoDTO';
import { Endereco } from '../../../DTO/endereco/Endereco';
import { EnderecoService } from '../../../Services/endereco/endereco.service';
import { ConfirmacaoComponent } from '../confirmacao/confirmacao.component';

@Component({
  selector: 'app-endereco',
  standalone: true,
  imports: [ReactiveFormsModule, NgxMaskDirective, NgIf, ConfirmacaoComponent],
  templateUrl: './endereco.component.html',
  styleUrl: './endereco.component.css',
})
export class EnderecoComponent implements OnInit {
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

  ngOnInit(): void {
    if (this.isNew) {
      this.setAction();
      this.enderecoForm.enable();
    }

    if (this.isEdit && this.endereco) {
      this.setAction();
      this.setValues();
      this.enderecoForm.enable();
    }

    if (this.isView && this.endereco) {
      this.setAction();
      this.setValues();
      this.enderecoForm.disable();
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private route: ActivatedRoute
  ) {
    this.enderecoForm = this.formBuilder.group({
      cep: [{ value: '', disabled: true }, Validators.required],
      rua: [{ value: '', disabled: true }, Validators.required],
      numero: [{ value: '', disabled: true }, Validators.required],
      complemento: [{ value: '', disabled: true }],
      bairro: [{ value: '', disabled: true }, Validators.required],
      cidade: [{ value: '', disabled: true }, Validators.required],
      UF: [{ value: '', disabled: true }, Validators.required],
      tipo: [{ value: '', disabled: true }, Validators.required],
    });

    this.enderecoForm.valueChanges.subscribe(() => {
      this.error = undefined;
    });
  }

  public async onSubmit(): Promise<void> {
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
      const endereco: CreateEnderecoDTO = {
        end_Bairro: this.enderecoForm.get('bairro')?.value,
        end_CEP: this.enderecoForm.get('cep')?.value,
        end_Cidade: this.enderecoForm.get('cidade')?.value,
        end_Complemento: this.enderecoForm.get('complemento')?.value,
        end_Numero: this.enderecoForm.get('numero')?.value,
        end_Rua: this.enderecoForm.get('rua')?.value,
        end_Tipo: this.enderecoForm.get('tipo')?.value,
        end_UF: this.enderecoForm.get('UF')?.value,
      };

      if (this.enderecoForm.get('complemento')?.value === '') {
        endereco.end_Complemento = undefined;
      }

      if (this.isEdit) {
        // chama o backend para editar o endereço

        if (!this.endereco) {
          window.alert('Endereço não encontrado!');
          return;
        }

        const usu_Id = this.endereco.end_usu_id;

        if (!usu_Id) {
          window.alert('Usuário não encontrado!');
          return;
        }

        await this.enderecoService.update(
          endereco,
          usu_Id,
          this.endereco.end_Id
        );

        this.doneEvent.emit();
      }

      if (this.isNew) {
        // chama o backend para criar um novo endereço
        let usu_Id = sessionStorage.getItem('last_usu_Id');

        if (!usu_Id) {
          usu_Id = this.route.snapshot.paramMap.get('id');

          if (!usu_Id) {
            window.alert('Usuário não encontrado!');
            return;
          }
        }

        await this.enderecoService.create(endereco, usu_Id);

        this.showConfirmacaoNew = true;
      }

      return;
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

  public setAction(): void {
    if (this.isEdit) {
      this.isEdit = true;
      this.isNew = false;
      this.isView = false;
    }
    if (this.isNew) {
      this.isEdit = false;
      this.isNew = true;
      this.isView = false;
    }
    if (this.isView) {
      this.isEdit = false;
      this.isNew = false;
      this.isView = true;
    }
  }

  public startEdit(): void {
    this.isEdit = true;
    this.isNew = false;
    this.isView = false;
  }

  public setValues(): void {
    if (!this.endereco) {
      return;
    }

    this.enderecoForm.setValue({
      cep: this.endereco.end_CEP,
      rua: this.endereco.end_Rua,
      numero: this.endereco.end_Numero,
      complemento: this.endereco.end_Complemento,
      bairro: this.endereco.end_Bairro,
      cidade: this.endereco.end_Cidade,
      UF: this.endereco.end_UF,
      tipo: this.endereco.end_Tipo,
    });
  }
}
