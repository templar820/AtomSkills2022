import { DataTypes, where } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../db';
import constants from '../config/CONSTANT';
import hashSync from '../utils/hashSync';
import { createUserEmailCredentials, sendMail } from '../utils/Mailer';
import claimType from '../routes/claimType';
import UserService from '../services/UserService';
import StateService from '../services/StateService';
import { DEFAULT_STATE } from './initData';
// import es from '../config/es';

// const saveDocument = (instance: any) => {
//   return es.create({
//     index: 'products',
//     type: 'products',
//     id: instance.dataValues.id,
//     body: { name: instance.dataValues.name },
//   });
// };
//
// const updateDocument = (instance: any) => {
//   return es.update({
//     id: instance.dataValues.id,
//     index: 'products',
//     body: { doc: { name: instance.dataValues.name } },
//   });
// };
//
// const deleteDocument = (instance: any) => {
//   return es.delete({
//     index: 'products',
//     type: 'products',
//     id: instance.dataValues.id,
//   });
// };

const User = db.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, defaultValue: hashSync(constants.LOGIN_PASSWORD) },
  surname: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING },
  login: { type: DataTypes.STRING },
  isReadCredentials: { type: DataTypes.BOOLEAN, defaultValue: false },
  email_password: { type: DataTypes.STRING },
  patronymic: { type: DataTypes.STRING, allowNull: true },
  system_number: { type: DataTypes.STRING, allowNull: true },
});

const UserRole = db.define('user_role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_role: { type: DataTypes.STRING },
  caption_role: { type: DataTypes.STRING }
});

const Priority = db.define('priority', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_priority: { type: DataTypes.STRING },
  caption_priority: { type: DataTypes.STRING }
});

const State = db.define('state', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_state: { type: DataTypes.STRING },
  caption_state: { type: DataTypes.STRING }
});

const Sla = db.define('sla', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  time_sla: { type: DataTypes.INTEGER },
  name_sla: { type: DataTypes.STRING },
  caption_sla: { type: DataTypes.STRING },
});

const ClaimsType = db.define('claims_type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name_claim: { type: DataTypes.STRING },
  caption_claim: { type: DataTypes.STRING },
});

const Claims = db.define('claims', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  create_date: { type: DataTypes.DATE },
  text: { type: DataTypes.STRING },
  place_of_service: { type: DataTypes.STRING },
  date_time_edit_state: { type: DataTypes.DATE },
  date_time_close_claim: { type: DataTypes.DATE },
  comment: { type: DataTypes.STRING }
});

const History = db.define('history', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  system_number: { type: DataTypes.STRING },
  date_start: { type: DataTypes.DATE },
  date_end: { type: DataTypes.DATE },
  comment: { type: DataTypes.STRING },
});

const UsersClaimsType = db.define('users_claim_type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ClaimTypeSlaPriority = db.define('claim_type_priority_sla', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  claimTypeId: { type: DataTypes.INTEGER},
  slaId: { type: DataTypes.INTEGER},
  priorityId: { type: DataTypes.INTEGER}
})

const ClaimSla = db.define('claims_sla', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  deadline: { type: DataTypes.DATE },
});

User.beforeBulkCreate(async (users) => {
  for await (const user of users) {
    if (user.changed('password')) {
      user.password = hashSync(user.password);
    }
    if (!user.login) {
      user.login = user.system_number;
    }
    if (!user.email) {
      createUserEmailCredentials((credentials) => {
        user.email_password = credentials.email_password;
        user.email = credentials.email;
        User.update(credentials, { where: { id: user.id } });
      });
    }
  }
});

Claims.afterSave(async (claim) => {
  send(claim);
});

export const send = async (claim) => {
  if (claim.changed('id_state')) {
    const user = await UserService.getOne(claim.id_autor);
    const state = await State.findOne({ where: { id: claim.id_state } });
    const text = `Теперь Заявка №${claim.id} имеет статус ${state?.caption_state}`;
    sendMail({
      email: user.email,
      subject: 'Статус заявки обновлен',
      text,
    });
  }
};


User.afterCreate(async (user) => {
  if (user.changed('password')) {
    user.password = hashSync(user.password);
  }
  if (!user.email) {
    createUserEmailCredentials((credentials) => {
      user.email_password = credentials.email_password;
      user.email = credentials.email;
      User.update(credentials, { where: { id: user.id } });
    });
  }
});

User.beforeSave((user) => {
  if (user.changed('password')) {
    user.password = hashSync(user.password);
  }
});

