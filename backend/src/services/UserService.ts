import bcrypt from 'bcrypt';
import { User, UserDetails, UserRole } from '../models/DbModel';
import db from '../db';
import BaseService from './BaseService';
import { ServerError } from '../middleware/errorHandler';

class UserService extends BaseService {
  async create({
    login, password, role = 1, surname, name, patronymic
  }) {
    return await User.create({
      surname, name, patronymic,
      login, password, id_role_user: role
    });
  }

  async update(model) {
    return await User.update(model, { where: { id: model.id } });
  }

  async loginUser(user) {
    const dbUser = await User.findOne({ where: { login: user.login } });
    if (!dbUser) return null;

    return await this.checkPassword(user.password, dbUser.password) ? dbUser : null;
  }

  getPassword = async (password) => await bcrypt.hash(password, 10)

  checkPassword = async (password, passwordHash) => await bcrypt.compare(password, passwordHash)

  async getAll() {
    return await User.findAll({
      include: [{
        model: UserDetails,
        as: UserDetails.name,
        required: true,
      },
      {
        model: UserRole,
        as: 'role',
        required: true,
      }
      ]
    });
  }

  async getOne(id: number) {
    const user = await User.findOne({
      where: { id },
      attributes: [
        'login',
        'email',
        'email_password',
        'isReadCredentials',
        'id'
      ],
      include: [{
        model: UserRole, as: 'role'
      }]
    });
    if (user) return user;
    throw new ServerError(401, 'Неавторизованный пользователь');
  }
}

export default new UserService();
