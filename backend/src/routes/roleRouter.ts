import BaseRouter, { requestType } from './BaseRouter';
import ClaimsTypeController from "../controllers/ClaimsTypeController";
import RolesController from "../controllers/rolesController";

class RoleRouter extends BaseRouter {
    constructor() {
        super();
        this.generateCrud('/role', RolesController);
    }
}

export default new RoleRouter().router;
