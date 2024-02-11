import { ChangeDetectorRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxFileDropEntry, NgxFileDropModule, FileSystemFileEntry } from 'ngx-file-drop';
import { HttpHeaders } from '@angular/common/http';
import { first } from 'rxjs';
import { environment } from '../../../environment/environment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { SearchFilterModule } from '../../../search-filter/search-filter.module';
import { DropdownModule } from 'primeng/dropdown';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AddCarModule } from '../../../add-car/add-car.module';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../errorDialog/error-dialog/error-dialog.component';
import { ConfirmationDialogComponentComponent } from '../../ConfirmationDialogComponent/confirmation-dialog-component/confirmation-dialog-component.component';
import { CalendarModule } from 'primeng/calendar';
import { NgxFileDropComponent } from 'ngx-file-drop';


// import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
@Component({

  selector: 'app-add-car',
  standalone: true,
  imports: [
    MatSelectModule,
    SearchFilterModule,
    CommonModule,
    AddCarModule,
    MatStepperModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MultiSelectModule,
    FormsModule,
    DropdownModule,
    MatAutocompleteModule,
    CalendarModule
    // BrowserAnimationsModule,
    // GooglePlaceModule, 
  ],

  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {

  @ViewChild(NgxFileDropComponent) fileDropComponent!: NgxFileDropComponent;

  myForm: FormGroup;
  searchControl = new FormControl();
  searchTerm: string = '';
  address: any;
  options = {
    types: ['address'],
    componentRestrictions: { country: 'IN' }
    // Restrict to India
  };

  constructor(public service: LoginService, public router: Router, public formBuilder: FormBuilder, private route: ActivatedRoute, public dialog: MatDialog, private cdr: ChangeDetectorRef, private ngZone: NgZone) {
    const numberValidator: ValidatorFn = (control: AbstractControl) => {
      const value = control.value;

      // Check if the value is a number
      if (!/^[0-9]*$/.test(value)) {
        return { 'notANumber': true };
      }

      return null;
    };
    this.myForm = this.formBuilder.group({
      VehModelId: [''],
      isNewVeh: ['', Validators.required],
      VehManufYear: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4), numberValidator]],
      FuelTypeId: ['', Validators.required],
      Body_style: ['', Validators.required],
      Transmission: ['', Validators.required],
      Manufacturer: ['', Validators.required],
      Color: ['', Validators.required],
      VehShellPrice: ['', Validators.required],
      Engine_type: ['', Validators.required],
      Body_type: ['', Validators.required],
      Country: ['', Validators.required],
      MakerId: ['', Validators.required],
      VehTypeId: [''],
      Engine_Number: [''],
      insurance_Expiry_Date: [''],
      Location: [''],
      firstName: [''],
      Engine_cylinders: [''],
      Engine_valves: [''],
      Engine_KiloWatts: [''],
      Engine_HorsePower: [''],
      Engine_aspiration: [''],
      Manufactured_in: [''],
      Number_of_seates: [''],
      model: ['', Validators.required],
      automaticGearBox: [''],
      VDS: [''],
      Check_digit: [''],
      Displacement_CID: [''],
      Displacement_Nominal: [''],
      Displacement_SI: [''],
      Driveline: [''],
      Model_year: [''],
      Note: [''],
      Number_of_doors: [''],
      Region: [''],
      Serial_number: [''],
      Trim_level: [''],
      VIS_identifier: [''],
      VIN_type: [''],
      Vehicle_class: [''],
      Vehicle_type: [''],
      WMI: [''],
      Year_identifier: [''],
      Engine_head: [''],
      Standard_equipment: [[]],
      Optional_equipment: [[]],
      VehKmsDriven: [''],
      Entered_VIN: [''],
      address_line_1: ['']
    });
  }

  allowOnlyNumbers(event: KeyboardEvent) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  brand = new FormControl('');
  isNewVehData: any[] = [];
  brandList: any[] = [];
  Equipment: any[] = [];
  transmissionMaster: any[] = [];
  countryMaster: any[] = [];
  bodyStyleMaster: any[] = [];
  engineMaster: any[] = [];
  regionMaster: any[] = [];
  manufacturerMaster: any[] = [];
  STequipmentMaster: any[] = [];
  Optional_equipment: any[] = [];
  Body_type: any[] = [];
  delerId: any;
  vehicalId: any;
  RoleId: any;
  carList: any = [];
  canEditCar = false;
  UrlForCarImage = environment.CDN_URL;
  thumb = environment.Thumb;
  carPhoto = environment.CarPhoto;
  carVideo = environment.CarVideo;
  FullUrlForCarImageShow: any;
  FullUrlForCarVideoShow: any;
  canAddCar = false;
  isLoading = false;
  ngOnInit(): void {
    if (localStorage.getItem('token') === undefined || localStorage.getItem('token') === null) {
      this.router.navigate(['/login']);
    }
    this.RoleId = localStorage.getItem('RoleId');

    this.FullUrlForCarImageShow = this.UrlForCarImage + this.carPhoto + this.thumb;
    this.FullUrlForCarVideoShow = this.UrlForCarImage + this.carVideo;

    this.route.queryParams.subscribe((params: any) => {
      this.delerId = params['delerId'];
      this.vehicalId = params['VehicalId'] || null;
    });

    this.isNewVehData = [
      {
        Id: 1,
        KeyName: 'New'
      },
      {
        Id: 0,
        KeyName: 'Used'
      }
    ]

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.isLoading = true;
    this.service.getListForDropDown(0, 10, { headers }).subscribe((response: any) => {
      this.brandList = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getListForDropDown(0, 30, { headers }).subscribe((response: any) => {
      this.transmissionMaster = response.data.userDetail;
      this.isLoading = false;
    }); this.isLoading = true;
    this.service.getListForDropDown(0, 40, { headers }).subscribe((response: any) => {
      this.countryMaster = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getListForDropDown(0, 50, { headers }).subscribe((response: any) => {
      this.bodyStyleMaster = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getListForDropDown(0, 60, { headers }).subscribe((response: any) => {
      this.engineMaster = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getListForDropDown(0, 70, { headers }).subscribe((response: any) => {
      this.Equipment = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getListForDropDown(0, 90, { headers }).subscribe((response: any) => {
      this.manufacturerMaster = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getListForDropDown(0, 110, { headers }).subscribe((response: any) => {
      this.regionMaster = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getListForDropDown(10, 70, { headers }).subscribe((response: any) => {
      this.STequipmentMaster = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getListForDropDown(20, 70, { headers }).subscribe((response: any) => {
      this.Optional_equipment = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getListForDropDown(0, 120, { headers }).subscribe((response: any) => {
      this.Body_type = response.data.userDetail;
      this.isLoading = false;
    });
    this.isLoading = true;
    this.service.getloggdUserPermission({ headers }).subscribe((response: any) => {
      let CarDetailPagePermission = response.data.detail.find((x: any) => x.ResourceId == 30);
      console.log("its DealerInventoryPagePermission", CarDetailPagePermission);

      if (CarDetailPagePermission && CarDetailPagePermission?.CanView && CarDetailPagePermission?.CanUpdate == true) {
        this.canEditCar = true;
        this.canAddCar = true;
      }
      this.isLoading = false;
    })

    if (this.vehicalId) {
      this.isLoading = true;
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      let CarData = {
        skip: 0,
        take: 10,
        VehicalId: parseInt(this.vehicalId),
        DealerId: parseInt(this.delerId)
      }
      this.service.getAllCar(CarData, { headers }).pipe(first()).subscribe((response: any) => {
        if (response.data?.images.length > 0) {
          console.log(response.data.images);


          response.data.images.forEach((element: any) => {
            if (element.Type === 'I') {
              this.imagePath = this.FullUrlForCarImageShow + element.Thumb;
              if (element.IsMain === true) {
                this.showMainImage = true;
              }

              // this.service.showImage(element.Thumb).subscribe((response: any) => {
              // console.log("getImageResponse", response)
              this.imageType = true;
              // console.log("Image Response --", response);
              let CarImageObj = {
                type: 'I',
                vehId: parseInt(this.vehicalId),
                url: this.FullUrlForCarImageShow + element.Thumb,
                thumb: this.FullUrlForCarImageShow + element.Thumb,
                isMain: element.IsMain
              }
              this.imageVideoShow.push(this.imagePath);
              this.imageShowCar.push(CarImageObj);
              let obj = {
                type: 'I',
                vehId: parseInt(this.vehicalId),
                url: element.Thumb,
                thumb: element.Thumb,
                isMain: element.IsMain
              }
              this.imageNameArray.push(obj);
              // });
            } else if (element.Type === 'V') {
              // this.service.showVideo(element.Thumb).subscribe((response: any) => {
              // console.log("Video Response --", response);
              this.imageType = false;
              this.imagePath = response.uri;
              this.imageVideoShow.push(this.imagePath);
              let CarImageObj = {
                type: 'V',
                vehId: parseInt(this.vehicalId),
                url: this.FullUrlForCarImageShow + element.Thumb,
                thumb: this.FullUrlForCarImageShow + element.Thumb,
                isMain: element.IsMain
              }
              this.imageShowCar.push(CarImageObj);
              let obj = {
                type: 'V',
                vehId: parseInt(this.vehicalId),
                url: element.Thumb,
                thumb: element.Thumb,
                isMain: element.IsMain
              }
              this.imageNameArray.push(obj);
              // });
            }
          });
        }
        this.carList = response.data.carDetails;
        console.log("Car List --", this.carList);
        this.isMainImagePath = {
          type: 'I',
          vehId: parseInt(this.vehicalId),
          url: this.FullUrlForCarImageShow + this.carList.Main_Image_Url,
          thumb: this.FullUrlForCarImageShow + this.carList.Main_Image_Thumb,
          isMain: 1
        }

        let obj = {
          VehTypeId: parseInt(this.carList?.VehTypeId),
          isNewVeh: parseInt(this.carList?.isNewVeh),
          VehModelId: parseInt(this.carList?.Model),
          model: parseInt(this.carList?.Model),
          VehManufYear: this.carList?.VehManufYear?.toString(),
          FuelTypeId: parseInt(this.carList?.Fuel_type),
          Engine_Number: this.carList?.Engine_Number,
          Color: this.carList?.Color,
          VehShellPrice: this.carList?.VehShellPrice?.toString(),
          address_line_1: this.carList?.Adress_line_1 + '' + this.carList?.Adress_line_2,
          Entered_VIN: this.carList?.VinNum,
          Engine_cylinders: this.carList?.Engine_cylinders,
          Engine_type: parseInt(this.carList?.Engine_type),
          Engine_valves: this.carList?.Engine_valves,
          Engine_aspiration: this.carList?.Engine_aspiration,
          Engine_KiloWatts: this.carList?.Engine_KiloWatts,
          Engine_HorsePower: this.carList?.Engine_HorsePower,
          Manufactured_in: this.carList?.Manufactured_in,
          Serial_number: this.carList?.Serial_number || '',
          Number_of_seats: this.carList?.Number_of_seats || '',
          automaticGearBox: this.carList?.Automatic_gearbox || '',
          Body_type: parseInt(this.carList?.Body_type),
          VDS: this.carList?.VDS,
          Check_digit: this.carList?.Check_digit || '',
          Country: parseInt(this.carList?.Country) || '',
          Displacement_CID: this.carList?.Displacement_CID || '',
          Displacement_Nominal: this.carList?.Displacement_Nominal || '',
          Displacement_SI: this.carList?.Displacement_SI || '',
          Driveline: this.carList?.Driveline || '',
          Model_year: this.carList?.Model_year || '',
          Note: this.carList?.Note || '',
          Number_of_doors: this.carList?.Number_of_doors || '',
          Region: parseInt(this.carList?.Region) || '',
          Squish_VIN: '',
          Trim_level: this.carList?.Trim_level || '',
          VIN_type: this.carList?.VIN_type || '',
          VIS_identifier: this.carList?.VIS_identifier || '',
          Vehicle_type: this.carList?.Vehicle_type || '',
          Vehicle_class: this.carList?.Vehicle_class || '',
          WMI: this.carList?.WMI || '',
          Year_identifier: this.carList?.Year_identifier || '',
          Engine_head: this.carList?.Engine_head,
          Body_style: parseInt(this.carList?.Body_style),
          Transmission: parseInt(this.carList?.Transmission) || '',
          Standard_equipment: this.carList?.Standard_equipment || '',
          Optional_equipment: this.carList?.Optional_equipment || '',
          Manufacturer: parseInt(this.carList?.Manufacturer),
          VehKmsDriven: this.carList?.VehKmsDriven || '',
          MakerId: parseInt(this.carList?.Make)
        }
        obj.Standard_equipment = this.carList?.Standard_equipment.split(',').map(Number);
        obj.Optional_equipment = this.carList?.Optional_equipment.split(',').map(Number);
        console.log(this.carList?.Standard_equipment);

        console.log(obj.Standard_equipment);

        // this.carList?.Standard_equipment = this.carList.Standard_equipment
        this.brandId = parseInt(this.carList?.Make);
        this.BrandChange(this.brandId);
        if (obj.isNewVeh && String(obj.isNewVeh) === 'Yes') {
          obj.isNewVeh = 1;
        } else {
          obj.isNewVeh = 0;
        }
        this.myForm.patchValue(obj);
        console.log("My Form Valueeee --", this.myForm.value);

        this.isLoading = false;
      });
    }
  };

  resetForm() {
    this.myForm = this.formBuilder.group({
      VehTypeId: ['',],
      VehModelId: ['',],
      VehManufYear: ['',],
      FuelTypeId: ['',],
      isNewVeh: [''],
      Engine_Number: ['',],
      Color: ['',],
      VehShellPrice: ['',],
      Location: ['',],
      firstName: ['',],
      Engine_cylinders: [''],
      Engine_type: [''],
      Engine_valves: [''],
      Engine_KiloWatts: [''],
      Engine_HorsePower: [''],
      Engine_aspiration: [''],
      Manufactured_in: [''],
      Number_of_seates: [''],
      model: [''],
      automaticGearBox: [''],
      Body_type: [''],
      VDS: [],
      Check_digit: [''],
      Displacement_CID: [''],
      Displacement_Nominal: [''],
      Displacement_SI: [''],
      Driveline: [''],
      Model_year: [''],
      Note: [''],
      Number_of_doors: [''],
      Country: [''],
      Region: [''],
      Serial_number: [''],
      // Squish_VIN: [''],
      Trim_level: [''],
      VIS_identifier: [''],
      VIN_type: [''],
      Vehicle_class: [''],
      Vehicle_type: [''],
      WMI: [''],
      Year_identifier: [''],
      Engine_head: [''],
      Body_style: [''],
      Transmission: [''],
      Manufacturer: [''],
      Standard_equipment: [[]],
      Optional_equipment: [[]],
      VehKmsDriven: [],
      Entered_VIN: [''],
      MakerId: ['']
    });
  }

  isEditCar = false;
  deleteImage(url: any, thumb: any, type: any, isMain: any) {
    console.log("this is a Image Array", this.imageShowCar);

    const dialogRef = this.dialog.open(ConfirmationDialogComponentComponent, {
      width: '400px',
      data: {
        header: "Confirmation",
        message: "Do you want to Delete ?"
      }
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        // console.log(this.imageVideoShow);
        // console.log(this.imageShowCar);

        // let imageDeleted = this.imageVideoShow.find((x: any) => x === image);
        // console.log(imageDeleted);

        // if (imageDeleted !== -1) {
        //   this.imageVideoShow.splice(imageDeleted, 1);
        // }
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders().set('Authorization', `${token}`);
        let data = {
          fname: url,
          ftname: thumb,
          fType: type
        }
        console.log("this is a delete Image Rq Obj", data);
        console.log("this is a image Name", data.fname.split("/").pop());
        this.isLoading = true;
        this.service.removeUploadImage(data, { headers }).subscribe((response: any) => {
          if (isMain === 1) {
            this.isMainImagePath = null;
            this.showMainImage = false;
          }
          this.imageShowCar = this.imageShowCar.filter((item: any) => item.url !== data.fname);
          this.imageNameArray = this.imageNameArray.filter((item: any) => item.url !== data.fname.split("/").pop());
          this.cdr.detectChanges();
          if (this.vehicalId) {
            this.isEditCar = true;
            this.addCar();
          }
          this.isLoading = false;
        });
      }
    });


  }

  isMainForReplceImage: any;
  replaceMainImage(imageData: any) {
    console.log(imageData.isMain);
    const indexToRemove = this.imageNameArray.find((item: any) => item.isMain === true);
    const removeInShowCarArray = this.imageShowCar.find((item: any) => item.isMain === true);
    console.log(this.imageNameArray);
    if (indexToRemove !== -1) {
      this.imageNameArray.splice(indexToRemove, 1);
    }
    if (removeInShowCarArray !== -1) {
      this.imageShowCar.splice(indexToRemove, 1);
    }
    console.log(this.imageNameArray);
    this.isMainForReplceImage = imageData.isMain;
    this.fileDropComponent.openFileSelector();
  }

  handleAddressChange(address: any) {
    console.log('Selected Address:', address);
    // Handle the selected address here
  }
  updateMaster(Number: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.isLoading = true;
    switch (Number) {
      case 10:
        this.service.getListForDropDown(0, 10, { headers }).subscribe((response: any) => {
          this.brandList = response.data.userDetail;
          this.isLoading = false;
        });
        break;
      case 30:
        this.service.getListForDropDown(0, 30, { headers }).subscribe((response: any) => {
          this.transmissionMaster = response.data.userDetail;
          this.isLoading = false;
        });
        break;
      case 40:
        this.service.getListForDropDown(0, 40, { headers }).subscribe((response: any) => {
          this.countryMaster = response.data.userDetail;
          this.isLoading = false;
        });
        break;
      case 50:
        this.service.getListForDropDown(0, 50, { headers }).subscribe((response: any) => {
          this.bodyStyleMaster = response.data.userDetail;
          this.isLoading = false;
        });
        break;
      case 60:
        this.service.getListForDropDown(0, 60, { headers }).subscribe((response: any) => {
          this.engineMaster = response.data.userDetail;
          this.isLoading = false;
        });
        break;
      case 70:
        this.service.getListForDropDown(10, 70, { headers }).subscribe((response: any) => {
          this.STequipmentMaster = response.data.userDetail;
          this.isLoading = false;
        });
        this.service.getListForDropDown(20, 70, { headers }).subscribe((response: any) => {
          this.Optional_equipment = response.data.userDetail;
          this.isLoading = false;
        });
        break;
      case 90:
        this.service.getListForDropDown(0, 90, { headers }).subscribe((response: any) => {
          this.manufacturerMaster = response.data.userDetail;
          this.isLoading = false;
        });
        break;
      case 120:
        this.service.getListForDropDown(0, 120, { headers }).subscribe((response: any) => {
          this.Body_type = response.data.userDetail;
          this.isLoading = false;
        });
        break;
      default:
        break;
    }
  }
  modelList: any[] = [];
  fuelType: any[] = [];
  brandId: number = 0;
  BrandChange(event: any) {
    console.log(event);
    this.isLoading = true;
    let BrandId;
    if (this.vehicalId) {
      BrandId = this.brandId;
    } else {
      BrandId = event?.value === undefined ? '0' : event?.value;

    };
    console.log("this is a BrandId", BrandId)
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.service.getListForDropDown(BrandId, 20, { headers }).subscribe((response: any) => {
      this.modelList = response.data.userDetail;
      console.log("Car Model Name --", this.modelList);
      this.isLoading = false;
      // this.cdr.detectChanges();
    });
    this.isLoading = true;
    this.service.getListForDropDown(0, 100, { headers }).subscribe((response: any) => {
      console.log("Car fuel Type --", response.data.userDetail);
      this.fuelType = response.data.userDetail;
      this.isLoading = false;
      // this.cdr.detectChanges();
    });

  }
  date: any;
  chosenYearHandler(normalizedYear: any) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  public images: string[] = [];
  public maxUploads = 20;
  public flexMaxMessage = false;
  imagePath: any;
  imageVideoShow: any = [];
  videoName: any;
  videoPath: any;
  imageType = false;
  videoType = false;
  imageName: any;
  imageNameArray: any = [];
  imageShowCar: any = [];
  showMainImage = false;
  isMainImagePath: any;
  isUploading: boolean = false;
  isUploadingMainImage: boolean = false;

  public files: NgxFileDropEntry[] = [];

  public dropped(files: NgxFileDropEntry[], isMain: any) {
    this.files = files;
    if (isMain === 1 || this.isMainForReplceImage === 1) {
      this.showMainImage = true;
      this.isUploadingMainImage = true;
    } else {
      // this.isUploading = true;
    }
    // if (files.length > 1) {
    //   this.isUploadingMainImage = false;
    //   this.showMainImage = false;
    //   return this.service.notify.showSuccess("You can upload One File at a Time.");
    // } else {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        // this.isLoading = true;
        if (this.images.length >= this.maxUploads) {
          // Maximum uploads reached
          console.log('Maximum uploads reached');
          this.flexMaxMessage = true;
          break;
        }
        this.images.push(droppedFile.fileEntry.name);
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          if (this.isPhoto(file)) {
            this.displayLocalImage(file, isMain, true);
          }

          // Create FormData
          const formData = new FormData();
          formData.append('', file);

          const token = localStorage.getItem('token');
          const headers = new HttpHeaders().set('Authorization', `${token}`);
          console.log("Form Data--", formData);

          if (this.isPhoto(file)) {
            this.service.uploadCarPhoto(formData, { headers }).subscribe((response: any) => {
              console.log('Image uploaded successfully', response);
              this.imagePath = response.data.displaypath;
              this.imageName = response.data.filename;
              this.replaceLocalImageWithServerImage(response.data.filename, isMain, false);
              this.removeLocalImage(isMain);
              // this.imageShowCar.push({
              //   type: 'I',
              //   vehId: this.vehicalId || 0,
              //   url: this.FullUrlForCarImageShow + this.imageName,
              //   thumb: this.FullUrlForCarImageShow + this.imageName,
              //   urlName: this.imageName,
              //   thumbName: this.imageName,
              //   isMain: this.isMainForReplceImage ? this.isMainForReplceImage : isMain
              // });
              if (isMain === 1 || this.isMainForReplceImage === 1) {
                this.isMainImagePath = {
                  type: 'I',
                  vehId: this.vehicalId || 0,
                  url: this.FullUrlForCarImageShow + this.imageName,
                  thumb: this.FullUrlForCarImageShow + this.imageName,
                  isMain: this.isMainForReplceImage ? this.isMainForReplceImage : isMain
                }
              }
              this.imageNameArray.push({
                type: 'I',
                vehId: this.vehicalId || 0,
                url: this.imageName,
                thumb: this.imageName,
                isMain: isMain  // Set isMain to 1 for the first image
              });
              this.imagePath = this.FullUrlForCarImageShow + this.imageName;
              this.isUploading = false;
              this.isUploadingMainImage = false;
              if (this.vehicalId) {
                this.isEditCar = true;
                this.addCar();
              }
            }, (error: any) => {
              console.error('Error uploading image', error);
              this.isUploading = false;
              this.isUploadingMainImage = false;
            });
          } else if (this.isVideo(file)) {
            // this.isUploading = true;
            this.service.uploadCarVideo(formData, { headers }).subscribe((response: any) => {
              console.log('Video uploaded successfully', response);
              this.isUploading = false;
              this.isUploadingMainImage = false;
              if (response.data.thumb_name) {
                let videoPath = response.data.thumb_name;
                this.videoName = response.data.filename;

                this.imageShowCar.push({
                  type: 'V',
                  vehId: this.vehicalId || 0,
                  url: this.FullUrlForCarVideoShow + response.data.filename,
                  thumb: this.FullUrlForCarVideoShow + response.data.thumb_name,
                  urlName: response.data.filename,
                  thumbName: response.data.thumb_name,
                  isMain: 0
                });
                this.imageNameArray.push({
                  type: 'V',
                  VehTypeId: 0,
                  url: this.videoName,
                  thumb: videoPath,
                  isMain: 0
                });
                this.imagePath = this.FullUrlForCarVideoShow + response.data.filename;
                if (this.vehicalId) {
                  this.isEditCar = true;
                  this.addCar();
                }
              }
            }, (error: any) => {
              console.error('Error uploading video', error);
              this.isUploading = false;
              this.isUploadingMainImage = false;
            });
          } else {
            console.error('Unsupported file type');
          }
          console.log("Image/Video Array --", this.imageVideoShow);
        });
      }
    }
    // }
  }

  public displayLocalImage(file: File, isMain: any, isLoading: boolean): void {
    // Display the local image immediately
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageShowCar.push({
        type: 'I',
        vehId: this.vehicalId || 0,
        url: e.target.result,
        thumb: e.target.result,
        urlName: '',
        thumbName: '',
        isMain: isMain || 0,
        isLoading: isLoading, // Set the correct isLoading property
      });
    };
    reader.readAsDataURL(file);
  }

  public replaceLocalImageWithServerImage(filename: string, isMain: any, isLoading: boolean): void {
    // Find the index of the local image entry in imageShowCar array
    const index = this.imageShowCar.findIndex((img: any) => img.isMain === isMain && img.isLoading);

    if (index !== -1) {
      // Replace the local image with the image from the server
      this.imageShowCar[index] = {
        type: 'I',
        vehId: this.vehicalId || 0,
        url: this.FullUrlForCarImageShow + filename,
        thumb: this.FullUrlForCarImageShow + filename,
        urlName: filename,
        thumbName: filename,
        isMain: isMain || 0,
        isLoading: isLoading,
      };
    }
  }

  public removeLocalImage(isMain: any): void {
    // Find the index of the local image entry in imageShowCar array
    const index = this.imageShowCar.findIndex((img: any) => img.isMain === isMain && img.isLoading);

    if (index !== -1) {
      // Remove the local image from the array
      this.imageShowCar.splice(index, 1);
    }
  }



  downloadImage() {
    this.isLoading = true;
    this.service.getImage(this.imageName).subscribe((response: any) => {
      console.log("Image Response --", response);
      let imagePath = response.uri;
      console.log("Image --", imagePath);
      this.service.showImage(this.imageName).subscribe((response: any) => {
        this.imageType = true;
        console.log("Image Response --", response);
        this.imagePath = response.uri;
        this.imageVideoShow.push(this.imagePath);
        this.isLoading = false;
      });
    });
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

  isImage(entry: NgxFileDropEntry): boolean {
    return entry.fileEntry.isFile && entry.fileEntry.name.match(/\.(jpg|jpeg|png|gif)$/i) !== null;
  }

  isSidebarActive = false;
  isLinear = false;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }
  vinNumber: any;
  searchVin(event: any) {
    console.log(event);
    this.isLoading = true;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `${token}`);
    this.vinNumber = event;
    let data = {
      vin: event
    }
    this.service.searchVinNumber(data, { headers }).subscribe((response: any) => {
      console.log(response);


      if (response.status === 201) {
        let errorMessage = response.message.message;
        console.log(errorMessage);
        this.isLoading = false;
        this.openDialog();
        // this.service.notify.showSuccess(errorMessage);
      }
      else {
        if (response?.data?.NewUpdatedMasters !== null) {
          let UpdatedArray = this.convertStringToArray(response.data.NewUpdatedMasters);
          console.log("its updated Array", UpdatedArray);

          UpdatedArray.forEach((element: any) => {
            console.log("its inside");

            this.updateMaster(parseInt(element))
          });
        }
        console.log("Car search --", response);
        let carDetail = response.data.car;
        let obj = {
          isNewVeh: parseInt(carDetail?.isNewVeh),
          VehTypeId: parseInt(carDetail?.Make),
          VehModelId: parseInt(carDetail?.Model),
          VehManufYear: carDetail?.Model_year?.toString() || null,
          FuelTypeId: parseInt(carDetail?.Fuel_type),
          Engine_Number: '',
          Color: '',
          VehShellPrice: '',
          Location: carDetail?.Adress_line_1 + '' + carDetail?.Adress_line_2,
          Entered_VIN: carDetail?.Entered_VIN,
          Engine_cylinders: carDetail?.Engine_cylinders,
          Engine_type: parseInt(carDetail?.Engine_type),
          Engine_valves: carDetail?.Engine_valves,
          Engine_aspiration: carDetail?.Engine_aspiration,
          Engine_KiloWatts: carDetail?.Engine_KiloWatts,
          Engine_HorsePower: carDetail?.Engine_HorsePower,
          Manufactured_in: carDetail?.Manufactured_in,
          Manufacturer: parseInt(carDetail?.Manufacturer) || '',
          Serial_number: carDetail?.Serial_number || '',
          Number_of_seates: carDetail?.Number_of_seats || '',
          model: parseInt(carDetail?.Model) || 0,
          automaticGearBox: carDetail?.Automatic_gearbox || '',
          Body_type: parseInt(carDetail?.Body_type),
          VDS: carDetail?.VDS,
          Check_digit: carDetail?.Check_digit || '',
          Country: parseInt(carDetail?.Country) || '',
          Displacement_CID: carDetail?.Displacement_CID || '',
          Displacement_Nominal: carDetail?.Displacement_Nominal || '',
          Displacement_SI: carDetail?.Displacement_SI || '',
          Driveline: carDetail?.Driveline || '',
          Model_year: carDetail?.Model_year || '',
          Note: carDetail?.Note || '',
          Number_of_doors: carDetail?.Number_of_doors || '',
          Region: parseInt(carDetail?.Region) || '',
          Squish_VIN: '',
          Trim_level: carDetail?.Trim_level || '',
          VIN_type: carDetail?.VIN_type || '',
          VIS_identifier: carDetail?.VIS_identifier || '',
          Vehicle_type: carDetail?.Vehicle_type || '',
          Vehicle_class: carDetail?.Vehicle_class || '',
          WMI: carDetail?.WMI || '',
          Year_identifier: carDetail?.Year_identifier || '',
          Engine_head: carDetail?.Engine_head,
          Body_style: parseInt(carDetail?.Body_style),
          Transmission: parseInt(carDetail?.Transmission) || '',
          Standard_equipment: this.convertStringToArray(carDetail?.Standard_equipment) || [],
          Optional_equipment: this.convertStringToArray(carDetail?.Optional_equipment) || [],
          other_equipment: [],
          MakerId: parseInt(carDetail?.Make)
        }
        this.brandId = parseInt(carDetail?.Make);
        this.BrandChange(this.brandId);
        console.log("Fuel Type --", obj);

        this.myForm.patchValue(obj);
        //this.myForm.setValue(obj);
        this.isLoading = false;
      }

    });

  }

  stringDateConvert(date: any) {
    console.log(date);

    const [day, month, year] = date.split('/');
    const formattedDate = new Date(`${month}/${day}/${year}`);
    return formattedDate;
  }

  dateConvert(date: any) {
    if (date !== undefined || date !== null) {
      const dateTime = new Date(date);
      const formattedDate = dateTime.toLocaleDateString('en-GB');
      return formattedDate;
    } else {
      return date;
    }
  }

  searchClick() {
    this.searchVin(this.vinNumber);
  }

  openDialog() {
    const dialogRef = this.dialog.open(ErrorDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  convertStringToArray(inputString: string) {
    return inputString.split(',').map(value => parseInt(value, 10));
  }

  addCar() {
    //   if (this.myForm.invalid) {
    //     Object.keys(this.myForm.controls).forEach(controlName => {
    //       const control = this.myForm.get(controlName);

    //       // Check if the control has errors
    //       if (control?.errors != null) {
    //         // Loop through control errors and log/display them
    //         Object.keys(control.errors).forEach(errorName => {
    //           console.log(control: ${controlName}, Error: ${errorName});
    //         });
    //       }
    //     });

    //     // Optionally, you can display error messages to the user
    //     // For example, you can bind error messages to a template and display them
    //     return;
    // }
    if (this.myForm.valid) {

      //For Features Validation

      // if (this.convertArrayToString(this.myForm.value.Standard_equipment) === null || this.convertArrayToString(this.myForm.value.Standard_equipment) === '') {
      //   return this.service.notify.showSuccess("Vehical Standard Equipment is required Property");
      // }
      // if (this.convertArrayToString(this.myForm.value.Optional_equipment) === null || this.convertArrayToString(this.myForm.value.Optional_equipment) === '') {
      //   return this.service.notify.showSuccess("Vehical Optional Equipment is required Property");
      // }

      //For Specification Validation
      console.log('Form submitted:', this.myForm.value);
      console.log(this.isMainImagePath);

      if (this.isMainImagePath == null) {
        return this.service.notify.showSuccess("Main Image is compulsory Upload!!!");
      }

      // if (this.imageNameArray.length === 0) {
      //   return this.service.notify.showSuccess("Minimun 1 Image Upload!!!");
      // } else {

      let data = {
        vehBasicData: [{
          isNewVeh: parseInt(this.myForm.value.isNewVeh),
          id: parseInt(this.vehicalId) || 0,
          dealerId: parseInt(this.delerId),
          vehTypeId: 10,//parseInt(this.myForm.value.VehTypeId),
          // vehModelId: parseInt(this.myForm.value.VehModelId),
          // engineId: 0,
          // bodyStyleId: 0,
          // fuelTypeId: parseInt(this.myForm.value.FuelTypeId),
          vehShellPrice: parseInt(this.myForm.value.VehShellPrice),
          vehManufYear: this.myForm.value.VehManufYear.toString() || null,
          location: this.myForm.value.Location?.toString() || null,
          vehOwnerDetail: '' || null,
          vehKmsDriven: parseInt(this.myForm.value.VehKmsDriven),
          insurance_Expiry_Date: this.myForm.value.insurance_Expiry_Date || null, //this.myForm.value.insurance_Expiry_Date,
          posted_Date: '' || null,
          register_Type: '' || null,
          engine_Number: this.myForm.value.Engine_Number?.toString() || null,
          chasis_Number: '' || null,
          fitness_Validity: '' || null,
          permit_Validity: '' || null,
          hypothecation: '' || null,
          tax_Validity: '' || null,
          color: this.myForm.value.Color?.toString() || null,
          isActive: 1,
          isDeleted: 0
        }],
        vehVinData: [{
          vehId: parseInt(this.vehicalId) || 0,
          vehNum: '' || null,
          address_line_1: this.myForm.value.address_line_1?.toString() || null,
          address_line_2: '' || null,
          automatic_gearbox: this.myForm.value.automaticGearBox?.toString() || null,
          body_style: parseInt(this.myForm.value.Body_style) || 0,
          body_type: parseInt(this.myForm.value.Body_type) || 0,
          check_digit: this.myForm.value.Check_digit?.toString() || null,
          country: parseInt(this.myForm.value.Country) || 0,
          displacement_CID: this.myForm.value.Displacement_CID?.toString() || null,
          displacement_Nominal: this.myForm.value.Displacement_Nominal?.toString() || null,
          displacement_SI: this.myForm.value.Displacement_SI?.toString() || null,
          driveline: this.myForm.value.Driveline?.toString() || null,
          engine_aspiration: this.myForm.value.Engine_aspiration?.toString() || null,
          engine_cylinders: this.myForm.value.Engine_cylinders?.toString() || null,
          engine_HorsePower: this.myForm.value.Engine_HorsePower?.toString() || null,
          engine_KiloWatts: this.myForm.value.Engine_KiloWatts?.toString() || null,
          engine_type: parseInt(this.myForm.value.Engine_type) || 0,
          engine_valves: this.myForm.value.Engine_valves?.toString() || null,
          fuel_type: parseInt(this.myForm.value.FuelTypeId) || 0,
          manufactured_in: this.myForm.value.Manufactured_in?.toString() || null,
          manufactured: parseInt(this.myForm.value.Manufacturer) || 0,
          model_year: this.myForm.value.Model_year?.toString() || null,
          note: this.myForm.value.Note?.toString() || null,
          number_of_doors: this.myForm.value.Number_of_doors?.toString() || null,
          region: this.myForm.value.Region,
          serial_number: this.myForm.value.Serial_number?.toString() || null,
          squise_VIN: '',
          transmission: parseInt(this.myForm?.value.Transmission) || 0,
          trim_level: this.myForm.value.Trim_level?.toString() || null,
          vds: this.myForm.value.VDS?.toString() || null,
          vehical_class: this.myForm.value.Vehicle_class?.toString() || null,
          vehical_type: this.myForm.value.Vehicle_type?.toString() || null,
          VIN_type: this.myForm.value.VIN_type?.toString() || null,
          VIS_identifier: this.myForm.value.VIS_identifier?.toString() || null,
          WMI: this.myForm.value.WMI?.toString() || null,
          year_identifier: this.myForm.value.Year_identifier?.toString() || null,
          model: parseInt(this.myForm.value.model) || 0,
          make: parseInt(this.myForm?.value.MakerId) || 0,
          engine_head: this.myForm?.value.Engine_head?.toString() || null,
          standard_equipment: this.convertArrayToString(this.myForm?.value.Standard_equipment),
          optional_equipment: this.convertArrayToString(this.myForm?.value.Optional_equipment),
          other_equipment: null
        }],
        vehVI_Data: this.imageNameArray,
        vinNum: this.vinNumber || this.myForm?.value.Entered_VIN || null
        // vehEquipData: [{
        //   id: 0,
        //   vehId: 0,
        //   equipmentId: 0
        // }]
      }
      console.log(data);
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `${token}`);
      this.isLoading = true;
      this.service.addCarV2(data, { headers }).subscribe((response: any) => {
        console.log("Add Car --", response);
        this.isLoading = false;
        if (response.status === 200) {
          this.service.notify.showSuccess(response.data.msg);
          if (this.isEditCar !== true) {
            this.router.navigate(['/deler']);
          }
        } else {
          this.service.notify.showSuccess(response.message);
        }
      }, (error) => {
        console.log(error);
        this.isLoading = false;
        if (error.error.status === 500) {
          if (error.error.data.statusCode === 209) {
            this.service.notify.showSuccess(error.error.data.msg);
          }
        }
        if (error.error.status === 429) {
          this.service.notify.showSuccess(error.error.message);
        }
      });
      // }
    } else {
      console.log(this.myForm.value, 'Form Not valid!!!');
      if (this.myForm.value.isNewVeh === null || this.myForm.value.isNewVeh === '' || this.myForm.value.isNewVeh === undefined) {
        return this.service.notify.showSuccess("Vehical Condition is required Property");
      }
      if (this.myForm.value.MakerId === null || this.myForm.value.MakerId === '' || this.myForm.value.MakerId === undefined) {
        return this.service.notify.showSuccess("Vehical Brand Name is required Property");
      }
      if (this.myForm.value.model === null || this.myForm.value.model === '' || this.myForm.value.model === undefined) {
        return this.service.notify.showSuccess("Vehical Model Name is required Property");
      }
      if (this.myForm.value.Manufacturer === null || this.myForm.value.Manufacturer === '' || this.myForm.value.Manufacturer === undefined) {
        return this.service.notify.showSuccess("Vehical Manufacturer is required Property");
      }
      if (this.myForm.value.Body_type === null || this.myForm.value.Body_type === '' || this.myForm.value.Body_type === undefined) {
        return this.service.notify.showSuccess("Vehical Body Type is required Property");
      }
      if (this.myForm.value.FuelTypeId === null || this.myForm.value.FuelTypeId === '' || this.myForm.value.FuelTypeId === undefined) {
        return this.service.notify.showSuccess("Vehical Fuel Type is required Property");
      }
      if (this.myForm.value.Body_style === null || this.myForm.value.Body_style === '' || this.myForm.value.Body_style === undefined) {
        return this.service.notify.showSuccess("Vehical Body Style is required Property");
      }
      if (this.myForm.value.Transmission === null || this.myForm.value.Transmission === '' || this.myForm.value.Transmission === undefined) {
        return this.service.notify.showSuccess("Vehical Transmission is required Property");
      }
      if (this.myForm.value.Engine_type === null || this.myForm.value.Engine_type === '' || this.myForm.value.Engine_type === undefined) {
        return this.service.notify.showSuccess("Vehical Engine Type is required Property");
      }
      if (this.myForm.value.Country === null || this.myForm.value.Country === '' || this.myForm.value.Country === undefined) {
        return this.service.notify.showSuccess("Country is required Property");
      }
      if (this.myForm.value.VehManufYear === null || this.myForm.value.VehManufYear === '' || this.myForm.value.VehManufYear === undefined) {
        return this.service.notify.showSuccess("Vehical Manufacture Year is required Property");
      }
      if (this.myForm.value.Color === null || this.myForm.value.Color === '' || this.myForm.value.Color === undefined) {
        return this.service.notify.showSuccess("Vehical Color is required Property");
      }
      if (this.myForm.value.VehShellPrice === null || this.myForm.value.VehShellPrice === '' || this.myForm.value.VehShellPrice === undefined) {
        return this.service.notify.showSuccess("Vehical Sell Price is required Property");
      }
    }
  }

  convertArrayToString(inputArray: any) {
    return inputArray.join(',');
  }

  dashboard() {
    this.router.navigate(['/dashboard']);
  }

  backToDelerPage() {
    if (this.RoleId === environment.delerRoleTypeId.toString()) {
      console.log("Yes");

      this.router.navigate(['/dashboard']);
    } else {
      console.log(this.RoleId);
      console.log(environment.delerRoleTypeId.toString());

      console.log("no");

      this.router.navigate(['/deler']);
    }
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

  logOut() {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

}
