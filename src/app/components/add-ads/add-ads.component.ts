import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorModule } from 'primeng/paginator';
import { NgxFileDropEntry, NgxFileDropModule, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { HttpHeaders } from '@angular/common/http';
import { LoginService } from '../../service/login.service';
import { MenuComponent } from '../header/menu/menu.component';
import { NavComponent } from '../header/nav/nav.component';
import { environment } from '../../environment/environment';
import { ConfirmationDialogComponentComponent } from '../ConfirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-add-ads',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, PaginatorModule, NgxFileDropModule, MenuComponent, NavComponent],
  templateUrl: './add-ads.component.html',
  styleUrl: './add-ads.component.css'
})
export class AddAdsComponent implements OnInit {
  dialogRef!: MatDialogRef<any>;
  constructor(public service: LoginService, readonly router: Router, private dialog: MatDialog) { }
  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  other = environment.OtherPhotoVideo;
  FullUrlForAdsImageShow: any;
  FullUrlForAdsVideoShow: any;
  allAds: any = [];
  canInsertAdds = false;
  canDeleteAdds = false;
  isLoading = false;
  ngOnInit(): void {
    this.FullUrlForAdsImageShow = this.UrlForCarImage + this.other + this.thumb;
    this.FullUrlForAdsVideoShow = this.UrlForCarImage + this.other;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    // Role Type Id - Deler - 10 , Customer - 20, Admin - -1.
    this.isLoading = true;
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let CustomerDetailPagePermission = response.data.detail.find((x: any) => x.ResourceId == 80);
      console.log("its DealerInventoryPagePermission", CustomerDetailPagePermission);

      if (CustomerDetailPagePermission && CustomerDetailPagePermission?.CanInsert && CustomerDetailPagePermission?.CanInsert == true) {
        this.canInsertAdds = true;
      }
      if (CustomerDetailPagePermission && CustomerDetailPagePermission?.CanDelete && CustomerDetailPagePermission?.CanDelete == true) {
        this.canDeleteAdds = true;
      }
      this.isLoading = false;
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    })
    this.getAllAds();
  }

  showErrorMessage = false;
  getAllAds() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getAllAds({ headers }).subscribe((response: any) => {
      this.allAds = []; //response.data.userDetail;
      this.isLoading = false;
      response.data.userDetail.forEach((element: any) => {
        element.url = this.UrlForCarImage + this.other + element.URL;
        this.allAds.push(element);
      });
      if(this.allAds.length === 0) {
        this.showErrorMessage = true;
      }
      console.log('All Ads Get successfully', this.allAds);
    }, (error) => {
      console.error(error);
      this.isLoading = false;
    });
  }

  isSidebarActive = false;
  delerId: any;
  carList: any = [];
  showAllDeler = true;
  loggedUserName = localStorage.getItem('Name')?.toString();

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }


  public images: string[] = [];
  imageName: any;
  imagePath: any;
  imageNameArray: any[] = [];
  imageVideoShow: any[] = [];
  showImageVideo: any = [];
  imageType: any;
  videoName: any;
  public files: NgxFileDropEntry[] = [];
  public maxUploads = 1;
  public flexMaxMessage = false;

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    console.log(files);

    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        this.isLoading = true;
        if (this.images.length >= this.maxUploads) {
          // Maximum uploads reached
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

          // Create FormData
          const formData = new FormData();
          formData.append('', file);

          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `${token}`);
          console.log("Form Data--", formData);

          if (this.isPhoto(file)) {
            this.service.uploadCarAdsPhoto(formData, { headers }).subscribe((response: any) => {
              console.log('Image uploaded successfully', response);
              console.log(response.data.displaypath);
              this.imagePath = response.data.displaypath;
              this.imageName = response.data.filename;
              this.imageType = response.data.type;
              this.imageVideoShow.push(this.imagePath);
              this.imageNameArray.push({
                type: 'I',
                VehTypeId: 0,
                url: this.imageName,
                thumb: this.imageName,
                isMain: 0
              });
              this.showImageVideo.push({
                type: 'I',
                VehTypeId: 0,
                url: this.FullUrlForAdsImageShow + this.imageName,
                thumb: this.FullUrlForAdsImageShow + this.imageName,
                isMain: 0
              })
              console.log("Video Image Path", response.data);
              console.log("Image Array --", this.showImageVideo);
              this.isLoading = false;
            }, (error: any) => {
              console.error('Error uploading image', error);
              this.isLoading = false;
            });
          } else if (this.isVideo(file)) {
            this.isLoading = true;
            this.service.uploadCarAdsVideo(formData, { headers }).subscribe((response: any) => {
              console.log('Video uploaded successfully', response);
              this.isLoading = false;
              if (response.data.thumb_name) {
                let videoPath = response.data.thumb_name;
                this.videoName = response.data.filename;
                this.imageType = response.data.type;
                this.imageNameArray.push({
                  type: 'V',
                  VehTypeId: 0,
                  url: response.data.filename,
                  thumb: response.data.thumb_name,
                  isMain: 0
                });
                this.showImageVideo.push({
                  type: 'V',
                  VehTypeId: 0,
                  url: this.FullUrlForAdsVideoShow + response.data.filename,
                  thumb: this.FullUrlForAdsVideoShow + response.data.thumb_name,
                  isMain: 0
                })
                console.log(this.imageNameArray);
              }
            }, (error: any) => {
              console.error('Error uploading video', error);
              this.isLoading = false;
            });
          } else {
            console.error('Unsupported file type');
          }
          console.log("Image/Video Array --", this.imageVideoShow);
        });
      }
    }
  }

  private isPhoto(file: File): boolean {
    return file.type.startsWith('image/');
  }
  private isVideo(file: File): boolean {
    return file.type.startsWith('video/');
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }

  addAds() {
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.imageNameArray.forEach(element => {
      console.log(element);
      let data = {
        type: element.type,
        thumb: element.thumb,
        url: element.url
      }
      this.service.addAds(data, { headers }).subscribe((response: any) => {
        console.log('Ads Added successfully', response);
        this.isLoading = false;
        this.showImageVideo = [];
        this.images = [];
        this.imageNameArray = [];
        this.allAds = [];
        this.getAllAds();
        this.service.notify.showError('Car Ads Added Successfullt');
        this.imagePath = '';
      });
    });


  }

  deleteImage(image: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to Delete ?"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.isLoading = true;
        let imageId = parseInt(image.Id);
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        let data = {
          fname: image.URL,
          ftname: image.Thumb,
          VI_Id: imageId
        }
        this.service.deleteImage(data, { headers }).subscribe((response: any) => {
          console.log('Ads Deleted Successfully', response);
          this.isLoading = false;
          this.getAllAds();
          this.service.notify.showError('Car Image Deleted Successfully');
        });
      }
    });
  }



  CarDetailById(VehicalId: any) {
    console.log("Cliecked", VehicalId, this.delerId);

    this.router.navigate(['/carDetail'], { queryParams: { VehicalId: VehicalId, delerId: parseInt(this.delerId) } });
  }



  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  delers() {
    this.router.navigate(['/deler']);
  }

  customerDetail() {
    this.router.navigate(['/customer_detail']);
  }

  plan() {
    this.router.navigate(['/subscription']);
  }

  privacy() {
    this.router.navigate(['/privacy_policy']);
  }

  ads() {
    this.router.navigate(['/addAds']);
  }

  logOut(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

}
