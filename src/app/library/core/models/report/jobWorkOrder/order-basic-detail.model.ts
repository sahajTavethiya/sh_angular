import { prop, propArray } from "@rxweb/reactive-form-validators";
import { SubmitPartiallyOrderModel } from "../../submit-partially-order.model";
import { JObWorkProductDetail } from "./product-detail.model";

export class JobWorkOrderModel {
    constructor(etl?: JobWorkOrderModel) {
        this.SubmitPartiallyOrderModel = new Array<SubmitPartiallyOrderModel>();
        this.JobWorkProductDetail = new Array<JObWorkProductDetail>();
        if (etl) {
            this.ClientId = etl.ClientId;
            this.BillNo = etl.BillNo;
            this.StatusId = etl.StatusId;
            this.isGst = etl.isGst;
            this.HSN_Code = etl.HSN_Code;
            if (etl.SubmitPartiallyOrderModel && etl.SubmitPartiallyOrderModel.length > 0) {
                etl.SubmitPartiallyOrderModel.forEach(etl => {
                    this.SubmitPartiallyOrderModel.push(new SubmitPartiallyOrderModel(etl));
                });
            }
            if (etl.JobWorkProductDetail && etl.JobWorkProductDetail.length > 0) {
                etl.JobWorkProductDetail.forEach(etl => {
                    this.JobWorkProductDetail.push(new JObWorkProductDetail(etl));
                });
            }
        }else{
            // this.DesignId = 0;
        }
    }

    @prop()
    WorkTypeId: number;
    // @prop()
    // DesignId: number;
    @prop()
    ClientId: string;
    // @prop()
    // ProductId: number
    // @prop()
    // SizeId: number;
    @prop()
    BillNo: string;
    // @prop()
    // TotalItem: String;
    // @prop()
    // AmountPerOneItem: string;
    @prop()
    StatusId: number;
    @prop()
    HSN_Code: string;
    @prop()
    isGst: string;
    // @prop()
    // UOM: number;
    // @prop()
    // Vendor: number;

    @propArray(SubmitPartiallyOrderModel)
    SubmitPartiallyOrderModel: Array<SubmitPartiallyOrderModel>;
    @propArray(JObWorkProductDetail)
    JobWorkProductDetail: Array<JObWorkProductDetail>;

}