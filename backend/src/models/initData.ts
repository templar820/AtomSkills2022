import {User, UserRole} from './DbModel';
import constants from '../config/CONSTANT';
import {Roles} from "./interfaces";

const initData = async () => {
    const operator = await UserRole.create({'name_role': Roles.OPERATOR, 'caption_role': 'Оператор'}, {returning: true});
    const company = await UserRole.create({'name_role': Roles.COMPANY, 'caption_role': 'Представитель компании'}, {returning: true});
    const admin = await UserRole.create({'name_role': Roles.ADMIN, 'caption_role': 'Админ'}, {returning: true})
    try {
        await User.create({email: 'operator', name: 'Петр', surname: 'Яков', password: constants.LOGIN_PASSWORD, id_role_user: operator.dataValues.id});
        await User.create({email: 'company', name: 'Ян', surname: 'Букин',password: constants.LOGIN_PASSWORD, id_role_user: company.dataValues.id});
        await User.create({email: 'admin', name: 'Владимир', surname: 'Киркоров',password: constants.LOGIN_PASSWORD, id_role_user: admin.dataValues.id});
    } catch (e) {
        console.error('Ошибка при создании пользователей')
    }
}

export default initData;
