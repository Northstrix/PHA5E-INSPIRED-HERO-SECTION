import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyHeroSectionComponent } from './fancy-hero-section.component';

describe('FancyHeroSectionComponent', () => {
  let component: FancyHeroSectionComponent;
  let fixture: ComponentFixture<FancyHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FancyHeroSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FancyHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
