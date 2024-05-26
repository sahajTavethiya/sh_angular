// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  // local
  // apiUrl: 'http://51.91.200.130:804/api/v1',
  // apiUrl: 'http://103.251.94.95:806/api/v1',
   
 apiUrl: 'http://localhost:3000',
 oldUrl: 'http://localhost:3000',
// apiUrl: 'https://api.shreeharienterprise.co.in',
// oldUrl: 'https://api.shreeharienterprise.co.in/home',

//  apiUrl: 'http://3.109.185.155:3001',
//  oldUrl: 'http://3.109.185.155:3001',

  ManufactureWorkTypeId : 2,
  supervisorrole: '9',
  ResourceMasterIds: {
    MaterialMaster: 1,
    BulkUploadMeterDetails: 2,
    CustomerManageCustomer: 3,
    CustomerManageMeterNumbers: 4,
    CustomerBulkUpload: 5,
    CustomerManageCustomerAcquisition: 6,
    ServiceRequestsServiceRequests: 7,
    ServiceRequestsBulkUpload: 8,
    ServiceRequestsBulkUploadCallDetails: 9,
    ServiceRequestsChangeSRStatus: 10,
    ServiceRequestsCompleteServiceRequests: 11,
    MDPEWorkFlow: 12,
    LocationReportsViewManpowerLocation: 13,
    LocationReportsViewManpowerLocationDetails: 14,
    ReportsHelpdeskSR1: 15,
    ReportsAttendanceReport: 16,
    ReportsDPRNGConversion: 17,
    ReportsDPRRFCTracker: 18,
    ReportsPETrackerReport: 19,
    ReportsCallCenterReport: 20,
    ReportsTicketClosureReport: 21,
    ReportsManpowerPerformanceReport: 22,
    ReportsBillingReport: 23,
    ReportsIncompleteSRStatusReport: 24,
    ReportsTATReport: 25,
    ReportsProjectReport: 26,
    ReportsMaterialReceiptReport: 27,
    ReportsMaterialIssue: 28,
    ReportsMaterialReturn: 29,
    ReportsConsumptionReport: 30,
    ReportsStockReport: 31,
    ReportsContractorReconciliationReport: 32,
    ReportsdailyProgressReport: 33,
    ReportsMaterialRequisitionReport: 34,
    ReportsMaterialTrasnferReport: 35,
    Company: 36,
    ManageClient: 37,
    ServiceMaster: 38,
    ServiceCategory: 39,
    ServiceSubCategory: 40,
    MaterialCategoryMaster: 41,
    ControlRoomMaster: 42,
    SiteMaster: 43,
    ContractMaster: 44,
    ZoneMaster: 45,
    ManageUser: 46,
    ManpowerMaster: 47,
    RoleMaster: 60,
    MaterialRequisitionPlaningMaterialRequisition: 61,
    PurchaseOrder: 62,
    ContractService_ContractorMaste_WorkOrder: 63,
    ContractService_WotkOrder: 64,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

