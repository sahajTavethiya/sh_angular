import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveCarListAdminComponent } from './active-car-list-admin.component';

describe('ActiveCarListAdminComponent', () => {
  let component: ActiveCarListAdminComponent;
  let fixture: ComponentFixture<ActiveCarListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveCarListAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActiveCarListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
