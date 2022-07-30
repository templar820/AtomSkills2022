import BaseRouter, { requestType } from './BaseRouter';
import HistoryController from "../controllers/HistoryController";

class HistoryRouter extends BaseRouter {
    constructor() {
        super();
        // this.router
        this.createHandleWithParams(requestType.GET, '/history/claim/:id', HistoryController.getAll, {params: "id"});
        this.createHandleWithParams(requestType.GET, '/history', HistoryController.getOne);
    }
}

export default new HistoryRouter().router;
