import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
})
export class BadgeComponent {
  @Input() text: string = '';
  @Input() color: string = 'primary';
  @Input() size: string = 'md';
  @Input() textColor: string = '--branco';

  onInit() {
    if (!this.text) {
      throw new Error('Badge text is required');
    }

    if (!this.color) {
      throw new Error('Badge color is required');
    }

    if (!this.size) {
      throw new Error('Badge size is required');
    }

    if (!this.textColor) {
      throw new Error('Badge textColor is required');
    }

    if (this.size !== 'sm' && this.size !== 'md' && this.size !== 'lg') {
      throw new Error('Badge size must be sm, md or lg');
    }
  }
}
