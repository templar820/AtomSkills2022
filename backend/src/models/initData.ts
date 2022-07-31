import {
    ClaimsType,
    ClaimTypePriority,
    ClaimTypeSla, ClaimTypeSlaPriority,
    Priority,
    Sla,
    State,
    User,
    UserRole,
    UsersClaimsType
} from './DbModel';
import constants from '../config/CONSTANT';
import { Roles } from './interfaces';
import {CLAIM_TYPE_SLA} from "../config/claimTypeSla";

export const DEFAULT_STATE = {
    name_state: 'pending_processing',
    caption_state: 'в ожидании обработки'
}

const initData = async () => {
    const operator = await UserRole.create({'name_role': Roles.OPERATOR, 'caption_role': 'Оператор'}, {returning: true});
    const company = await UserRole.create({'name_role': Roles.COMPANY, 'caption_role': 'Представитель компании'}, {returning: true});
    const admin = await UserRole.create({'name_role': Roles.ADMIN, 'caption_role': 'Админ'}, {returning: true})
    const serviceManager = await UserRole.create({'name_role': Roles.SERVICEMANAGER, 'caption_role': 'Сервис менеджер'}, {returning: true})
    try {
        await User.create({
            name: 'Петр', login: "operator", surname: 'Яков', password: constants.LOGIN_PASSWORD, id_role_user: operator.dataValues.id
        });
        await User.create({
            name: 'Ян', surname: 'Букин', login: "company", password: constants.LOGIN_PASSWORD, id_role_user: company.dataValues.id
        });
        await User.create({
            name: 'Владимир', surname: 'Киркоров', login: "admin", password: constants.LOGIN_PASSWORD, id_role_user: admin.dataValues.id
        });
        await User.create({
            name: 'Джон', surname: 'Уик', login: "servicemanager", password: constants.LOGIN_PASSWORD, id_role_user: serviceManager.dataValues.id
        });
    } catch (e) {
        console.error('Ошибка при создании пользователей', e);
    }

    // temporary hardcode

    try {
        for(let typeClaim of CLAIM_TYPE_SLA) {
            for (let slaPriority of typeClaim.slaPriority) {
                const sla = await Sla.findOne({where: {name_sla: slaPriority.sla}});
                const priority = await Priority.findOne({where: {name_priority: slaPriority.priority}});
                await ClaimTypeSlaPriority.create({claimTypeId: typeClaim.claimTypeId, slaId: sla.id, priorityId: priority.id});
            }
        }
    } catch (e) {
        console.error('Ошибка при создании claimTypeSla relations', e)
    }

    const firstStep = await State.findOne({where: {name_state: DEFAULT_STATE.name_state}});
    if (!firstStep) {
        await State.create(DEFAULT_STATE);
    }
}

export default initData;
