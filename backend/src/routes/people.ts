import BaseRouter, { requestType } from './BaseRouter';
import PeopleController from "../controllers/PeopleController";

class People extends BaseRouter {
    constructor() {
        super();
        this.generateCrud('/people', PeopleController);
        this.createHandleWithParams(requestType.GET, '/people/role/:id', PeopleController.getAllByRole, {params: "id"});
        this.createHandleWithBody(requestType.POST, '/people/sendMail', PeopleController.send_mail);
        this.createHandleWithBody(requestType.POST, '/people/claims-relation', PeopleController.createClaimsRelations);
        this.createHandleWithParams(requestType.GET, '/people/claims-relation/:id', PeopleController.getClaimsRelations, {params: "id"});
        this.createHandleWithParams(requestType.GET, '/people/claim-type/:id', PeopleController.getAllByClaimType, {params: "id"})
    }
}

export default new People().router;
