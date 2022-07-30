import TicketStore from '@stores/Ticket.store';
import AppStore from './App.store';
import ProductStore from './Product.store';
import UserStore from './User.store';

export class RootStore {
  AppStore: AppStore;


  UserStore: UserStore;

  TicketStore: TicketStore;

  constructor() {
    this.AppStore = new AppStore();
    this.UserStore = new UserStore();
    this.TicketStore = new TicketStore();
  }
}

export default new RootStore();
