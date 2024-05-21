import { prop } from "@rxweb/reactive-form-validators";

export class SubmitPartiallyOrderModel {
    constructor(etl?: SubmitPartiallyOrderModel) {

        if (etl) {
            this.tblId = etl.tblId
            this.QTY = etl.QTY;
            this.submitedOn = etl.submitedOn;
            this.note = etl.note;
            this.isDelete = etl.isDelete;
            this.createdBy = etl.createdBy;
            this.isItCompleted = etl.isItCompleted;
        }else{

        }
    }

    @prop()
    tblId: number;
    @prop()
    submitedOn: Date; 
    @prop()
    createdOn : Date;  
    @prop()
    QTY: number;
    @prop()
    note:string;
    @prop()
    isDelete:number;
    @prop()
    createdBy: string;
    @prop()
    isItCompleted:number
}