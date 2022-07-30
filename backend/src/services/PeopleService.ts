import BaseService from "./BaseService";
import {Priority, User} from "../models/DbModel";

class PeopleService extends BaseService {
    constructor() {
        super(User);
    }
    async getAll(id) {
        return await this.model.findAll({where: {id_role_user: id}});
    }
}

export default new PeopleService()
