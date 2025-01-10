import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-position-aware-button',
  templateUrl: './position-aware-button.component.html',
  styleUrls: ['./position-aware-button.component.css'],
  standalone: true,
  imports: [CommonModule] // Include CommonModule here
})
export class PositionAwareButtonComponent implements OnInit {
  @Input() buttonText: string = 'Click Me';
  @Input() buttonWidth: string = 'auto';
  @Input() borderRadius: string = '2em';
  @Input() buttonColor: string = '#ff4500';
  
  @Output() buttonClick = new EventEmitter<void>(); // Define an output for button click

  @ViewChild('button') buttonRef!: ElementRef<HTMLButtonElement>;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    const button = this.buttonRef.nativeElement;

    const updatePosition = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      this.renderer.setStyle(button, '--x', `${e.clientX - rect.left}px`);
      this.renderer.setStyle(button, '--y', `${e.clientY - rect.top}px`);
    };

    this.renderer.listen(button, 'mousemove', updatePosition);
    this.renderer.listen(button, 'mouseenter', updatePosition);
    this.renderer.listen(button, 'mouseleave', updatePosition);
  }

  onClick(): void {
    this.buttonClick.emit(); // Emit the click event
  }
}
