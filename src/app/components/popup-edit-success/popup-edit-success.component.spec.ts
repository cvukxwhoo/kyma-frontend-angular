import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupEditSuccessComponent } from './popup-edit-success.component';

describe('PopupEditSuccessComponent', () => {
  let component: PopupEditSuccessComponent;
  let fixture: ComponentFixture<PopupEditSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupEditSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupEditSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
