import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Chocolate } from '../../../DTO/chocolate/Chocolate';
import { ChocolatePedido } from '../../../DTO/chocolatePedido/ChocolatePedido';
import { cupom } from '../../../DTO/Cupom/cupom';
import { ErrorDTO } from '../../../DTO/Error/ErrorDTO';
import { CreateTrocaDevolucao } from '../../../DTO/TrocaDevolucao/CreateTrocaDevolucaoDTO';
import { TrocaDevolucao } from '../../../DTO/TrocaDevolucao/TrocaDevolucao';
import { ChocolateService } from '../../../Services/chocolate/chocolate.service';
import { CupomService } from '../../../Services/cupom/cupom.service';
import { GlobalService } from '../../../Services/global.service';
import { TrocaDevolucaoService } from '../../../Services/trocaDevolucao/troca-devolucao.service';

@Component({
  selector: 'app-troca-devolucao',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './troca-devolucao.component.html',
  styleUrl: './troca-devolucao.component.css',
})
export class TrocaDevolucaoComponent implements OnInit {
  @Input() troca: boolean | undefined;
  @Input() cho_Id: string | undefined;
  @Input() ped_Id: string | undefined;
  @Input() chocolatePedido: ChocolatePedido | undefined;

  public hasAlreadyRequested: boolean = false;
  public trocaDevolucao: TrocaDevolucao | undefined;
  public chocolate: Chocolate | undefined;
  public cupom: cupom | undefined;

  public trocaForm: FormGroup | undefined;

  public usu_Id = this.globalService.defaultUsu_Id;

  constructor(
    private trocaDevolucaoService: TrocaDevolucaoService,
    private chocolateService: ChocolateService,
    private formBuilder: FormBuilder,
    private cupomService: CupomService,
    private router: Router,
    private globalService: GlobalService
  ) {}

  async ngOnInit(): Promise<void> {
    this.trocaForm = this.formBuilder.group({
      quantidade: [{ value: '' }],
    });

    if (this.troca == undefined || !this.chocolatePedido) {
      window.alert('ERRO1');
      return;
    }

    const trocaDevolucao = await this.trocaDevolucaoService.findByChoPed(
      this.chocolatePedido.chp_Id
    );

    if (trocaDevolucao instanceof ErrorDTO) {
      if ((trocaDevolucao.code = 404)) {
        this.hasAlreadyRequested = false;
        this.setNotFind();
      } else {
        window.alert(trocaDevolucao.mensagem + ' ' + trocaDevolucao.code);
      }
    } else {
      this.trocaDevolucao = trocaDevolucao;
      this.hasAlreadyRequested = true;
      this.setFind();
    }

    if (!this.cho_Id) {
      window.alert('ERROR2');
      return;
    }

    const chocolate = await this.chocolateService.FindById(this.cho_Id);

    if (chocolate instanceof ErrorDTO) {
      window.alert('ERROR3');
      return;
    }
    this.chocolate = chocolate;
  }

  private setForm() {
    this.trocaForm = this.formBuilder.group({
      quantidade: [{ value: '' }],
    });
  }

  private async setFind() {
    //se achou, procura o cupom
    const cupom = await this.cupomService.FindById(this.trocaDevolucao!.tde_Id);

    if (cupom instanceof ErrorDTO) {
      return;
    }

    this.cupom = cupom;
  }

  private async setNotFind() {
    this.hasAlreadyRequested = false;
    this.setForm();
  }

  public async onSubmit() {
    const quantidade = this.trocaForm!.get('quantidade')?.value;

    console.log(quantidade);

    if (!quantidade) {
      window.alert('Informe uma quantidade válida');
      return;
    }

    if (quantidade > this.chocolatePedido!.chp_Quantidade || quantidade < 1) {
      window.alert('Informe uma quantidade válida');
      return;
    }

    const data: CreateTrocaDevolucao = {
      tde_cho_ped_id: this.chocolatePedido!.chp_Id,
      tde_Quantidade: quantidade,
      tde_Troca: this.troca!,
    };

    const trocaDevolucao = await this.trocaDevolucaoService.create(data);

    if (trocaDevolucao instanceof ErrorDTO) {
      window.alert(trocaDevolucao.code + ' ' + trocaDevolucao.mensagem);
      return;
    } else {
      window.alert('Troca ou devolução solicitada com Sucesso');
      this.router.navigate(['/usuario/conta/' + this.usu_Id]);
    }
  }

  public formatarValor(valor: number) {
    return valor.toFixed(2).replace('.', ',');
  }
}
