import BaseService from "./BaseService";
import {Sla, UserRole} from "../models/DbModel";

class SlaService extends BaseService {
    constructor() {
        super(Sla);
    }
}

export default new SlaService()
