import { DataTypes } from 'sequelize';
import db from '../db';
import bcrypt from 'bcrypt';
import constants from '../config/CONSTANT';
import hashSync from '../utils/hashSync';
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
  name: { type: DataTypes.STRING},
  password: { type: DataTypes.STRING, defaultValue: hashSync(constants.LOGIN_PASSWORD) },
  surname: { type: DataTypes.STRING, allowNull: true },
  email: {type: DataTypes.STRING},
  patronymic: { type: DataTypes.STRING, allowNull: true },
  system_number: { type: DataTypes.STRING, allowNull: true},
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
})

const Claims = db.define('claims', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  create_date: { type: DataTypes.DATE },
  text: { type: DataTypes.STRING },
  place_of_service: { type: DataTypes.STRING },
  date_time_edit_state: { type: DataTypes.DATE },
  date_time_close_claim: { type: DataTypes.DATE },
  comment: { type: DataTypes.STRING }
})

const History = db.define('history', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  system_number: { type: DataTypes.STRING },
  date_start: { type: DataTypes.DATE },
  date_end: { type: DataTypes.DATE },
  comment: { type: DataTypes.STRING },
})

User.beforeBulkCreate(async (users) => {
  users.forEach(user => {
    if (user.changed('password')) {
      user.password = hashSync(user.password);
    }
    if (!user.email) {
      user.email = user.system_number || 'author';
    }
  })
})

User.beforeSave((user) => {
  if (user.changed('password')) {
    user.password = hashSync(user.password);
  }
});

User.prototype.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

User.belongsTo(UserRole, {as: 'role', foreignKey: "id_role_user", targetKey: "id"});
//
//
// Priority.hasMany(Claims, {foreignKey: 'id_priority', as: 'priority_of_claims'})

// State.hasMany(Claims, {foreignKey: 'id_state', as: 'state_of_claims'})

// User.hasMany(Claims, {foreignKey: 'id_autor', as: 'author_of_claims'})
Claims.belongsTo(User, {foreignKey: 'id_autor', as: 'author_of_claims', targetKey: 'id'})
Claims.belongsTo(User, {foreignKey: 'id_executor', as: 'executor_of_claims', targetKey: 'id'})
Claims.belongsTo(State, {foreignKey: 'id_state', as: 'state_of_claims', targetKey: 'id'})
Claims.belongsTo(Priority, {foreignKey: 'id_priority', as: 'priority_of_claims', targetKey: 'id'})
Claims.belongsTo(ClaimsType, {foreignKey: 'id_type_claim', as: 'claim_type', targetKey: "id"});

// User.hasMany(Claims, {foreignKey: 'id_executor', as: 'executor_of_claims'})

// Claims.hasOne(History, {foreignKey: 'id_type_claim', as: 'claims_of_history'})
History.belongsTo(Claims, {foreignKey: 'id_claim', as: 'claims_of_history', targetKey: 'id'})

// State.hasMany(History, {foreignKey: 'id_state', as: 'state_of_history'});
History.belongsTo(State, {foreignKey: 'id_state', as: 'state_of_history', targetKey: 'id'})


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
  History
};
