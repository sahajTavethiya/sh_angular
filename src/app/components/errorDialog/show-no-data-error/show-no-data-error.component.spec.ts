import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowNoDataErrorComponent } from './show-no-data-error.component';

describe('ShowNoDataErrorComponent', () => {
  let component: ShowNoDataErrorComponent;
  let fixture: ComponentFixture<ShowNoDataErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowNoDataErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowNoDataErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
