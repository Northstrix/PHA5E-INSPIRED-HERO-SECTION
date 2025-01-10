import { Component, Input, Output, EventEmitter, OnInit, AfterViewInit, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

interface CustomImageData {
  component: any;
  title: string;
  description: string;
}

@Component({
  selector: 'app-image-grid',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="circular-layout" [ngStyle]="getCircularLayoutStyle()">
      <div *ngFor="let item of customImageData; let index = index"
           class="circular-item"
           [ngStyle]="getCircularItemStyle(index)"
           #containerRef>
        <div class="relative overflow-hidden cursor-pointer"
             [ngStyle]="getImageComponentStyle()"
             (mouseenter)="setHoveredImage(index)"
             (mouseleave)="setHoveredImage(null)"
             (click)="handleImageClick(index)">
          <ng-container *ngIf="hoveredImage === null || hoveredImage === index; else hoveredState">
            <div class="relative bg-transparent flex items-center justify-center"
                 [ngStyle]="getFramerComponentStyle()">
              <ng-container *ngComponentOutlet="item.component"></ng-container>
            </div>
          </ng-container>
          <ng-template #hoveredState>
            <div class="absolute inset-0 flex justify-center items-center">
              <div class="relative" [ngStyle]="getFramerComponentStyle()">
                <ng-container *ngIf="hoveredImage !== null">
                  <div class="absolute" [ngStyle]="getDiagonalLineStyle('top-left')"></div>
                  
                  <!-- Wrapper for the border -->
                  <div class="border-wrapper" [ngStyle]="{ border: '1px solid ' + frameOutlineColor }">
                    <!-- Empty container to maintain space but hide content -->
                    <div style="width: 100%; height: 100%; background-color: transparent;"></div>
                  </div>
                </ng-container>
              </div>
            </div>
          </ng-template>
        </div>
        <div class="absolute" [ngStyle]="getTextComponentStyle(index)">
          <h1 [ngStyle]="getTitleStyle()" [dir]="getTextDirection(item.title)">{{ item.title }}</h1>
          <p [ngStyle]="getDescriptionStyle()" [dir]="getTextDirection(item.description)">{{ item.description }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .circular-layout {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      width: 600px;
      height: 600px;
    }
    .circular-item {
      position: absolute;
      transform: translate(-50%, -50%);
      transition: z-index 0.3s ease;
    }
    .circular-item:nth-child(1) { top: 30%; left: 2%; }
    .circular-item:nth-child(2) { top: 12%; left: 100%; }
    .circular-item:nth-child(3) { top: 80%; left: 44%; }
    .border-wrapper {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative; /* Ensure it positions correctly within the parent */
    }
  `]
})
export class ImageGridComponent implements OnInit, AfterViewInit {
  @Input() hoveredImage: number | null = null;
  @Input() customImageData: CustomImageData[] = [];
  @Input() framerSize: [number, number] = [340, 248];
  @Input() textBottom: string = '-95px';
  @Input() titleColor?: string;
  @Input() titleSize: string = '48px';
  @Input() descriptionColor?: string;
  @Input() descriptionSize: string = '14px';
  @Input() textColor: string = '#ffffff';
  @Input() frameOutlineColor: string = '#a1a1b2';
  @Input() elementTextXShift: string = '50%';
  @Input() elementTextAlign: 'left' | 'right' | 'center' = 'left';
  @Input() colorTransition: string = '0.3s';

  @Output() hoveredImageChange = new EventEmitter<number | null>();
  @Output() mousePositionChange = new EventEmitter<{ x: number; y: number }>();
  @Output() imageClick = new EventEmitter<number>();
  @Input() componentDescriptionYShiftAdjustment: number = -15;


  @ViewChildren('containerRef') containerRefs!: QueryList<ElementRef>;

  private targetPositions: { x: number; y: number }[] = [];
  private selectedImage: number | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.targetPositions = this.customImageData.map(() => ({ x: 0, y: 0 }));
  }

  ngAfterViewInit() {
    this.setupEventListeners();
  }

  public getTextDirection(text: string): 'ltr' | 'rtl' {
    const rtlRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
    return rtlRegex.test(text) ? 'rtl' : 'ltr';
  }  

  private setupEventListeners() {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  private handleMouseMove(e: MouseEvent) {
    this.mousePositionChange.emit({ x: e.clientX, y: e.clientY });
    this.checkImageHover(e.clientX, e.clientY);
  }

  private checkImageHover(x: number, y: number) {
    let newHoveredIndex: number | null = null;
    this.containerRefs.forEach((ref, index) => {
      const rect = ref.nativeElement.getBoundingClientRect();
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        newHoveredIndex = index;
      }
    });
    this.setHoveredImage(newHoveredIndex);
    this.updateTargetPositions(newHoveredIndex, x, y);
  }

  private updateTargetPositions(hoveredIndex: number | null, cursorX: number, cursorY: number) {
    this.targetPositions = this.targetPositions.map((pos, index) => {
      const containerRef = this.containerRefs.get(index);
      if (containerRef) {
        // Apply a transparent border to all items by default
        containerRef.nativeElement.style.border = '1px solid transparent'; // Invisible by default
  
        if (index === hoveredIndex) {
          const rect = containerRef.nativeElement.getBoundingClientRect();
          const centerX = (rect.left + rect.right) / 2;
          const centerY = (rect.top + rect.bottom) / 2;
          const maxMoveX = Math.min(window.innerWidth / 4, 100);
          const maxMoveY = Math.min(window.innerHeight / 4, 100);
          let dx = (cursorX - centerX) * 0.5;
          let dy = (cursorY - centerY) * 0.5;
  
          // Limit movement
          if (Math.abs(dx) > maxMoveX) {
            dx = maxMoveX * Math.sign(dx) * (1 - Math.exp(-Math.abs(dx - maxMoveX) / 50));
          }
          if (Math.abs(dy) > maxMoveY) {
            dy = maxMoveY * Math.sign(dy) * (1 - Math.exp(-Math.abs(dy - maxMoveY) / 50));
          }
  
          return { x: dx, y: dy };
        }
      }
      return { x: 0, y: 0 };
    });
  
    this.animateImages();
  }
  

  private animateImages() {
    this.containerRefs.forEach((ref, index) => {
      gsap.to(ref.nativeElement, {
        x: this.targetPositions[index].x,
        y: this.targetPositions[index].y,
        duration: 2,
        ease: "power2.out",
      });
    });
  }

  setHoveredImage(index: number | null) {
    this.hoveredImage = index;
    this.hoveredImageChange.emit(index);
    this.updateZIndex();
  }

  handleImageClick(index: number) {
    this.selectedImage = index;
    this.imageClick.emit(index);
  }

  private updateZIndex() {
    this.containerRefs.forEach((ref, index) => {
      const zIndex = this.hoveredImage === index ? 40 : 1;
      ref.nativeElement.style.zIndex = zIndex;
    });
  }

  getCircularLayoutStyle() {
    return {
      position: 'relative',
      zIndex: 1
    };
  }

  getCircularItemStyle(index: number) {
    const [width, height] = this.framerSize;
    return {
      width: `${width}px`,
      height: `${height}px`,
      zIndex: this.hoveredImage === index ? '40' : '1',
    };
  }

  getImageComponentStyle() {
    const [width, height] = this.framerSize;
    return {
      width: `${width}px`,
      height: `${height}px`
    };
  }

  getFramerComponentStyle() {
    const [width, height] = this.framerSize;
    return {
      width: `${width}px`,
      height: `${height}px`
    };
  }
  
  getDiagonalLineStyle(position: 'top-left' | 'top-right') {
    const [width, height] = this.framerSize;
    const angle = Math.atan(height / width) * (180 / Math.PI);
    
    // Calculate the diagonal length
    const diagonalLength = Math.sqrt(width ** 2 + height ** 2);
  
    return {
      width: `${diagonalLength}px`,
      height: '1px',
      backgroundColor: this.frameOutlineColor,
      top: '0',
      [position === 'top-left' ? 'left' : 'right']: '0',
      transform: `rotate(${position === 'top-left' ? angle : -angle}deg)`, // Use -angle for top-right
      transformOrigin: position === 'top-left' ? 'top left' : 'top right',
      zIndex: '40'
    };
  }
  
  getTextComponentStyle(index: number) {
    const [width] = this.framerSize;
    return {
      zIndex: 41,
      width: `${width}px`,
      left: '100%',
      opacity: this.hoveredImage === index ? 1 : 0,
      transition: `opacity ${this.colorTransition} ease`,
      transform: `translateX(${this.elementTextXShift}) translateY(${this.textBottom})`,
      textAlign: this.elementTextAlign,
      color: this.textColor,
    };
  }
  
  getTitleStyle() {
    return {
      fontSize: this.titleSize,
      fontWeight: 'bold',
      color: this.titleColor || this.textColor
    };
  }

  getDescriptionStyle() {
    return {
      fontSize: this.descriptionSize,
      color: this.descriptionColor || this.textColor,
      transform: `translateY(${this.componentDescriptionYShiftAdjustment}px)`,
    };
  }  
}
