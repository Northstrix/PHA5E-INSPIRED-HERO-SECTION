import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-chronicle-button',
  templateUrl: './chronicle-button.component.html',
  styleUrls: ['./chronicle-button.component.css']
})
export class ChronicleButtonComponent {
  @Input() text: string = '';
  @Input() hoverColor: string = 'var(--chronicle-button-default-hover-color)';
  @Input() width: string = '160px';
  @Input() outlined: boolean = false;
  @Input() outlinePaddingAdjustment: string = '2px';
  @Input() borderRadius: string = '0.76rem';
  @Input() fontFamily?: string;
  @Input() outlinedButtonBackgroundOnHover: string = 'transparent';
  @Input() customBackground: string = "#f0f0f1";
  @Input() customForeground: string = "#1a1a24";
  @Output() onClick = new EventEmitter<void>();

  handleClick() {
    this.onClick.emit();
  }
}