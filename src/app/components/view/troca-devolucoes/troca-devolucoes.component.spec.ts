import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrocaDevolucoesComponent } from './troca-devolucoes.component';

describe('TrocaDevolucoesComponent', () => {
  let component: TrocaDevolucoesComponent;
  let fixture: ComponentFixture<TrocaDevolucoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrocaDevolucoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrocaDevolucoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
