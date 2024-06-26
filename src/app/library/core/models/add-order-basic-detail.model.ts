import { prop, propArray } from "@rxweb/reactive-form-validators";
import { SubmitPartiallyOrderModel } from "./submit-partially-order.model";

export class AddOrderBasicDetail {
    constructor(etl?: AddOrderBasicDetail) {
        this.SubmitPartiallyOrderModel = new Array<SubmitPartiallyOrderModel>();
        if (etl) {
            this.WorkTypeId = etl.WorkTypeId;
            this.DesignId = etl.DesignId;
            this.ClientId = etl.ClientId;
            this.ProductId = etl.ProductId;
            this.SizeId = etl.SizeId;
            this.BillNo = etl.BillNo;
            this.TotalItem = etl.TotalItem;
            this.AmountPerOneItem = etl.AmountPerOneItem;
            this.StatusId = etl.StatusId;
            this.HSN_Code = etl.HSN_Code;
            this.Qty = etl.Qty;
            this.UOM = etl.UOM;
            this.Vendor = etl.Vendor;
            if (etl.SubmitPartiallyOrderModel && etl.SubmitPartiallyOrderModel.length > 0) {
                etl.SubmitPartiallyOrderModel.forEach(etl => {
                   // etl.rowStatus = 2;
                    this.SubmitPartiallyOrderModel.push(new SubmitPartiallyOrderModel(etl));
                });
            }
        }else{
            this.DesignId = 0;
        }
    }

    @prop()
    WorkTypeId: number;
    @prop()
    DesignId: number;
    @prop()
    ClientId: string;
    @prop()
    ProductId: number
    @prop()
    SizeId: number;
    @prop()
    BillNo: string;
    @prop()
    TotalItem: String;
    @prop()
    AmountPerOneItem: string;
    @prop()
    StatusId: number;
    @prop()
    HSN_Code: string;
    @prop()
    Qty: number;
    @prop()
    UOM: number;
    @prop()
    Vendor: number;

    @propArray(SubmitPartiallyOrderModel)
    SubmitPartiallyOrderModel: Array<SubmitPartiallyOrderModel>;
}