import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { DelerDetailsComponent } from './components/deler-details/deler-details.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { AddDelerComponent } from './components/deler-details/add-deler/add-deler.component';
import { AddSubscriptionComponent } from './components/subscription/add-subscription/add-subscription.component';
import { CustomerDetailsComponent } from './components/customer-details/customer-details.component';
// import { DelerCarDetailComponent } from './components/deler-details/deler-car-detail/deler-car-detail.component';
import { AddCarComponent } from './components/deler-details/add-car/add-car.component';
import { PtivatePolicyComponent } from './components/policy/ptivate-policy/ptivate-policy.component';
import { TermsAndCondtionComponent } from './components/policy/terms-and-condtion/terms-and-condtion.component';
// import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { AddAdsComponent } from './components/add-ads/add-ads.component';
import { AddCustomerComponent } from './components/customer-details/add-customer/add-customer.component';
import { DealerDeatilsByIdComponent } from './components/deler-details/dealer-deatils-by-id/dealer-deatils-by-id.component';
import { CustomerDetailsByIdComponent } from './components/customer-details/customer-details-by-id/customer-details-by-id.component';
import { DealerDashboardComponent } from './dealerPanel/dealer-dashboard/dealer-dashboard.component';
import { DealerProfileComponent } from './dealerPanel/dealer-profile/dealer-profile.component';
import { UpdateDealerComponent } from './dealerPanel/dealer-profile/update-dealer/update-dealer.component';
import { CarInventoryComponent } from './dealerPanel/car-inventory/car-inventory.component';
import { DealerSubscriptionHistoryComponent } from './dealerPanel/dealer-subscription-history/dealer-subscription-history.component';
import { UserPermissionComponent } from './components/user-permission/user-permission.component';
import { AddUserRoleComponent } from './components/user-permission/add-user-role/add-user-role.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { AddUserManagementComponent } from './components/user-management/add-user-management/add-user-management.component';
import { CarInquiryComponent } from './dealerPanel/car-inquiry/car-inquiry.component';
import { AdminInfoComponent } from './components/admin-info/admin-info.component';
import { ActiveCarListComponent } from './dealerPanel/dealer-dashboard/active-car-list/active-car-list.component';
import { ActiveCarListAdminComponent } from './components/dashboard/active-car-list-admin/active-car-list-admin.component';
import { OcrListComponent } from './components/ocr-list/ocr-list.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'dealer_dashboard',
        component: DealerDashboardComponent
    },
    {
        path: 'deler',
        // path: 'dealer',
        component: DelerDetailsComponent
    },
    {
        path: 'addDeler',
        component: AddDelerComponent
    },
    {
        path: 'editDeler/:id',
        component: AddDelerComponent
    },
    {
        path: 'customer_detail',
        component: CustomerDetailsComponent
    },
    {
        path: 'subscription',
        component: SubscriptionComponent
    },
    {
        path: 'add_plan',
        component: AddSubscriptionComponent
    },
    {
        path: 'edit_plan/:id',
        component: AddSubscriptionComponent
    },
    {
        path: 'add_car',
        component: AddCarComponent
    },
    // {
    //     path: 'carDetail',
    //     component: DelerCarDetailComponent
    // },
    {
        path: 'privatepolicy',
        component: PtivatePolicyComponent
    },
    {
        path: 'terms_and',
        component: TermsAndCondtionComponent
    },
    // {
    //     path: 'privacy_policy',
    //     component: PrivacyPolicyComponent
    // },
    {
        path: 'addAds',
        component: AddAdsComponent
    },
    {
        path: 'update_user',
        component: AddCustomerComponent
    },
    {
        path: 'dealer_details',
        component: DealerDeatilsByIdComponent
    },
    {
        path: 'customer_profile',
        component: CustomerDetailsByIdComponent
    },
    {
        path: 'dealer_profile',
        component: DealerProfileComponent
    },
    {
        path: 'update_dealer',
        component: UpdateDealerComponent
    },
    {
        path: 'car_inventory',
        component: CarInventoryComponent
    },
    {
        path: 'subscription_history',
        component: DealerSubscriptionHistoryComponent
    },
    {
        path: 'user_permission',
        component: UserPermissionComponent
    },
    {
        path: 'add_user_role',
        component: AddUserRoleComponent
    },
    {
        path: 'user_management',
        component: UserManagementComponent
    },
    {
        path: 'add_user_management',
        component: AddUserManagementComponent
    },
    {
        path: 'car_inquiry',
        component: CarInquiryComponent
    },
    {
        path: 'admin_info',
        component: AdminInfoComponent
    },
    {
        path: 'active_car_list',
        component: ActiveCarListComponent
    },
    {
        path: 'active_all_car_list',
        component: ActiveCarListAdminComponent
    },
    {
        path: 'ocr_list',
        component: OcrListComponent
    }
];
