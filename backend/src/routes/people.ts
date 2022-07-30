import BaseRouter, { requestType } from './BaseRouter';
import ClaimsTypeController from "../controllers/ClaimsTypeController";
import RolesController from "../controllers/rolesController";
import PeopleController from "../controllers/PeopleController";
import HistoryController from "../controllers/HistoryController";

class People extends BaseRouter {
    constructor() {
        super();
        this.createHandleWithParams(requestType.GET, '/people/role/:id', PeopleController.getAll, {params: "id"});

    }
}

export default new People().router;
