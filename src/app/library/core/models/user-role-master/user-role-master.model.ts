import { prop } from "@rxweb/reactive-form-validators";
export class UserRoleMasterModel {
    constructor(container?: UserRoleMasterModel) {

        if (container) {
            this.roleName = container.roleName;
            this.roleDescription = container.roleDescription;
            this.roleId = container.roleId;
            this.status = container.status;

        }
    }

    @prop()
    roleName: string | null;
    @prop()
    roleDescription: string | null;
    @prop()
    status: number | null ;
    @prop()
    roleId: number | null;
}