import BaseService from "./BaseService";
import {Priority, History, State, Claims} from "../models/DbModel";

class HistoryService extends BaseService {
    constructor() {
        super(History);
    }

    async getAll(id) {
        return await this.model.findAll({where: {id_claim: id}, include: [
                {model: Claims, as: 'claims_of_history'},
                {model: State, as: 'state_of_history'},
            ]});
    }
}

export default new HistoryService()
