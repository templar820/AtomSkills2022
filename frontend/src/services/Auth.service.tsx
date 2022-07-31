import UserStore from '@stores/User.store';
import AppService from '@services/App.service';
import { Typography } from '@mui/material';
import { Api } from '../api/api';
import { SnackType } from '../model/Notifications/PageNotification';
import NotificationManager from '../helpers/NotificationManager';

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

  async login(body) {
    try {
      const a = await this.apiService.user.loginUser(body);
      const { token } = a.data.data;
      localStorage.setItem('token', token);
    } catch (err) {
      this.appService.NotificationManager.Snack.open({ snacktype: SnackType.Error, message: `Ошибка авторизации: ${err.error.message}` });
    }
  }

  async register(body) {
    try {
      const token = await this.createUser(body);
      localStorage.setItem('token', token);
    } catch (err) {
      this.appService.NotificationManager.Snack.open({ snacktype: SnackType.Error, message: `Ошибка регистрации: ${err.error.message}` });
    }
  }
  
  async createUser(user) {
    const { data } = await this.apiService.user.createUser(user, {});
    const { token } = data.data;
    return token;
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
      const { data } = await this.apiService.user.getUserByToken({ headers: { token } });
      this.userStore.setUser({ ...data.data, role: data.data.role.name_role }, true);
      const response = data.data;
      if (!response.isReadCredentials) {
        NotificationManager.Success.open({
          title: 'Отлично! Регистрация прошла успешно!',
          onClose: () => {
            console.log(true);
            this.apiService.user.readCredentials({ headers: { token } });
          },
          message: (
            <div className="d-flex flex-column">
              <div className="d-flex flex-row align-items-center gap-2">
                <Typography variant="body2">Система сгенерировала для вас эл почту: </Typography>
                <Typography variant="h5">
                  {response.email}
                  .
                </Typography>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <Typography variant="body2">Пароль от эл. почты: </Typography>
                <Typography variant="h5">
                  {response?.email_password}
                  .
                </Typography>
              </div>
              <div className="d-flex flex-row align-items-center gap-2">
                <Typography variant="body2">
                  Ваш почтовый ящик достпен на
                  {' '}
                  <button className="btn btn-link">https://ethereal.email/</button>
                  {' '}
                  Авторизуйтесь там для взаимодействия через почту. Пожалуйста запишите пароль.
                </Typography>
              </div>
            </div>
          )
        });
      }
    } catch (err) {
      this.userStore.setUser({}, false);
      localStorage.removeItem('token');
      this.appService.NotificationManager.Snack.open({ snacktype: SnackType.Error, message: `Ошибка аутентификации: ${err.error.message}` });
    }
  }

  async logout() {
    await this.apiService.user.logoutUser();
    this.userStore.setUser({}, false);
    localStorage.removeItem('token');
  }

  async getRoles() {
    const { data } = await this.apiService.role.getAll();
    this.userStore.setRoles(data.data);
    return data;
  }
}
