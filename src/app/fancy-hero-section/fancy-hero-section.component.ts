import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, SimpleChanges, EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ImageGridComponent } from '../image-grid/image-grid.component';

interface CustomImageData {
  component: any;
  title: string;
  description: string;
}

@Component({
  selector: 'app-fancy-hero-section',
  standalone: true,
  imports: [CommonModule, TranslateModule, ImageGridComponent],
  template: `
    <div class="relative overflow-hidden flex flex-col justify-center items-center" [ngStyle]="containerStyle">
      <div class="absolute inset-0 flex justify-center items-center" [style.zIndex]="getImageGridZIndex()">
        <app-image-grid
          [colorTransition]="colorTransition"
          [hoveredImage]="hoveredImage"
          [customImageData]="customImageData"
          [framerSize]="framerSize"
          [textBottom]="textBottom"
          [titleColor]="titleColor"
          [titleSize]="titleSize"
          [descriptionColor]="descriptionColor"
          [descriptionSize]="descriptionSize"
          [textColor]="textColor"
          [frameOutlineColor]="frameOutlineColor"
          [elementTextXShift]="elementTextXShift"
          [elementTextAlign]="elementTextAlign"
          (hoveredImageChange)="onHoveredImageChange($event)"
          (mousePositionChange)="onMousePositionChange($event)"
          (imageClick)="onImageClick($event)"
          [componentDescriptionYShiftAdjustment]="componentDescriptionYShiftAdjustment">
        </app-image-grid>
      </div>
      <div #textContainer class="container flex flex-col justify-center items-center relative z-20 py-10">
        <div class="text-wrapper">
          <div *ngFor="let line of text; let i = index" class="text-line" [ngStyle]="{'text-align': 'center'}">
            <h1 class="text relative inline-block cursor-pointer leading-[1.2] m-0 font-bold"
                [ngClass]="{'text-emerged': !loading}"
                [ngStyle]="getTextStyle(i)"
                (mouseenter)="onLineHover(i)"
                (mouseleave)="onLineLeave()">
              <div class="split-parent">
                <div class="split-child" [ngStyle]="{'transition-delay': i * 0.2 + 's'}">
                  <span class="relative z-10 px-1 py-0.5">{{line}}</span>
                </div>
              </div>
              <span *ngIf="hoveredImage === null && backgroundHighlightEnabled"
                    class="text-effect absolute inset-0 z-0"
                    [ngStyle]="getBackgroundHighlightStyle(i)"></span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@700&display=swap");
    :host {
      display: block;
      width: 100%;
      height: 100vh;
    }
    .text-wrapper {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      z-index: 30;
    }
    .text-line {
      width: 100%;
      text-align: center;
    }
    .text {
      font-family: "Montserrat", sans-serif;
      font-weight: 700;
      margin-bottom: 0.5rem;
      white-space: nowrap;
    }
    .split-parent {
      overflow: hidden;
      position: relative;
      z-index: 10;
    }
    .split-child {
      display: inline-block;
      transform: translateY(100%);
      opacity: 1;
      transition: transform 0.9s ease, opacity;
    }
    .text-emerged .split-child {
      transform: translateY(0);
      opacity: 1;
    }
    .text-effect {
      transition: all cubic-bezier(.1,.5,.5,1) 0.4s;
    }
    .cursor {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.2);
      position: fixed;
      pointer-events: none;
      z-index: 9999;
    }
  `]
})
export class FancyHeroSectionComponent implements OnInit, AfterViewInit {
  @ViewChild('textContainer') textContainer!: ElementRef;
  
  @Input() text: string[] = ['STAM AREMA', 'SHEL', 'ZEACHRONOT'];
  @Input() customImageData: CustomImageData[] = [];
  @Input() backgroundColor: string = '#242434';
  @Input() textShadowColor: string = '#444454';
  @Input() colorTransition: string = '0.3s';
  @Input() textColor: string = '#ffffff';
  @Input() hoverTextColor: string = '#242434';
  @Input() backgroundHighlightEnabled: boolean = true;
  @Input() backgroundHighlightColor: string = '#4246ce';
  @Input() customWidth?: string;
  @Input() customHeight?: string;
  @Input() customFontSize?: string;
  @Input() framerSize: [number, number] = [340, 248];
  @Input() textBottom: string = '-95px';
  @Input() titleColor?: string;
  @Input() titleSize: string = '48px';
  @Input() descriptionColor?: string;
  @Input() descriptionSize: string = '14px';
  @Input() frameOutlineColor: string = '#a1a1b2';
  @Input() fontSizeMultiplier: number = 124;
  @Input() elementTextXShift: string = '50%';
  @Input() elementTextAlign: 'left' | 'right' | 'center' = 'left';
  @Input() componentDescriptionYShiftAdjustment: number = -15;
  @Output() imageClick = new EventEmitter<number>();

