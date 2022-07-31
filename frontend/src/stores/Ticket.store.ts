import {
  action, computed, makeAutoObservable, observable, toJS
} from 'mobx';
import {IClaims, IClaimsType, IExample} from '../api/api';

export default class TicketStore {
  @observable _ticketList: IClaims[] = [];

  @observable
  claimTypesList: IClaimsType[] = [];

  @observable
  priorityList: IClaimsType[] = [];

  @observable
  stateList = [];

  @observable
  usersClaimType = [];

  @observable
  users = [];

  @observable
  executors = [];

  constructor() {
    makeAutoObservable(this);
  }

  @computed
  get ticketList(): IClaims[] {
    return this._ticketList;
    // const criteria = this.filterNames.find(el => el.active);
    // return UTILS.getSortableList(toJS(this._ticketList), criteria, `${criteria?.value}`);
  }

  set ticketList(value) {
    this._ticketList = value;
  }

  @action
  setTicketList(list) {
    this.ticketList = list;
  }

  @action
  setPriorityList(list) {
    this.priorityList = list;
  }

  @action
  setStateList(list) {
    this.stateList = list;
  }

  @action
  setClaimTypesList(list: IClaimsType[]) {
    this.claimTypesList = list;
  }

  @action
  setUsersClaimType(list) {
    this.usersClaimType = list;
  }

  @action
  setUsers(list) {
    this.users = list;
  }

  @action
  setExecutors(list) {
    this.executors = list;
  }

  filterNames = [
    {
      ascending: 'top',
      active: false,
      name: 'По названию',
      value: 'name'
    },
    {
      ascending: 'top',
      active: false,
      name: 'По названию вещества',
      value: 'substance.name'
    }
  ];

  @action
  setFilterNames(list) {
    this.filterNames = list;
  }
}
