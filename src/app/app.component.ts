import { Component, Input } from '@angular/core';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FancyHeroSectionComponent } from './fancy-hero-section/fancy-hero-section.component';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';
import { EditComponentModalComponent } from './edit-component-modal/edit-component-modal.component';

@Component({
  selector: 'app-custom-component-1',
  template: `
    <div class="custom-component blue" [ngStyle]="{'background-image': imageUrl ? 'url(' + imageUrl + ')' : 'none'}">
      <div *ngIf="!imageUrl" class="text-content">Custom Component 1</div>
    </div>
  `,
  styles: [`
    .custom-component {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      background-size: cover; /* Cover the entire area */
      background-position: center; /* Center the image */
    }
    .blue {
      background-color: #3b82f6; /* Fallback color */
    }
    .text-content {
      /* Add any additional styling for text here */
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
class CustomComponent1 {
  @Input() imageUrl?: string; // Accept imageUrl as input
}

@Component({
  selector: 'app-custom-component-2',
  template: `
    <div class="custom-component green" [ngStyle]="{'background-image': imageUrl ? 'url(' + imageUrl + ')' : 'none'}">
      <div *ngIf="!imageUrl" class="text-content">החיים מוזרים</div>
    </div>
  `,
  styles: [`
    .custom-component {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #161616;
      font-size: 32px;
      background-size: cover; /* Cover the entire area */
      background-position: center; /* Center the image */
    }
    .green {
      background-color: #22c55e; /* Fallback color */
    }
    .text-content {
      /* Add any additional styling for text here */
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
class CustomComponent2 {
  @Input() imageUrl?: string; // Accept imageUrl as input
}

@Component({
  selector: 'app-custom-component-3',
  template: `
    <div class="custom-component purple" [ngStyle]="{'background-image': imageUrl ? 'url(' + imageUrl + ')' : 'none'}">
      <div *ngIf="!imageUrl" class="text-content">Custom Component 3</div>
    </div>
  `,
  styles: [`
    .custom-component {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      background-size: cover; /* Cover the entire area */
      background-position: center; /* Center the image */
    }
    .purple {
      background-color: #a855f7; /* Fallback color */
    }
    .text-content {
      /* Add any additional styling for text here */
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
class CustomComponent3 {
  @Input() imageUrl?: string; // Accept imageUrl as input
}
interface CustomImageData {
  component: any;
  title: string;
  description: string;
  imageUrl?: string; // Add imageUrl property
}

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
  customFontSize?: string;
  framerSize: [number, number];
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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSelectorComponent,
    FancyHeroSectionComponent,
    SettingsModalComponent,
    EditComponentModalComponent
  ],
  template: `
    <app-language-selector *ngIf="showLanguageSelector" 
      (languageSelected)="onLanguageSelected($event)" 
      (selectionComplete)="onSelectionComplete()">
    </app-language-selector>

    <app-fancy-hero-section
      [text]="text"
      (imageClick)="handleImageClick($event)"
      [customImageData]="customImageData"
      [backgroundColor]="settings.backgroundColor"
      [textShadowColor]="settings.textShadowColor"
      [colorTransition]="settings.colorTransition"
      [textColor]="settings.textColor"
      [hoverTextColor]="settings.hoverTextColor"
      [backgroundHighlightEnabled]="settings.backgroundHighlightEnabled"
      [backgroundHighlightColor]="settings.backgroundHighlightColor"
      [customWidth]="settings.customWidth"
      [customHeight]="settings.customHeight"
      [customFontSize]="settings.customFontSize"
      [framerSize]="settings.framerSize"
      [textBottom]="settings.textBottom"
      [titleColor]="settings.titleColor"
      [titleSize]="settings.titleSize"
      [descriptionColor]="settings.descriptionColor"
      [descriptionSize]="settings.descriptionSize"
      [frameOutlineColor]="settings.frameOutlineColor"
      [fontSizeMultiplier]="settings.fontSizeMultiplier"
      [elementTextXShift]="settings.elementTextXShift"
      [elementTextAlign]="settings.elementTextAlign">
    </app-fancy-hero-section>

    <app-settings-modal 
      [langCode]="selectedLanguageCode" 
      (settingsChanged)="handleSettingsChange($event)">
    </app-settings-modal>

    <app-edit-component-modal 
      [isOpen]="isModalOpen" 
      [editedData]="modalData" 
      [langCode]="selectedLanguageCode" 
      (save)="handleSaveChanges($event)">
    </app-edit-component-modal>

    <a class="footer-inscription" 
       [ngStyle]="{'color': '#f1f1f7'}" 
       href="https://github.com/Northstrix/PHA5E-INSPIRED-HERO-SECTION" 
       target="_blank" 
       rel="noopener noreferrer">
        {{ 'GitHub repository' }}
    </a>
  `,
  styles: [
    `
    .footer-inscription {
        position: fixed; /* Use fixed positioning to keep it at the bottom */
        bottom: 20px; /* Adjust as needed */
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        font-size: 16px; /* Adjust font size as needed */
        text-decoration: none; /* Remove underline */
        z-index: 1000; /* Ensure it appears above other content */
    }

    .footer-inscription:hover {
        text-decoration: underline; /* Optional: Add underline on hover */
    }
    
    .main-container {
        position: relative; /* Ensure parent container is relative for absolute positioning */
        min-height: 100vh; /* Ensure it takes full height of the viewport */
        padding-bottom: 40px; /* Add padding to avoid overlap with footer */
    }
    `
  ]
})
export class AppComponent {
  
  private textInscriptions = {
    en: ['STAM AREMA', 'SHEL', 'ZEACHRONOT'],
    he: ['סתם ערימה', 'של', 'זכרונות'],
    ru: ['СТАМ АРЭМА', 'ШЭЛЬ', 'ЗИХРОНОТ']
  };

  showLanguageSelector = true;
  selectedLanguageCode = 'en';

  private _text: string[] = this.textInscriptions['en'];

  get text(): string[] {
    return this._text;
  }

  set text(value: string[]) {
    this._text = value.length > 0 ? value : this.textInscriptions[this.translate.currentLang as keyof typeof this.textInscriptions] || this.textInscriptions['en'];
  }

  customImageData: CustomImageData[] = [
    { component: CustomComponent1, title: "Blue", description: "This is a custom blue component", imageUrl: '' },
    { component: CustomComponent2, title: "Yarok", description: "This is a custom green component", imageUrl: '' },
    { component: CustomComponent3, title: "Purple", description: "This is a custom purple component", imageUrl: '' }
  ];

   // Default settings for FancyHeroSection
   settings: HeroSectionSettings = {
     backgroundColor: '#242434',
     textShadowColor: '#444454',
     colorTransition: '0.3s',
     textColor: '#ffffff',
     hoverTextColor: '#242434',
     backgroundHighlightEnabled: true,
     backgroundHighlightColor: '#4246ce',
     customWidth: undefined,
     customHeight: undefined,
     framerSize: [340, 248],
     textBottom: '-67px',
     titleColor: undefined,
     titleSize: '48px',
     descriptionColor: undefined,
     descriptionSize: '18px',
     frameOutlineColor: '#a1a1b2',
     fontSizeMultiplier: 124,
     elementTextXShift: '50%',
     elementTextAlign: 'left'
   };

   isModalOpen = false; // Control modal visibility
   modalData = { title: '', description:'', imageUrl:'' }; // Data for editing
   selectedIndex = -1; // Track which component is selected for editing

   handleSettingsChange(newSettings : HeroSectionSettings): void { // Explicitly typing newSettings
     Object.assign(this.settings, newSettings);
     console.log('Updated Settings:', this.settings); // Log updated settings for debugging
   }

   handleImageClick(index : number): void {
     console.log('Clicked image index:', index);
     this.selectedIndex = index; // Set selected index
     const selectedData = this.customImageData[index];
     
     // Pre-fill modal data
     this.modalData = {
       title : selectedData.title,
       description : selectedData.description,
       imageUrl : selectedData.imageUrl || '', // Initialize with existing URL if available
     };
     
     this.isModalOpen = true; // Open modal
   }

   handleSaveChanges(updatedData : { title:string; description:string; imageUrl?:string }): void {
    if (this.selectedIndex >= 0) {
      this.customImageData[this.selectedIndex].title = updatedData.title;
      this.customImageData[this.selectedIndex].description = updatedData.description;
 
      // Set the uploaded image URL to the corresponding component
      if (updatedData.imageUrl) {
        console.log('New Image URL:', updatedData.imageUrl);
        this.customImageData[this.selectedIndex].imageUrl = updatedData.imageUrl; // Update with new image URL
      }
      
      console.log('Updated Data:', this.customImageData[this.selectedIndex]);
    }
    
    this.isModalOpen = false; // Close modal after saving changes
  } 

   constructor(private translate : TranslateService) {
     translate.setDefaultLang('en');
     translate.use('en');
   }

   onLanguageSelected(langCode:string) {
     console.log('Selected language:', langCode);
     this.selectedLanguageCode = langCode; 
     
     if (this._text === this.textInscriptions['en'] || 
         this._text === this.textInscriptions['he'] || 
         this._text === this.textInscriptions['ru']) {
       this.text = this.textInscriptions[langCode as keyof typeof this.textInscriptions] || this.textInscriptions['en'];
     }
     
     if (langCode === 'he') {
       this.settings.elementTextXShift = '0%'; // Accessing through settings
       this.settings.elementTextAlign = 'right'; // Accessing through settings
     } else {
       this.settings.elementTextXShift = '50%'; // Accessing through settings
       this.settings.elementTextAlign = 'left'; // Accessing through settings
     }
   }

   onSelectionComplete() {
       this.showLanguageSelector = false;
   }
}