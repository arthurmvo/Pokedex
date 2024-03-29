import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { stat } from 'fs';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css',
})
export class ProgressBarComponent {
  private _stat!: string;
  @Input() value!: number;
  @Input() max!: number;

  @Input()
  set stat(value: string) {
    this._stat = value.replace(' ', '-');
  }

  get stat(): string {
    return this._stat;
  }
}