User.prototype.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

User.belongsTo(UserRole, { as: 'role', foreignKey: 'id_role_user', targetKey: 'id' });
//
//
// Priority.hasMany(Claims, {foreignKey: 'id_priority', as: 'priority_of_claims'})

// State.hasMany(Claims, {foreignKey: 'id_state', as: 'state_of_claims'})

// User.hasMany(Claims, {foreignKey: 'id_autor', as: 'author_of_claims'})
Claims.belongsTo(User, { foreignKey: 'id_autor', as: 'author_of_claims', targetKey: 'id' });
Claims.belongsTo(User, { foreignKey: 'id_executor', as: 'executor_of_claims', targetKey: 'id' });
Claims.belongsTo(State, { foreignKey: 'id_state', as: 'state_of_claims', targetKey: 'id' });
Claims.belongsTo(Priority, { foreignKey: 'id_priority', as: 'priority_of_claims', targetKey: 'id' });
Claims.belongsTo(ClaimsType, { foreignKey: 'id_type_claim', as: 'claim_type', targetKey: 'id' });

// User.hasMany(Claims, {foreignKey: 'id_executor', as: 'executor_of_claims'})

// Claims.hasOne(History, {foreignKey: 'id_type_claim', as: 'claims_of_history'})
History.belongsTo(Claims, { foreignKey: 'id_claim', as: 'claims_of_history', targetKey: 'id' });

// State.hasMany(History, {foreignKey: 'id_state', as: 'state_of_history'});
History.belongsTo(State, { foreignKey: 'id_state', as: 'state_of_history', targetKey: 'id' });

ClaimsType.belongsToMany(User, {
  through: UsersClaimsType,
  as: 'claim_type_user',
  foreignKey: 'claimTypeId'
});

User.belongsToMany(ClaimsType, {
  through: UsersClaimsType,
  as: 'user_claim_type',
  foreignKey: 'userId'
});

Claims.hasOne(ClaimSla);
ClaimSla.belongsTo(Claims, {
  foreignKey: 'claimId',
  targetKey: 'id'
})
// ClaimsType.belongsToMany(Sla, {
//   through: ClaimTypeSlaPriority,
//   foreignKey: 'slaId',
//   targetKey: 'claimTypeId'
// });
//
// ClaimsType.belongsToMany(Priority, {
//   through: ClaimTypeSlaPriority,
//   foreignKey: 'priorityId',
//   targetKey: 'claimTypeId'
// });
//
// Priority.belongsToMany(ClaimsType, {
//   through: ClaimTypeSlaPriority,
//   foreignKey: 'claimTypeId',
//
// })
//
// Sla.belongsToMany(ClaimsType, {
//   through: ClaimTypeSlaPriority,
//   foreignKey: 'claimTypeId',
//
// })
//
// ClaimsType.belongsToMany(Priority, {
//   through: ClaimTypeSlaPriority,
//   foreignKey: 'priorityId'
// });

// Priority.belongsToMany(Sla, {
//   through: ClaimTypeSlaPriority,
//   foreignKey: 'priorityId',
//   targetKey: 'id'
// })



// Sla.belongsToMany()
// const Order = db.define('order', {
//   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//   name: { type: DataTypes.STRING },
// });
//
// const Product = db.define('product', {
//   name: {type: DataTypes.STRING},
//   price: {type: DataTypes.FLOAT}
// });
//
// const ProductType = db.define('product_type', {
//    name: {type: DataTypes.STRING, unique: true}
// })
//
// ProductType.hasOne(Product, {foreignKey: 'typeId', as: 'productType'});
// Product.belongsTo(ProductType, {foreignKey: 'typeId', as: 'productType'});
//
// Product.hasOne(Order, {foreignKey: 'productId'});
// Order.belongsTo(Product, {foreignKey: 'productId'});
// User.hasOne(Order, {foreignKey: 'userId'});
// Order.belongsTo(User, {foreignKey: 'userId'});

// User.hasOne(UserDetails, {as: "user_details", foreignKey: 'fk_user_id', targetKey: 'id'});
// User.hasOne(UserDetails, {as: 'user_details'});

export interface ISubstance {
  name: string;
  id: number;
  code: string;
}

export interface JWTUser {
  email: string;
  id: number;
  role: string;
}

export {
  User,
  UserRole,
  Claims,
  ClaimsType,
  State,
  Priority,
  Sla,
  History,
  UsersClaimsType,
  ClaimTypeSlaPriority,
  ClaimSla
};
