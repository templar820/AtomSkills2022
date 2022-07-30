import BaseRouter, { requestType } from './BaseRouter';
import SlaController from "../controllers/SlaController";

class SlaRouter extends BaseRouter {
    constructor() {
        super();
        this.generateCrud('/sla', SlaController);
    }
}

export default new SlaRouter().router;
