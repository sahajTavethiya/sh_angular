import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcrListComponent } from './ocr-list.component';

describe('OcrListComponent', () => {
  let component: OcrListComponent;
  let fixture: ComponentFixture<OcrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcrListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OcrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
