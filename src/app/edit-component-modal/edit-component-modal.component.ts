import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChronicleButtonComponent } from '../chronicle-button/chronicle-button.component';

interface Localization {
  formTitle: string;
  title: string;
  description: string;
  saveChanges: string;
}

@Component({
  selector: 'app-edit-component-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ChronicleButtonComponent],
  template: `
    <div class="modal-overlay" *ngIf="isOpen">
      <div class="modal-content">
        <h2>{{ localization.formTitle }}</h2>
        
        <div class="form-group">
          <label for="title" [ngStyle]="{'text-align': langCode === 'he' ? 'right' : 'left'}">{{ localization.title }}</label>
          <input id="title" [(ngModel)]="editedData.title" />
        </div>

        <div class="form-group">
          <label for="description" [ngStyle]="{'text-align': langCode === 'he' ? 'right' : 'left'}">{{ localization.description }}</label>
          <input id="description" [(ngModel)]="editedData.description" />
        </div>

        <div class="button-container">
          <app-chronicle-button
            [text]="localization.saveChanges"
            (onClick)="saveChanges()"
            [width]="'100%'"
          ></app-chronicle-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }
    
    .modal-content {
      background-color: #1c1c1c;
      padding: 20px;
      border-radius: 12px; /* Increased rounding */
      max-width: 400px;
      width: 100%;
      color: #f7f7ff;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }
    
    h2 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 24px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column; /* Stack label and input vertically */
      margin-bottom: 15px; /* Space between fields */
    }

    label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      padding: 12px; /* Increased height */
      border-radius: 8px; /* Increased rounding */
      border: none;
      background-color: #2a2a2a;
      color: #f7f7ff;
    }
    .button-container {
       display: flex; 
       flex-direction: column; /* Stack buttons vertically */
       width: 100%; /* Full width */
       gap: 10px; /* Space between buttons */
       margin-top: 20px; /* Space above buttons */
     }

     app-chronicle-button {
       width: 100%; /* Set button to take full width of the container */
     }
   `]
})
export class EditComponentModalComponent implements OnChanges {
  
  @Input() isOpen = false; // Control modal visibility
  @Input() editedData = { title: '', description:'', imageUrl:'' }; // Include imageUrl
  
  @Input() langCode!: string; // Input property for language code

  @Output() save = new EventEmitter<{ title:string; description:string }>(); // Emit imageUrl
  
  localization!: Localization; // Define the localization variable

  ngOnChanges() {
    this.setLocalization();
    this.editedData.imageUrl = ''; // Reset image URL when modal opens
  }

   setLocalization() {
     const localizations = {
       en:{
         formTitle:'Edit Component',
         title:'Title',
         description:'Description',
         imageUrl:'Enter Absolute Path to Image',
         saveChanges:'Save Changes'
       },
       
       he:{
         formTitle:'ערוך רכיב',
         title:'כותרת',
         description:'תיאור',
         imageUrl:'הכנס נתיב מוחלט לתמונה',
         saveChanges:'שמור שינויים'
       },
       
       ru:{
         formTitle:'Редактировать компонент',
         title:'Название',
         description:'Описание',
         imageUrl:'Введите абсолютный путь к изображению',
         saveChanges:'Сохранить изменения'
       }
     };    

     this.localization = localizations[this.langCode as keyof typeof localizations] || localizations['en']; // Default to English
   }

   saveChanges() {
     this.save.emit({
       title:this.editedData.title,
       description:this.editedData.description
     });
     
     this.isOpen = false; // Close modal after saving
   }
}
