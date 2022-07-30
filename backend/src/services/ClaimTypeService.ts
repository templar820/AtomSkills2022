import BaseService from "./BaseService";
import {Claims, ClaimsType, Sla, UserRole} from "../models/DbModel";

class ClaimTypeService extends BaseService {
    constructor() {
        super(ClaimsType);
    }
}

export default new ClaimTypeService()
