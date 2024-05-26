import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMasterRoleAddComponent } from './user-master-role-add.component';

describe('UserMasterRoleAddComponent', () => {
  let component: UserMasterRoleAddComponent;
  let fixture: ComponentFixture<UserMasterRoleAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMasterRoleAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMasterRoleAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
