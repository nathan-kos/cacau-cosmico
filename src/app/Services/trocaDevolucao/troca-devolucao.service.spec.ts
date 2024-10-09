import { TestBed } from '@angular/core/testing';

import { TrocaDevolucaoService } from './troca-devolucao.service';

describe('TrocaDevolucaoService', () => {
  let service: TrocaDevolucaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrocaDevolucaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
