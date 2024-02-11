import { CommonModule } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { first } from 'rxjs';
import { LoginService } from '../../../service/login.service';
import { MenuComponent } from '../../header/menu/menu.component';
import { NavComponent } from '../../header/nav/nav.component';
import { NgxFileDropEntry, NgxFileDropModule } from 'ngx-file-drop';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-add-user-management',
  standalone: true,
  imports: [CommonModule, MenuComponent, NavComponent, FormsModule, ReactiveFormsModule, MatTableModule, MatInputModule, MultiSelectModule, DropdownModule, NgxFileDropModule],
  templateUrl: './add-user-management.component.html',
  styleUrl: './add-user-management.component.css'
})
export class AddUserManagementComponent {
  rolePermissionForm: FormGroup;

  constructor(public service: LoginService, readonly router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.rolePermissionForm = this.formBuilder.group({
      image: [''],
      roleId: ['', Validators.required],
      phone: ['', Validators.required],
      countryCode: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: [''],
    });
  }

  public files: NgxFileDropEntry[] = [];

  public maxUploads = 1;
  public flexMaxMessage = false;
  imageNameArray: any[] = [];
  public images: string[] = [];
  imagePath: any = '';
  imageName: any;

  dealerId: any;

  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForUserImageShow: any;
  isLoading = false;
  readonlyInput = false;
  countryCodes: any = [];
  ngOnInit(): void {
    this.FullUrlForUserImageShow = this.UrlForCarImage + this.other + this.thumb;
    this.route.queryParams.subscribe((params: any) => {
      this.dealerId = params['dealerId'];
    });
    if (this.dealerId) {
      this.getUserDetail();
      this.readonlyInput = true;
    }

    this.service.getCountriesCode().pipe(first()).subscribe((response: any) => {
      this.countryCodes = response;
    });

    this.getAllRoleName();
  }

