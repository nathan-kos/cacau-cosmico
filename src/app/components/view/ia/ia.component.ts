import { Component } from '@angular/core';
import { HeaderComponent } from '../../resources/header/header.component';

@Component({
  selector: 'app-ia',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './ia.component.html',
  styleUrl: './ia.component.css',
})
export class IaComponent {}
