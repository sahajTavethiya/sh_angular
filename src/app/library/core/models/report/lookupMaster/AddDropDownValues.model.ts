import { prop } from "@rxweb/reactive-form-validators";

export class AddDropDownModel {
    constructor(etl?: AddDropDownModel) {

        if (etl) {
            this.product = etl.product;
            this.colour = etl.colour;
            this.hsn_Code = etl.hsn_Code;
            this.percentage = etl.percentage;
            this.design = etl.design;
            this.size = etl.size;
            }
    }
    @prop()
    product: string;
    @prop()
    colour: string;
    @prop()
    hsn_Code: number;
    @prop()
    percentage: number;
    @prop()
    design : string;
    @prop()
    size : string;
}