  hoveredImage: number | null = null;
  hoveredLine: number | null = null;

  fontSize: string = '7.9vw';
  mousePosition = { x: 0, y: 0 };
  loading = true;

  constructor(private translate: TranslateService, private el: ElementRef) {}

  ngOnInit() {
    setTimeout(() => this.loading = false, 24);
    this.adjustFontSize();
  }

  ngAfterViewInit() {
      this.setupEventListeners();
  }

  ngOnChanges(changes: SimpleChanges) {
      if (changes['fontSizeMultiplier']) {
          this.adjustFontSize();
      }
  }

  setupEventListeners() {
    window.addEventListener('resize', this.adjustFontSize.bind(this));
  }

  getImageGridZIndex(): string {
    return this.hoveredImage !== null ? '40' : '1';
  }

  onHoveredImageChange(index: number | null) {
    this.hoveredImage = index;
    this.el.nativeElement.querySelector('.absolute.inset-0').style.zIndex = this.getImageGridZIndex();
  }

  onMousePositionChange(position: { x: number, y: number }) {
    this.mousePosition = position;
  }

  onImageClick(index: number) {
    this.imageClick.emit(index);
  }

  adjustFontSize() {
    if (this.customFontSize) return;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const smallestDimension = Math.min(windowWidth, windowHeight);
    const newFontSize = Math.max(19, smallestDimension * (this.fontSizeMultiplier / 1080));
    this.fontSize = `${newFontSize}px`;
  }  

  get containerStyle(): any {
    return {
      backgroundColor: this.backgroundColor,
      width: this.customWidth || '100%',
      height: this.customHeight || '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    };
  }

  getTextStyle(index: number): any {
    const textShadow = `-1px -1px 0 ${this.textShadowColor}, 1px -1px 0 ${this.textShadowColor}, -1px 1px 0 ${this.textShadowColor}, 1px 1px 0 ${this.textShadowColor}`;
    return {
      fontSize: this.fontSize,
      color: this.hoveredImage !== null ? this.hoverTextColor : this.textColor,
      letterSpacing: '-0.01em',
      transition: `color ${this.colorTransition} ease`,
      position: 'relative',
      overflow: 'hidden',
      textShadow: this.hoveredImage !== null ? textShadow : 'none',
      lineHeight: '1.2',
      marginBottom: '0.5rem',
    };
  }

  getBackgroundHighlightStyle(index: number): any {
    return {
      backgroundColor: this.backgroundHighlightColor,
      clipPath: this.hoveredLine === index ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' : 'polygon(0 50%, 100% 50%, 100% 50%, 0 50%)',
      transformOrigin: 'center',
      transition: 'all cubic-bezier(.1,.5,.5,1) 0.4s',
      left: '-4px',
      right: '-4px',
      top: '-4px',
      bottom: '-4px'
    };
  }

  animateTextLines() {
    const lines = Array.from(this.el.nativeElement.querySelectorAll('.text-line h1')) as HTMLElement[];
    
    lines.forEach((line, index) => {
        line.style.transform = 'translateY(50%)'; // Start from a position above the fake bottom
        line.style.opacity = '0'; // Start invisible

        setTimeout(() => {
            line.style.transition = `transform .9s ease, opacity .9s ease`;
            line.style.transform = 'translateY(0)'; // Move into view
            line.style.opacity = '1'; // Fade in
        }, index * 200); // Stagger the animation by index
    });
}

  onLineHover(index: number) {
    if (this.hoveredImage === null) {
      this.hoveredLine = index;
    }
  }

  onLineLeave() {
    this.hoveredLine = null;
  }
}