import BaseService from "./BaseService";
import {UserRole} from "../models/DbModel";

class RoleService extends BaseService {
    constructor() {
        super(UserRole);
    }
}

export default new RoleService()
