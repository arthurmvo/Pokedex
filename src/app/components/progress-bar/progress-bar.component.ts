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
  private _value!: number;

  @Input()
  set value(value: number) {
    this._value = value < 30 ? 30 : value;
  }
  get value(): number {
    return this._value;
  }
  @Input() max!: number;

  @Input()
  set stat(name: string) {
    this._stat = name.replace(' ', '-');
  }

  get stat(): string {
    return this._stat;
  }
}
