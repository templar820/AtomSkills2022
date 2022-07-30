import BaseRouter, { requestType } from './BaseRouter';
import StateController from "../controllers/StateController";

class StateRouter extends BaseRouter {
    constructor() {
        super();
        this.generateCrud('/state', StateController);
    }
}

export default new StateRouter().router;
