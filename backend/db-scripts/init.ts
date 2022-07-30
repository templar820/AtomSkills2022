import sla from './data/sla.json';
import userRole from './data/role_people.json';
import user from './data/people.json';
import priority from './data/priorities.json';
import claims from './data/claims.json';
import claimsType from './data/typeClaims.json';
import states from './data/states.json';
import history from './data/historyExecutors.json';
import db from '../src/db';
import { Sla, UserRole, User, Priority, State, Claims, ClaimsType, History } from '../src/models/DbModel';

const LIMIT = 1000;

const slicer = (data) => {
  const subarray = [];
  for (let i = 0; i <Math.ceil(data.length/LIMIT); i++){
    subarray[i] = data.slice((i*LIMIT), (i*LIMIT) + LIMIT);
  }
  return subarray;
}

const bulk = async (model, data, t, cb?, include?) => {
  const workData = slicer(cb ? data.map(cb) : data);
    for (const items of workData) {
      const options = include ? {transaction: t, include} : {transaction: t};
      await model.bulkCreate(items, options);
    }
};

const main = async () => {
  return new Promise(async(resolve, reject) => {
    const t = await db.transaction();
    console.log('clear success');
    try {
      await bulk(Sla, sla, t);
      await bulk(UserRole, userRole, t);
      await bulk(User, user, t);
      await bulk(ClaimsType, claimsType, t);

      await bulk(Priority, priority, t);
      await bulk(State, states, t);
      await bulk(Claims, claims, t);
      await bulk(History, history, t);

      await t.commit();

      await db.query("SELECT setval('slas_id_seq', (SELECT MAX(id) FROM slas))");
      await db.query("SELECT setval('claims_id_seq', (SELECT MAX(id) FROM claims))");
      await db.query("SELECT setval('claims_types_id_seq', (SELECT MAX(id) FROM claims_types))");
      await db.query("SELECT setval('user_roles_id_seq', (SELECT MAX(id) FROM user_roles))");
      await db.query("SELECT setval('histories_id_seq', (SELECT MAX(id) FROM histories))");
      await db.query("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
      await db.query("SELECT setval('priorities_id_seq', (SELECT MAX(id) FROM priorities))");
      await db.query("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");

      console.log('==> INIT DONE!');
      resolve(true);
    } catch (e) {
      console.log(e);
      await t.rollback();
      reject();
    }
  })
}

module.exports = main;
