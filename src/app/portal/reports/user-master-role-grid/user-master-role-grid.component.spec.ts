import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterRoleGridComponent } from './user-master-role-grid.component';

describe('UserMasterRoleGridComponent', () => {
  let component: UserMasterRoleGridComponent;
  let fixture: ComponentFixture<UserMasterRoleGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMasterRoleGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMasterRoleGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
