import jwt from 'jsonwebtoken';
import {
  Body, Controller, Get, Post, Route, Header, Tags, Security
} from 'tsoa';
import { ServerError } from '../middleware/errorHandler';
import UserService from '../services/UserService';
import CONSTANT from '../config/CONSTANT';
import db from '../db';

interface AuthCred {
 email: string;
 password: string
}

interface IUser extends IUserExport{
  password: string;
}

export interface IUserExport {
  email: string;
  role: number;
  name: string;
  surname: string;
  patronymic?: string;
}

@Route('/user')
@Tags('User')
class UserController extends Controller {
  @Post('/register')
  public async createUser(@Body() body: IUser): Promise<{ token: string }> {
    console.log(body);
    const { login, id } = await UserService.create(body);
    const token = jwt.sign({ login, id }, CONSTANT.SECRET_KEY);
    return { token };
  }

  /**
   * login для пользователя
   * @param body
   */
  @Post('/login')
  public async loginUser(@Body() body: AuthCred) : Promise<{ token: string }> {}

  @Get('/logout')
  public async logoutUser() : Promise<{}> {}

  @Get('/userInfo')
  async getUserByToken(@Header('token') token: string): Promise<IUserExport> {
    const user = await UserService.getOne(Number(token));
    if (!user) throw new ServerError(404, 'User not found');
    return user;
  }

  @Get('/readCredentials')
  async readCredentials(@Header('token') token: string): Promise<IUserExport> {
    const user = await UserService.getOne(Number(token));
    const update = await UserService.update({ id: user.id, isReadCredentials: true });
    if (!update) throw new ServerError(404, 'User not found');
    return update;
  }
}

export default new UserController();
