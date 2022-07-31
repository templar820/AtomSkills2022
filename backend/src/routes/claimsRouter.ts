import BaseRouter, {requestType} from './BaseRouter';
import ClaimsController from "../controllers/ClaimsController";

class ClaimsRouter extends BaseRouter {
    constructor() {
        super();
        this.createHandleWithBody(requestType.POST, '/claims/auto-distribution-claims', ClaimsController.autoDistribution)
        this.generateCrud('/claims', ClaimsController);
    }
}

export default new ClaimsRouter().router;
