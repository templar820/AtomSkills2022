import { action, makeObservable, observable } from 'mobx';
import { IUser } from '../api/api';

export default class UserStore {
  @observable user: IUser | null = null;

  @observable roles: object[] | null = [];

  @observable isLogin = false;

  constructor() {
    makeObservable(this);
  }

  @action setUser = (obj: IUser, isLogin: boolean) => {
    this.user = obj;
    this.isLogin = isLogin;
  };

  @action setRoles = (roles) => {
    this.roles = roles;
  };
}
