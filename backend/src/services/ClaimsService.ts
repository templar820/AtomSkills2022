import BaseService from "./BaseService";
import {
  Claims,
  ClaimsType,
  Priority,
  Sla,
  State,
  User,
  UserRole,
  History,
  ClaimSla,
  ClaimTypeSlaPriority, send
} from "../models/DbModel";
import {DEFAULT_STATE} from "../models/initData";
import {getSla} from "../utils/getSla";
import prioriy from "../routes/prioriy";

class ClaimsService extends BaseService {
  constructor() {
    super(Claims);
  }

  async update(model) {
    const current = this.model.findOne({ where: { id: model.id } });
    if (current.id_state !== model.id_state) {
      await History.create({
        id_state: model.id_state, date_start: model.create_date, date_end: model.date_time_edit_state, id_claim: model.id, comment: model.comment, userId: model.userId
      });
      send(current);
    }
    return await this.model.update(model, { where: { id: model.id }, individualHooks: true });
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
    return await this.model.findOne({
      where: { id },
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

    async create(model) {
        if (!model.id_state) {
            const defaultState = await State.findOne({where: {name_state: DEFAULT_STATE.name_state}});
            model.id_state = defaultState.id;
            await History.create({id_state: model.id_state, date_start: model.create_date, date_end: model.date_time_edit_state, id_claim: model.id, comment: model.comment, userId: model.userId});
        }
        const claim = await this.model.create(model);
        // await this.updateSla(claim.dataValues);
        return claim;
    }

    async updateSla(claim, isCalculateSpent?) {
        try {
            const claimsSla = await ClaimTypeSlaPriority.findAll({ raw: true});
            console.log(claimsSla)
            const deadline = getSla(claimsSla, claim);
            await ClaimSla.upsert({deadline, claimId: claim.id}, {where: {claimId: claim.id}});
            return Promise.resolve()
        } catch (e) {
            console.log(e)
        }
    }

    async autoDistribution() {

    }
}

export default new ClaimsService();
