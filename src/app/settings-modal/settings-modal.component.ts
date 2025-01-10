import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface HeroSectionSettings {
  backgroundColor: string;
  textShadowColor: string;
  colorTransition: string;
  textColor: string;
  hoverTextColor: string;
  backgroundHighlightEnabled: boolean;
  backgroundHighlightColor: string;
  customWidth?: string;
  customHeight?: string;
  framerSize: [number, number]; // Ensure this is a tuple of two numbers
  textBottom: string;
  titleColor?: string;
  titleSize: string;
  descriptionColor?: string;
  descriptionSize: string;
  frameOutlineColor: string;
  fontSizeMultiplier: number;
  elementTextXShift: string;
  elementTextAlign: 'left' | 'right' | 'center';
}

interface Localization {
  title: string;
  backgroundColor: string;
  textShadowColor: string;
  colorTransition: string;
  textColor: string;
  hoverTextColor: string;
  backgroundHighlightEnabled: string;
  backgroundHighlightColor: string;
  customWidth: string;
  customHeight: string;
  frameSizeWidth: string;
  frameSizeHeight: string;
  textBottomPosition: string;
  titleColor: string;
  titleSize: string;
  descriptionColor: string;
  descriptionSize: string;
  frameOutlineColor: string;
  fontSizeMultiplier: string;
  elementTextXShift: string;
  elementTextAlign: string;
  left: string;
  center: string;
  right: string;
  language: string;
}

// Define a type for the localizations object
interface Localizations {
    [key: string]: Localization; // Allow any key of type 'string' to access a Localization
}

