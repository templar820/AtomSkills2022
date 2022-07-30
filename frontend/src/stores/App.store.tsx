import {
  action, computed, makeAutoObservable, observable, toJS,
} from 'mobx';
import BaseNotification from '../model/Notifications/BaseNotification';

export interface UsersNotifications {
  text: string;
  time_ago: string;
  claimId?: string;
}

export default class AppStore {
  @observable
  notifications = [];

  @observable
  usersNotifications: UsersNotifications[] = [
    {
      text: "Статус заявки был изменен на такой-то",
      time_ago: 500,
      claimId: 5,
    }
  ];

  @observable
  isLoader = false;

  @action
  setNotifications(notifications: BaseNotification[]) {
    this.notifications = notifications;
  }

  @action
  setUsersNotifications(notifications: UsersNotifications[]) {
    this.usersNotifications = notifications;
  }

  @action
  addNotification(notify) {
    this.setNotifications([...this.notifications, notify]);
  }

  @computed
  get currentNotification() {
    return this.notifications[0];
  }

  @observable
  openMenu = JSON.parse(localStorage.as_menu || 'false');

  isTimer = false;

  @action
  setLoader(value, fromTimer = false) {
    if (fromTimer) {
      if (this.isTimer) this.isLoader = value;
      this.isTimer = false;
    } else {
      this.isLoader = value;
      this.isTimer = false;
    }
  }

  @action
  changeMenu() {
    this.openMenu = !this.openMenu;
    localStorage.as_menu = this.openMenu;
  }

  @action
  setMainMenu(menu) {
    this.mainMenu = menu;
  }

  getLoader = () => toJS(this.isLoader);

  startLoader() {
    this.isTimer = true;
    setTimeout(() => {
      this.setLoader(true, true);
    }, 200);
  }

  constructor() {
    makeAutoObservable(this);
  }

  @observable
  mainMenu = [];

  @observable
  botMenu = [
    // {
    //   id: 'settings',
    //   name: 'Настройки',
    //   path: '/settings#account-general'
    // },
    // {
    //   id: 'support',
    //   name: 'Поддержка',
    //   path: '/support',
    // }
  ];
}
