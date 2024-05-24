import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JObWorkProductDetailComponent } from './job-work-product-detail.component';

describe('JObWorkProductDetailComponent', () => {
  let component: JObWorkProductDetailComponent;
  let fixture: ComponentFixture<JObWorkProductDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JObWorkProductDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JObWorkProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
