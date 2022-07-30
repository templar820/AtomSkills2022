import UserStore from "@stores/User.store";
import {Api} from '../api/api';
import AppService from "@services/App.service";
import {SnackType} from "../model/Notifications/PageNotification";

export enum Roles {
  ADMIN = 'ADMIN',
  USER = 'author',
  OPERATOR = 'OPERATOR',
  OPERATOR2 = 'executor',
  SERVICEMANAGER = 'serviceManager',
  COMPANY = 'COMPANY',
}

export default class AuthService {
  private apiService: Api<any>;
  private userStore: UserStore;
  private appService: AppService;

  constructor(apiService: Api<any>, appService: AppService, userStore: UserStore) {
    this.apiService = apiService;
    this.userStore = userStore;
    this.appService = appService;
  }

  async login(login: string, password: string) {
    try {
      const a = await this.apiService.user.loginUser({ email: login, password });
      const {token} = a.data.data;
      localStorage.setItem('token', token);
    } catch (err) {
      this.appService.NotificationManager.Snack.open({snacktype: SnackType.Error, message: `Ошибка авторизации: ${err.error.message}`})
      return;
    }
  }

  async register(login: string, password: string, roleId: number) {
    try {
      const {data} = await this.apiService.user.createUser({ email: login, password, role: roleId}, {});
      const {token} = data.data;
      localStorage.setItem('token', token);
    } catch (err) {
      this.appService.NotificationManager.Snack.open({snacktype: SnackType.Error, message: `Ошибка регистрации: ${err.error.message}`})
      return;
    }
  }

  async authentication() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      this.apiService.http.setSecurityData({
        headers: {
          token: `${token}`
        }
      });
      const {data} = await this.apiService.user.getUserByToken({ headers: { token }});
      this.userStore.setUser({...data.data, role: data.data.role.name_role}, true);
    } catch (err) {
      this.userStore.setUser({}, false);
      localStorage.removeItem('token');
      this.appService.NotificationManager.Snack.open({snacktype: SnackType.Error, message: `Ошибка аутентификации: ${err.error.message}`})
      return;
    }
  }

  async logout() {
    await this.apiService.user.logoutUser();
    this.userStore.setUser({}, false);
    localStorage.removeItem('token');
  }

  async getRoles() {
    const {data} = await this.apiService.role.getAll();
    this.userStore.setRoles(data.data);
    return data;
  }
}
