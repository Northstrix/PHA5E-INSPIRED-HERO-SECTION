import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionAwareButtonComponent } from './position-aware-button.component';

describe('PositionAwareButtonComponent', () => {
  let component: PositionAwareButtonComponent;
  let fixture: ComponentFixture<PositionAwareButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PositionAwareButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionAwareButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