  singleUserDetail: any = [];
  userDataById: any;
  getUserDetail() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    let data = {
      userId: this.dealerId
    }
    this.service.getUserDetail(data, { headers }).pipe(first()).subscribe((response: any) => {
      console.log("Get Single User List --", response.data);
      this.singleUserDetail = response.data[0];
      if (this.singleUserDetail?.ProfilePhoto && (this.singleUserDetail?.ProfilePhoto !== undefined || this.singleUserDetail?.ProfilePhoto !== null)) {
        this.imagePath = this.FullUrlForUserImageShow + this.singleUserDetail.ProfilePhoto;
        // this.service.showImageForProfilePic(this.singleUserDetail.ProfilePhoto).subscribe((response: any) => {
        //   this.imagePath = response.uri;
        console.log(this.singleUserDetail.ProfilePhoto);
        
        this.userDataById = {
          image: this.singleUserDetail.ProfilePhoto || '',
          roleId: this.singleUserDetail.RoleId || '',
          countryCode: this.singleUserDetail.CountryCode || '',
          phone: this.singleUserDetail.PhoneNumber || '',
          name: this.singleUserDetail.DisplayName || '',
          email: this.singleUserDetail.EmailId || '',
          password: ''
        }
        console.log(this.userDataById);
        
        this.rolePermissionForm.setValue(this.userDataById);
        this.isLoading = false;
        // });
      } else {
        this.imagePath = "https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg";
        this.userDataById = {
          image: this.singleUserDetail.ProfilePhoto ? this.singleUserDetail.ProfilePhoto : '',
          roleId: this.singleUserDetail.RoleId || '',
          countryCode: this.singleUserDetail.CountryCode || '',
          phone: this.singleUserDetail.PhoneNumber || '',
          name: this.singleUserDetail.DisplayName || '',
          email: this.singleUserDetail.EmailId || '',
          password: ''
        }
        console.log(this.userDataById);
        
        this.rolePermissionForm.setValue(this.userDataById);
      }
      
      console.log("---", this.rolePermissionForm.value);
    });
  }

  allPermissions: any = [];
  getAllRoleName() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getAllRoles({ headers }).pipe(first()).subscribe((response: any) => {
      console.log("Get All Role Name --", response.data.userDetail);
      this.allPermissions = response.data.userDetail;
      this.isLoading = false;
    });
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    console.log(files);

    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        this.isLoading = true;
        if (this.images.length >= this.maxUploads) {
          console.log('Maximum uploads reached');
          this.flexMaxMessage = true;
          break;
        }
        console.log(droppedFile.fileEntry);
        this.images.push(droppedFile.fileEntry.name);
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        console.log("File ENtry --", fileEntry);

        fileEntry.file((file: File) => {
          console.log(file);

          const formData = new FormData();
          formData.append('', file);

          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `${token}`);
          if (this.isPhoto(file)) {
            this.service.uploadDelearProfilePhoto(formData, { headers }).subscribe((response: any) => {
              console.log('Image profile uploaded successfully', response);
              console.log(response.data.displaypath);
              this.imageName = response.data.filename;
              this.imageNameArray.push({
                url: this.imageName,
                thumb: this.imageName,
              });
              console.log("this is a upload image response", this.imageNameArray);
              this.imagePath = this.FullUrlForUserImageShow + this.imageName;
              this.isLoading = false;
            }, (error: any) => {
              console.error('Error uploading image', error);
              this.isLoading = false;
            });
          }
          else {
            console.error('Unsupported file type');
          }
        });
      }
    }

  }
  private isPhoto(file: File): boolean {
    return file.type.startsWith('image/');
  }
  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
  ChangeRole() {
    console.log("roleId is changed", this.rolePermissionForm.value.roleId);

  }

  onSubmit() {
    console.log(this.rolePermissionForm.value);

    if (this.rolePermissionForm.valid) {
      this.isLoading = true;
      if (this.dealerId) {
      } else {
        if (this.rolePermissionForm.value.password === null || this.rolePermissionForm.value.password === '') {
          this.service.notify.showSuccess("User Password is a Required Property!!!");
        }
      }
      let data = {
        mobileNo: this.rolePermissionForm.value.phone || null,
        countryCode: this.rolePermissionForm.value.countryCode || null,
        emailId: this.rolePermissionForm.value.email || null,
        displayName: this.rolePermissionForm.value.name || null,
        password: this.rolePermissionForm.value.password || null,
        profilePhoto: this.imageName || this.rolePermissionForm.value.image || null,
        roleType: this.rolePermissionForm.value.roleId || null,
        userId: 0
      }
      if (this.dealerId !== null || this.dealerId !== '' || this.dealerId !== undefined) {
        data.userId = parseInt(this.dealerId);
      }
      console.log(data);

      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      this.service.addAdminUser(data, { headers }).pipe(first()).subscribe((response: any) => {
        console.log("Add User --", response);
        this.isLoading = false;
        this.rolePermissionForm.reset();
        if(response.status === 200) {
          this.service.notify.showSuccess(response.message);
        }
        this.router.navigate(['/user_management']);
      }, (error) => {
        console.log(error);
        this.isLoading = false;
        if (error.error.status) {
          this.service.notify.showSuccess(error.error.message);
        }
      });
    } else {
      if (this.rolePermissionForm.value.roleId === null || this.rolePermissionForm.value.roleId === '') {
        this.service.notify.showSuccess("User Role Id is a Required Property!!!");
      }
      if (this.rolePermissionForm.value.countryCode === null || this.rolePermissionForm.value.countryCode === '') {
        this.service.notify.showSuccess("User Country Code is a Required Property!!!");
      }
      if (this.rolePermissionForm.value.phone === null || this.rolePermissionForm.value.phone === '') {
        this.service.notify.showSuccess("User Mobile Number is a Required Property!!!");
      }
      if (this.rolePermissionForm.value.name === null || this.rolePermissionForm.value.name === '') {
        this.service.notify.showSuccess("User Display Name is a Required Property!!!");
      }
      if (this.rolePermissionForm.value.email === null || this.rolePermissionForm.value.email === '') {
        this.service.notify.showSuccess("User Email Id is a Required Property!!!");
      }

      console.log("Form is not Valid!!!");
    }
  }

  back() {
    this.router.navigate(['/user_management']);
  }
}
