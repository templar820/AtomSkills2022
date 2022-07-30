import BaseService from "./BaseService";
import {Priority, State} from "../models/DbModel";

class StateService extends BaseService {
    constructor() {
        super(State);
    }
}

export default new StateService()
