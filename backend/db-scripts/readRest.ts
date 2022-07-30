const axios = require('axios');
const fs = require('fs');
import constants from "../src/config/CONSTANT";
var path = require('path');

axios.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${constants.REST_TOKEN}`;

    return config;
})

async function getItem(item) {
    return new Promise((resolve, reject) => {
        axios
            .get(`${constants.REST_SERVICE}${item.path}`)
            .then(res => {
                fs.writeFileSync(path.resolve(__dirname, `./data/${item.fileName}.json`), JSON.stringify(res.data));
                resolve()
            })
            .catch(error => {
                console.error(error);
                reject()
            });
    })
}

async function readRest(arr) {
    return Promise.all(arr.map(e => getItem(e)))
}

function main() {
   return readRest(
        [
            {path: '/refs/people', fileName: 'people'},
            {path: '/refs/role_people', fileName: 'role_people'},
            {path: '/refs/priorities', fileName: 'priorities'},
            {path: '/refs/time_sla', fileName: 'sla'},
            {path: '/refs/type_claims', fileName: 'typeClaims'},
            {path: '/refs/history_executors', fileName: 'historyExecutors'},
            {path: '/refs/type_claims', fileName: 'typeClaims'},
            {path: '/claims', fileName: 'claims'},
            {path: '/refs/states', fileName: 'states'}
        ]
    )
}

export default main;