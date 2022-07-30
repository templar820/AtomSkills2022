import BaseRouter, { requestType } from './BaseRouter';
import PriorityBoilerplate from "../controllers/PriorityBoilerplate";

class PriorityRouter extends BaseRouter {
    constructor() {
        super();
        this.generateCrud('/priority', PriorityBoilerplate);
    }
}

export default new PriorityRouter().router;
