import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChronicleButtonComponent } from '../chronicle-button/chronicle-button.component';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule, ChronicleButtonComponent],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.css']
})
export class LanguageSelectorComponent {
  @Output() languageSelected = new EventEmitter<string>();
  @Output() selectionComplete = new EventEmitter<void>();

  languages: Language[] = [
    { code: 'en', name: 'English', flag: '/Flag_of_the_United_States.svg' },
    { code: 'he', name: 'עברית', flag: '/Flag_of_Israel.svg' },
    { code: 'ru', name: 'Русский', flag: '/Flag_of_Russia.svg' }
  ];

  currentLanguage: string = 'en';

  handleLanguageSelect(langCode: string): void {
    this.currentLanguage = langCode;
    this.languageSelected.emit(this.currentLanguage);
  }

  continueWithLanguage(): void {
    this.languageSelected.emit(this.currentLanguage);
    this.selectionComplete.emit();
  }

  getContinueText(): string {
    switch(this.currentLanguage) {
      case 'en': return 'Continue';
      case 'he': return 'המשך';
      case 'ru': return 'Продолжить';
      default: return 'Continue';
    }
  }
}
