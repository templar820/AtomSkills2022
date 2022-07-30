import {Roles} from "@services/Auth.service";
import {Home, Settings, Person, List, PeopleAlt, StackedLineChart} from "@mui/icons-material";

const handler = {
  get: function(target, name){
    return name in target?
      target[name] : target[Roles.ADMIN];
  }
};

export default new Proxy({
  [Roles.ADMIN]: [{
    id: 'users',
    name: 'Пользователи',
    path: '/users',
    icon: <PeopleAlt />
  }],
  [Roles.USER]: [{
    id: 'tickets',
    name: 'Заказы',
    path: '/tickets',
    icon: <Home />
  }],
  [Roles.OPERATOR]: [{
    id: 'order-list',
    name: 'Список заказов',
    path: '/order-list',
    icon: <List />
  }],
  [Roles.OPERATOR2]: [{
    id: 'order-list',
    name: 'Список заказов',
    path: '/order-list',
    icon: <List />
  }],
  [Roles.SERVICEMANAGER]: [{
    id: 'analytics',
    name: 'Аналитика',
    path: '/analytics',
    icon: <StackedLineChart />
  }]
}, handler);
