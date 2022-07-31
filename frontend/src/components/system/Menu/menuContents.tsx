import { Roles } from '@services/Auth.service';
import EmailIcon from '@mui/icons-material/Email';
import {Home, Settings, Person, List, PeopleAlt, StackedLineChart, Assignment} from "@mui/icons-material";

const handler = {
  get(target, name) {
    return name in target
      ? target[name] : target[Roles.ADMIN];
  }
};

export default new Proxy({
  [Roles.ADMIN]: [{
    id: 'users',
    name: 'Пользователи',
    path: '/users',
    icon: <PeopleAlt />
  },
  {
    id: 'email',
    name: 'Почта',
    path: 'https://ethereal.email/login',
    icon: <EmailIcon />
  }

  ],
  [Roles.USER]: [{
    id: 'tickets',
    name: 'Заказы',
    path: '/tickets',
    icon: <Home />
  },
  {
    id: 'email',
    name: 'Почта',
    path: 'https://ethereal.email/login',
    icon: <EmailIcon />
  }

  ],
  [Roles.OPERATOR]: [{
    id: 'order-list',
    name: 'Список заказов',
    path: '/order-list',
    icon: <List />
  },
  {
    id: 'email',
    name: 'Почта',
    path: 'https://ethereal.email/login',
    icon: <EmailIcon />
  }

  ],
  [Roles.OPERATOR2]: [{
    id: 'order-list',
    name: 'Список заказов',
    path: '/order-list',
    icon: <List />
  },
  {
    id: 'email',
    name: 'Почта',
    path: 'https://ethereal.email/login',
    icon: <EmailIcon />
  }
  ],
  [Roles.SERVICEMANAGER]: [{
    id: 'analytics',
    name: 'Аналитика',
    path: '/analytics',
    icon: <StackedLineChart />
  },
  {
    id: 'email',
    name: 'Почта',
    path: 'https://ethereal.email/login',
    icon: <EmailIcon />
  }, {
    id: 'docs',
    name: 'Контроль качества',
    path: '/docs',
    icon: <Assignment />
  }]
}, handler);
