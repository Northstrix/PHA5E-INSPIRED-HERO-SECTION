import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronicleButtonComponent } from './chronicle-button.component';

describe('ChronicleButtonComponent', () => {
  let component: ChronicleButtonComponent;
  let fixture: ComponentFixture<ChronicleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChronicleButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChronicleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
