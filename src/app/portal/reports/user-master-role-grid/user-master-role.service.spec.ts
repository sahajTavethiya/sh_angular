import { TestBed } from '@angular/core/testing';

import { UserMasterRoleService } from './user-master-role.service';

describe('UserMasterRoleService', () => {
  let service: UserMasterRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMasterRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
