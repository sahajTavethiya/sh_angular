import { prop } from '@rxweb/reactive-form-validators';

export class AddVendorDownModel {
  constructor(etl?: AddVendorDownModel) {
    if (etl) {
      this.name = etl.name;
      this.email = etl.email;
      this.address = etl.address;
      this.mobileNo = etl.mobileNo;
      this.bankName = etl.bankName;
      this.GST_No = etl.GST_No;
      this.account_Name = etl.account_Name;
      this.accountNo = etl.accountNo;
      this.IFSC_No = etl.IFSC_No;
      this.isActive = etl.isActive;
      this.createdBy = etl.createdBy;
    }
  }
  @prop()
  name: string;
  @prop()
  email: string;
  @prop()
  address: string;
  @prop()
  mobileNo: string;
  @prop()
  bankName: string;
  @prop()
  GST_No: string;
  @prop()
  account_Name: string;
  @prop()
  accountNo: string;
  @prop()
  IFSC_No: string;
  @prop()
  isActive: boolean;
  @prop()
  createdBy: number;
}
