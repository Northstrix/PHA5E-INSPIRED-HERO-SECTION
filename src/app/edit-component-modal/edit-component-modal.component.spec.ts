import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponentModalComponent } from './edit-component-modal.component';

describe('EditComponentModalComponent', () => {
  let component: EditComponentModalComponent;
  let fixture: ComponentFixture<EditComponentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditComponentModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditComponentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
