import { TestBed } from '@angular/core/testing';
import { RelatorioService } from './relatorio.service';

describe('RelatoriService', () => {
  let service: RelatorioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
