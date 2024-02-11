import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDelerComponent } from './add-deler.component';

describe('AddDelerComponent', () => {
  let component: AddDelerComponent;
  let fixture: ComponentFixture<AddDelerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDelerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddDelerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
