import BaseService from "./BaseService";
import {Claims, ClaimsType, Priority, Sla, State, User, UserRole, History} from "../models/DbModel";

class ClaimsService extends BaseService {
    constructor() {
        super(Claims);
    }

    async update(model) {
        const current = this.model.findOne({where: {id: model.id}});
        if (current.id_state !== model.id_state) {
          await History.create({id_state: model.id_state, date_start: model.create_date, date_end: model.date_time_edit_state, id_claim: model.id, comment: model.comment});
        }
        return await this.model.update(model, { where: { id: model.id } });
    }

    async getAll() {
        return await this.model.findAll({
            include: [{
                model: ClaimsType, as: 'claim_type'
            },
                {
                    model: State, as: 'state_of_claims'
                },
                {
                    model: User, as: 'executor_of_claims'
                },
                {
                    model: User, as: 'author_of_claims'
                },
                {
                    model: Priority, as: 'priority_of_claims'
                }
            ]
        });
    }

    async getOne(id: number) {
        return await this.model.findOne({ where: { id }, include: [{
                model: ClaimsType, as: 'claim_type'
            },
                {
                    model: State, as: 'state_of_claims'
                },
                {
                    model: User, as: 'executor_of_claims'
                },
                {
                    model: User, as: 'author_of_claims'
                },
                {
                    model: Priority, as: 'priority_of_claims'
                }
            ] });
    }
}

export default new ClaimsService()
