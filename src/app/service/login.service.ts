import { Injectable, Injector } from '@angular/core';
import { environment } from '../environment/environment';
import { ApiProxy } from '../constants/api-proxy';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { NotificatonService } from './notification/notificaton.service';
// import '../../assets/js/'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = environment.url;
  UrlForCarImage: any = environment.CDN_URL;
  notify: NotificatonService;
  private countriesUrl = 'assets/js/CountryCodes.json';

  constructor(private http: HttpClient, private api: ApiProxy, injector: Injector) {
    this.notify = injector.get(NotificatonService);
  }

  login(data: any) {
    let url = this.apiUrl + this.api.user.login();
    return this.http.post(url, data);
  }
  addDeler(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.addDeler();
    return this.http.post(url, data, headers);
  }
  editDeler(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.editDeler();
    return this.http.post(url, data, headers);
  }
  getDashboard(headers: any) {
    let url = this.apiUrl + this.api.user.getDashboard();
    return this.http.get(url, headers)
  }
  getAllDeler(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getAllDeler();
    return this.http.post(url, data, headers);
  }
  getDealerById(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getDealerById();
    return this.http.post(url, data, headers);
  }
  addCustomer(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.addCustomer();
    return this.http.post(url, data, headers);
  }
  uploadCarPhoto(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.uploadCarPhoto();
    return this.http.post(url, data, headers);
  }
  uploadDelearProfilePhoto(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.uploadProfilePhoto();
    return this.http.post(url, data, headers);
  }
  getImageForProfilePic(thumb: any) {
    let url = this.apiUrl + this.api.user.getImageForProfilePic(thumb);
    return this.http.get(url);
  }
  uploadCarVideo(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.uploadCarVideo();
    return this.http.post(url, data, headers);
  }
  uploadCarAdsPhoto(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.uploadCarAdsPhoto();
    return this.http.post(url, data, headers);
  }
  uploadCarAdsVideo(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.uploadCarAdsVideo();
    return this.http.post(url, data, headers);
  }
  getVideo(thumb: any) {
    let url = this.apiUrl + this.api.user.getVideo(thumb);
    return this.http.get(url);
  }
  showVideo(thumb: any) {
    let url = this.apiUrl + this.api.user.showVideo(thumb);
    return this.http.get(url);
  }
  showImageForProfilePic(thumb: any) {
    let url = this.apiUrl + this.api.user.showImageForProfilePic(thumb);
    return this.http.get(url);
  }
  showAdsImages(thumb: any, headers: any) {
    let url = this.UrlForCarImage + this.api.user.showAdsImages(thumb);
    return this.http.get(url, headers);
  }
  getImage(thumb: any) {
    let url = this.apiUrl + this.api.user.getImage(thumb);
    return this.http.get(url);
  }
  showImage(thumb: any) {
    let url = this.apiUrl + this.api.user.showImage(thumb);
    return this.http.get(url);
  }
  addNewSubscriptionPlan(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.addNewSubscriptionPlan();
    return this.http.post(url, data, headers);
  }
  getAllSubScriptionPlan(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getAllSubScriptionPlan();
    return this.http.post(url, data, headers);
  }
  searchVinNumber(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.searchVinNumber();
    return this.http.post(url, data, headers);
  }
  getListForDropDown(first: any, second: any, headers: any) {
    let url = this.apiUrl + this.api.user.getListForDropDown(first, second);
    return this.http.get(url, headers);
  }
  addCarV2(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.addCarV2();
    return this.http.post(url, data, headers);
  }
  getAllCar(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getAllCar();
    return this.http.post(url, data, headers);
  }
  addPage(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.addPage();
    return this.http.post(url, data, headers);
  }
  getPage(name: any, headers: any) {
    let url = this.apiUrl + this.api.user.getPage(name);
    return this.http.get(url, headers);
  }
  addAds(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.addAds();
    return this.http.post(url, data, headers);
  }
  getAllAds(headers: any) {
    let url = this.apiUrl + this.api.user.getAllAds();
    return this.http.get(url, headers);
  }
  chnageSubscription(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.chnageSubscription();
    return this.http.post(url, data, headers);
  }
  deleteImage(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.deleteImage();
    return this.http.post(url, data, headers);
  }
  deleteCarById(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.deleteCarById();
    return this.http.post(url, data, headers);
  }
  // getCountriesCode(): Observable<any[]> {
  //   return this.http.get<any[]>(this.countriesUrl);
  // }
  getCountriesCode(): Observable<any[]> {
    return this.http.get<any[]>(this.countriesUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching countries:', error);
        return throwError(error);
      })
    );
  }
  getAllCountries() {
    let url = this.apiUrl + this.api.user.getAllCountries();
    return this.http.get(url);
  }
  subscriptionHistory(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.subscriptionHistory();
    return this.http.post(url, data, headers);
  }
  getTopDealer(headers: any) {
    let url = this.apiUrl + this.api.user.getTopDealer();
    return this.http.get(url, headers);
  }
  getAllPermissions(headers: any) {
    let url = this.apiUrl + this.api.user.getAllPermissions();
    return this.http.get(url, headers);
  }
  savePermission(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.savePermission();
    return this.http.post(url, data, headers);
  }
  getAllRoles(headers: any) {
    let url = this.apiUrl + this.api.user.getAllRoles();
    return this.http.get(url, headers);
  }
  addAdminUser(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.addAdminUser();
    return this.http.post(url, data, headers);
  }
  getAdminUserList(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getAdminUserList();
    return this.http.post(url, data, headers);
  }
  getRolePermissionByRole(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getRolePermissionByRole();
    return this.http.post(url, data, headers);
  }
  getChartData(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getChartData();
    return this.http.post(url, data, headers);
  }
  getloggdUserPermission(headers: any) {
    let url = this.apiUrl + this.api.user.getRolePermission();
    return this.http.get(url, headers);
  }
  getUserDetail(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getUserDetail();
    return this.http.post(url, data, headers);
  }
  getDealerInquiry(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getDealerInquiry();
    return this.http.post(url, data, headers);
  }
  removeUploadImage(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.removeUploadImage();
    return this.http.post(url, data, headers);
  }
  saveAdminInfo(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.saveAdminInfo();
    return this.http.post(url, data, headers);
  }
  getAdminInfo(headers: any) {
    let url = this.apiUrl + this.api.user.getAdminInfo();
    return this.http.get(url, headers);
  }
  getAllOCR(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.getAllOCR();
    return this.http.post(url, data, headers);
  }
  updateOCRStatus(data: any, headers: any) {
    let url = this.apiUrl + this.api.user.updateOCRStatus();
    return this.http.post(url, data, headers);
  }



  private RolePermission = new BehaviorSubject<any>(null);
  saveDataForRolePermission(data: any) {
    this.RolePermission.next(data);
  }
  getDataOfRolePermission(): Observable<any> {
    return this.RolePermission.asObservable();
  }

  private dataSubject = new BehaviorSubject<any>(null);
  sendDataToAddSubscriptionComp(data: any) {
    this.dataSubject.next(data);
  }
  getDataFromSubscriptionComp(): Observable<any> {
    return this.dataSubject.asObservable();
  }
}