@Component({
  selector: 'app-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="modal" [ngClass]="{'active': isOpen}" (click)="close($event)">
    <div class="modal-content" (click)="$event.stopPropagation()" [ngClass]="{'rtl': localization.language === 'he'}">
      <h2>{{ localization.title }}</h2>
      <div class="settings-container">
        <label>{{ localization.backgroundColor }}:
          <input type="color" [(ngModel)]="backgroundColor" (ngModelChange)="emitSettings()" />
        </label>
        <label>{{ localization.textShadowColor }}:
          <input type="color" [(ngModel)]="textShadowColor" (ngModelChange)="emitSettings()" />
        </label>
        <label>{{ localization.colorTransition }}:
          <input type="text" [(ngModel)]="colorTransition" (ngModelChange)="emitSettings()" placeholder="e.g. 0.3s" />
        </label>
        <label>{{ localization.textColor }}:
          <input type="color" [(ngModel)]="textColor" (ngModelChange)="emitSettings()" />
        </label>
        <label>{{ localization.hoverTextColor }}:
          <input type="color" [(ngModel)]="hoverTextColor" (ngModelChange)="emitSettings()" />
        </label>
        <label>{{ localization.customWidth }}:
          <input type="text" [(ngModel)]="customWidth" (ngModelChange)="emitSettings()" placeholder="e.g. 100%" />
        </label>
        <label>{{ localization.customHeight }}:
          <input type="text" [(ngModel)]="customHeight" (ngModelChange)="emitSettings()" placeholder="e.g. 400px" />
        </label>
        <label>{{ localization.frameSizeWidth }}:
          <input type="number" [(ngModel)]="framerSize[0]" (ngModelChange)="emitSettings()" placeholder="Width (px)" />
        </label>
        <label>{{ localization.frameSizeHeight }}:
          <input type="number" [(ngModel)]="framerSize[1]" (ngModelChange)="emitSettings()" placeholder="Height (px)" />
        </label>
        <label>{{ localization.textBottomPosition }}:
          <input type="text" [(ngModel)]="textBottom" (ngModelChange)="emitSettings()" placeholder="e.g. -67px"/>
        </label>
        <label>{{ localization.titleColor }}:
          <input type="color" [(ngModel)]="titleColor" (ngModelChange)="emitSettings()" />
        </label>
        <label>{{ localization.titleSize }}:
          <input type="text" [(ngModel)]="titleSize" (ngModelChange)="emitSettings()" placeholder="e.g. 48px"/>
        </label>
        <label>{{ localization.descriptionColor }}:
          <input type="color" [(ngModel)]="descriptionColor" (ngModelChange)="emitSettings()" />
        </label>
        <label>{{ localization.descriptionSize }}:
          <input type="text" [(ngModel)]="descriptionSize" (ngModelChange)="emitSettings()" placeholder="e.g. 18px"/>
        </label>
        <label>{{ localization.frameOutlineColor }}:
          <input type="color" [(ngModel)]="frameOutlineColor" (ngModelChange)="emitSettings()" />
        </label>
        <label>{{ localization.fontSizeMultiplier }}:
          <input type="number" [(ngModel)]="fontSizeMultiplier" (ngModelChange)="emitSettings()" placeholder="e.g. 124"/>
        </label>
        <label>{{ localization.elementTextXShift }}:
            <input type="text" [(ngModel)]="elementTextXShift" (ngModelChange)="emitSettings()" placeholder="% or px"/>
        </label>
        <label>{{ localization.elementTextAlign }}:
            <select [(ngModel)]="elementTextAlign" (ngModelChange)="emitSettings()">
                <option value="left">{{ localization.left }}</option>
                <option value="center">{{ localization.center }}</option>
                <option value="right">{{ localization.right }}</option>
            </select>
        </label>
      </div> <!-- End of settings-container -->
    </div> <!-- End of modal-content -->
  </div> <!-- End of modal -->
  <!-- Settings Icon -->
  <div class="settings-icon" (click)="toggleModal()"> ⚙️ <!-- Settings Icon --> </div>
`
,

styles: [`
  :root {
      --color-4: #242424; /* Dark background color */
      --modal-background: #1c1c1c; /* Darker modal background */
      --input-background: #333; /* Input background color */
      --border-color: #444; /* Input border color */
  }
  html, body {
      height: 100%;
      margin: 0;
      padding: 0;
      font-family: 'Roboto Mono', monospace;
  }
  body {
      background-attachment: fixed;
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  .modal {
      display: none;
      position: fixed;
      top: 16px;
      right: 16px;
      width: 392px;
      height: 80vh;
      border-radius: 1rem;
      background: #1c1c1c;
      color: #f5f5f5;
      z-index: 1000;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
      overflow-y: auto; /* Enable scrolling */
  }
  .modal.active {
      display: flex;
      opacity: 1;
  }
  .modal-content {
      background: var(--modal-background); /* Charcoal black background */
      padding: 1.5rem;
      border-radius: 1rem;
      max-height: calc(80vh - 3rem); /* Set max height */
      overflow-y: auto; /* Enable scrolling within modal */
      border: 1px solid var(--border-color); /* Outline for modal content */
  }
  h2 {
      color: var(--color-3); /* Light header color */
  }
  .settings-container {
      display: flex;
      flex-direction: column; /* Stack labels vertically */
  }
  label {
      display: flex; /* Flexbox for alignment */
      align-items: center; /* Center items vertically */
      margin-bottom: 10px; /* Space between labels */
      color: var(--color-3); /* Light text color for labels */
  }
  input {
      margin-left:auto; /* Space between label and input */
      width: 100%; /* Make color input take full width */
      height: 30px; /* Set height for color input */
      border-radius: 8px; /* Rounded corners for color inputs */
      border: none; /* Remove default border */
      background-color: var(--input-background);
  }
  .settings-icon {
      position: absolute;
      top: 24px;
      right: 24px; 
      cursor: pointer; 
      font-size: 24px; 
      z-index: 1001; 
      color: var(--color-3); /* Icon color */ 
  }
  input[type='text'], input[type='number'], select {
       margin-left:auto; 
       width:auto; 
       border-radius: 8px;
       border :1px solid var(--border-color); 
       background-color :#333 ; 
       padding :0 10px ; 
       color :var(--color-3);
   }
   button {
       margin-top :16px ; 
       padding :16px ; 
       background-color :#4b5563 ; 
       color :white ; 
       border-radius :5px ; 
       cursor :pointer ; 
       border:none ; 
       outline:none ;
   }
   button:hover {
       background-color :#6b3880 ;
   }
   ::-webkit-scrollbar {
       width :8px ;
       background-color:#252525 ;
   }
   ::-webkit-scrollbar-thumb {
       background-color:#4b5563 ;
   }
   ::-webkit-scrollbar-thumb:hover {
       background-color :#6b3880 ;
   }
   .rtl {
       direction: rtl; /* Set direction to RTL for Hebrew */
       text-align:right; /* Align text to the right for Hebrew language */
   }
`]
})
export class SettingsModalComponent {

  isOpen = false;

  // Default settings
  backgroundColor = '#242434';
  textShadowColor = '#444454';
  colorTransition = '0.3s';
  textColor = '#ffffff';
  hoverTextColor = '#242434';
  backgroundHighlightEnabled = true;
  backgroundHighlightColor = '#4246ce';
  customWidth?: string = '100%'; // Prefill with default values
  customHeight?: string = ''; // Prefill with default values
  customFontSize?: string = '16px'; // Prefill with default values
  framerSize:[number, number] = [340,248]; // Prefill with default values
  textBottom = '-67px'; // Prefill with default values
  titleColor?: string = '#ffffff'; // Prefill with default values
  titleSize = '48px'; // Prefill with default values
  descriptionColor?: string = '#ffffff'; // Prefill with default values
  descriptionSize = '18px'; // Prefill with default values
  frameOutlineColor = '#a1a1b2'; // Prefill with default values
  fontSizeMultiplier = 124; // Prefill with default values
  elementTextXShift = '50%'; // Prefill with default values
  elementTextAlign:'left' | 'right' | 'center' = 'left'; // Prefill with default values

  @Input() langCode!: string; // Input property for language code
  @Output() settingsChanged = new EventEmitter<HeroSectionSettings>();

  localization!: Localization; // Define the localization variable

  ngOnChanges() {
      this.setLocalization();
      this.emitSettings(); // Emit initial settings when language changes
  }

  setLocalization() {
      const localizations: Localizations = {
          en: {
              title: 'Settings',
              backgroundColor: 'Background Color',
              textShadowColor: 'Text Shadow Color',
              colorTransition: 'Color Transition',
              textColor: 'Text Color',
              hoverTextColor: 'Hover Text Color',
              backgroundHighlightEnabled: 'Background Highlight Enabled',
              backgroundHighlightColor: 'Background Highlight Color',
              customWidth: 'Custom Width',
              customHeight: 'Custom Height',
              frameSizeWidth: 'Frame Size (Width)',
              frameSizeHeight: 'Frame Size (Height)',
              textBottomPosition: 'Text Bottom Position',
              titleColor: 'Title Color',
              titleSize: 'Title Size',
              descriptionColor: 'Description Color', 
              descriptionSize: 'Description Size', 
              frameOutlineColor: 'Frame Outline Color', 
              fontSizeMultiplier: 'Font Size Multiplier',
              elementTextXShift : "Element Text X Shift",
              elementTextAlign : "Element Text Align",
              left: 'Left',
              center: 'Center',
              right: 'Right',
              language: 'en'
          },
          
          he: {
              title: 'הגדרות', 
              backgroundColor: 'צבע רקע', 
              textShadowColor: 'צבע צל טקסט', 
              colorTransition: 'מעבר צבעים', 
              textColor: 'צבע טקסט', 
              hoverTextColor: 'צבע טקסט בהעברה', 
              backgroundHighlightEnabled: 'הדגשת רקע מופעלת', 
              backgroundHighlightColor: 'צבע הדגשת רקע', 
              customWidth: 'רוחב מותאם', 
              customHeight: 'גובה מותאם',  
              frameSizeWidth: 'גודל מסגרת (רוחב)', 
              frameSizeHeight: 'גודל מסגרת (גובה)', 
              textBottomPosition: 'מיקום טקסט בתחתית', 
              titleColor: 'צבע כותרת', 
              titleSize: 'גודל כותרת', 
              descriptionColor: 'צבע תיאור', 
              descriptionSize: 'גודל תיאור', 
              frameOutlineColor: 'צבע קו מתאר של המסגרת', 
              fontSizeMultiplier: 'כפל גודל גופן',
              elementTextXShift : "היסט X של טקסט האלמנט",
              elementTextAlign : "יישור טקסט האלמנט",
              left: "שמאל",
              center: "מרכז",
              right: "ימין",
              language: 'he'
          },
          
          ru:{
              title:'Настройки',
              backgroundColor:'Цвет фона',
              textShadowColor:'Цвет тени текста',
              colorTransition:'Переход цвета',
              textColor:'Цвет текста',
              hoverTextColor:'Цвет текста при наведении',
              backgroundHighlightEnabled:'Подсветка фона включена',
              backgroundHighlightColor:'Цвет подсветки фона',
              customWidth:'Кастомная ширина',
              customHeight:'Кастомная высота',
              frameSizeWidth:'Размер рамки (ширина)',
              frameSizeHeight:'Размер рамки (высота)',
              textBottomPosition:'Положение текста снизу',
              titleColor:'Цвет заголовка',
              titleSize:'Размер заголовка',
              descriptionColor:'Цвет описания', 
              descriptionSize:'Размер описания', 
              frameOutlineColor:'Цвет контура рамки', 
              fontSizeMultiplier:"Множитель размера шрифта",
              elementTextXShift : "Сдвиг текста элемента по X",
              elementTextAlign : "Выравнивание текста элемента",
              left: "Слева",
              center: "По центру",
              right: "Справа",
             language: 'ru'
          }      
      };
      
      this.localization = localizations[this.langCode as keyof Localizations] || localizations['en']; // Use keyof Localizations to avoid index error
  }

 emitSettings() {
     this.settingsChanged.emit({
         backgroundColor:this.backgroundColor,
         textShadowColor:this.textShadowColor,
         colorTransition:this.colorTransition,
         textColor:this.textColor,
         hoverTextColor:this.hoverTextColor,
         backgroundHighlightEnabled:this.backgroundHighlightEnabled,
         backgroundHighlightColor:this.backgroundHighlightColor,
         customWidth:this.customWidth,
         customHeight:this.customHeight,
         framerSize:this.framerSize,
         textBottom:this.textBottom,
         titleColor:this.titleColor,
         titleSize:this.titleSize,
         descriptionColor:this.descriptionColor,
         descriptionSize:this.descriptionSize,
         frameOutlineColor:this.frameOutlineColor,
         fontSizeMultiplier:this.fontSizeMultiplier,
         elementTextXShift:this.elementTextXShift,
         elementTextAlign:this.elementTextAlign
     });
 }

 toggleModal() {
     this.isOpen = !this.isOpen; // Toggle modal open/close state
 }

 close(event?: MouseEvent) {
     if (event) {
         const target = event.target as HTMLElement;
         if (target.classList.contains('modal')) { // Close only if clicking outside modal content
             this.isOpen = false;
         }
     } else {
         this.isOpen = false; // Close when called directly
     }
 }
}