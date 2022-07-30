import BaseRouter, { requestType } from './BaseRouter';
import ClaimsTypeController from "../controllers/ClaimsTypeController";

class ClaimTypeRouter extends BaseRouter {
    constructor() {
        super();
        this.generateCrud('/claim-type', ClaimsTypeController);
    }
}

export default new ClaimTypeRouter().router;
