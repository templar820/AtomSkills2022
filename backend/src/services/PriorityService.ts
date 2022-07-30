import BaseService from "./BaseService";
import {Priority, UserRole} from "../models/DbModel";

class PriorityService extends BaseService {
    constructor() {
        super(Priority);
    }
}

export default new PriorityService()
