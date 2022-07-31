import BaseService from "./BaseService";
import {ClaimsType, Priority, User, UserRole, UsersClaimsType} from "../models/DbModel";
import db from '../db';

class PeopleService extends BaseService {
    constructor() {
        super(User);
    }
    async getAll() {
        return await this.model.findAll({include: [{model: UserRole, as: 'role'}]});
    }
    async getAllByRole(id) {
        return await this.model.findAll({where: {id_role_user: id}});
    }

    async createClaimsRelations(body) {
        await UsersClaimsType.destroy({where: {userId: body.userId}});
        return await UsersClaimsType.bulkCreate(body.claimTypeIds.map((e) => ({userId: body.userId, claimTypeId: e})));
    }

    async getClaimsRelationsByUser(id) {
        const res =  await db.query(`SELECT * FROM claims_types LEFT JOIN users_claim_types uct on claims_types.id = uct."claimTypeId" WHERE uct."userId" = ${id}`);
        return res[1]?.rows
    }

    async getAllByClaimType(id) {
        const res = await db.query(`SELECT DISTINCT(us."userId"), ct.name, ct.email, ct.surname from users_claim_types as us LEFT JOIN users ct on ct.id = us."userId" WHERE us."claimTypeId"=${id}`);
        return res[1]?.rows;
    }
}

export default new PeopleService()
