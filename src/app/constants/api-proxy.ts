import { Injectable } from "@angular/core";
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root'
})

export class ApiProxy {
    user = {
        login(){
            return '/api/admin/login?lang=en'
        },
        addDeler(){
            return '/api/admin/addDealer?lang=en'
        },
        editDeler(){
            return '/api/admin/editDealerProfile?lang=en'
        },
        getAllDeler(){
            return '/api/admin/getuserList?lang=en'
        },
        getDealerById(){
            return '/api/admin/getDealerProfile?lang=en'
        },
        getDashboard(){
            return '/api/admin/getDashboard'
        },
        addCustomer(){
            return '/api/customer/userRegisteration?lang=en'
        },
        uploadCarPhoto(){
            return '/api/admin/uploadphoto/1'
        },
        uploadProfilePhoto(){
            return '/api/admin/uploadphoto/2'
        },
        uploadCarVideo(){
            return '/api/admin/uploadvideo/1'
        },
        uploadCarAdsPhoto(){
            return '/api/admin/uploadphoto/2'
        },
        uploadCarAdsVideo(){
            return '/api/admin/uploadvideo/2'
        },
        getVideo(thumb: any) {
            return `/api/open/getVideoUrl/2/${thumb}`
        },
        showVideo(name: any) {
            return `/api/open/getVideoUrl/1/${name}`
        },
        // thumb
        getImage(thumb: any) {
            return `/api/open/getPhotoUrl/2/${thumb}`
        },        
        getImageForProfilePic(thumb: any) {
            return `/api/open/getPhotoUrl/4/${thumb}`
        },
        // main image
        showImage(name: any) {
            return `/api/open/getPhotoUrl/1/${name}`
        },
        showImageForProfilePic(name: any) {
            return `/api/open/getPhotoUrl/3/${name}`
        },
        showAdsImages(name: any) {
            return `/other/thumb/${name}`
        },
        addNewSubscriptionPlan(){
            return '/api/admin/addNewSubscriptionPlan'
        },
        getAllSubScriptionPlan(){
            return '/api/admin/getAllSubScriptionPlan?lang=en'
        },
        searchVinNumber(){
            return '/api/admin/carSearch'
        },
        getListForDropDown(first: any, second: any) {
            return `/api/open/getMasters/${first}/${second}`
        },
        addCar() {
            return '/api/admin/addCar'
        },
        addCarV2() {
            return '/api/admin/V2/addCar'
        },
        getAllCar(){
            return '/api/customer/V2/getAllCar'
        },
        addPage(){
            return '/api/admin/addPage?lang=en'
        },
        getPage(name: any){
            return `/api/open/getPage/${name}?lang=en`
        },
        addAds(){
            return `/api/admin/addMobileAds?lang=en`
        },
        getAllAds(){
            return '/api/open/getMasters/0/-1'
        },
        getAllPermissions(){
            return '/api/open/getMasters/0/130'
        },
        getAllRoles(){
            return '/api/open/getMasters/0/150'
        },
        chnageSubscription(){
            return '/api/admin/addUserSubscription'
        },
        deleteImage(){
            return '/api/admin/deleteVI'
        },
        deleteCarById(){
            return '/api/admin/deleteCar'
        },
        getAllCountries(){
            return '/api/open/getMasters/0/40'
        },
        subscriptionHistory(){
            return '/api/admin/getUserSubscriptionList'
        },
        getTopDealer(){
            return '/api/admin/getTopDealer'
        },
        savePermission(){
            return '/api/admin/saveRolePermission'
        },
        addAdminUser(){
            return '/api/admin/addAdminUser'
        },
        getAdminUserList(){
            return '/api/admin/getAdminUserList'
        },
        getRolePermissionByRole(){
            return '/api/admin/getRolePermissionByRole'
        },
        getChartData(){
            return '/api/admin/getDashboardDetail'
        },
        getRolePermission(){
            return '/api/admin/getRolePermission'
        },
        getUserDetail(){
            return '/api/admin/getUserDetail'
        },
        getDealerInquiry(){
            return '/api/admin/getDealerInquiry'
        },
        removeUploadImage(){
            return '/api/admin/deleteAssets'
        },
        saveAdminInfo(){
            return '/api/admin/saveAdminInfo'
        },
        getAdminInfo() {
            return '/api/open/getMasters/0/160'
        },
        getAllOCR() {
            return '/api/admin/getScannedOCR'
        },
        updateOCRStatus() {
            return '/api/admin/updateScannedOCR?lang=en'
        }
        
    }
}