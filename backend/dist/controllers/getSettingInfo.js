"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
/*
* get request handler
* */
exports.getSettingInfo = (req, res) => {
    var _a, _b, _c;
    try {
        let table = (_b = (_a = req) === null || _a === void 0 ? void 0 : _a.params) === null || _b === void 0 ? void 0 : _b.value.toLowerCase();
        let uid = (_c = req.query) === null || _c === void 0 ? void 0 : _c.uid;
        if (!uid || !table)
            res.json({ error: 'please type your user id.', success: false });
        console.log('table', table);
        let sql = '';
        if (table === 'keywords' || 'settings' || "sites") {
            sql = getSql(table, uid);
        }
        if (table === 'all') {
            sql = wholeTables.map((el) => getSql(el, uid)).join(';');
        }
        //console.log('sql', sql);
        con.query(sql, (err, result) => {
            let sendData = { uid: uid };
            switch (table) {
                case 'keywords':
                case 'sites':
                case 'settings':
                    console.log('result[0]', result);
                    delete result[0]['id'];
                    delete result[0]['uid'];
                    sendData[`${table}`] = filterData(result[0]);
                    return res.json({ data: sendData, success: true });
                case 'all':
                    let keywordsData = { 'keywords': filterData(result[0][0]) };
                    let sitesData = { 'sites': filterData(result[1][0]) };
                    let settingsData = { 'settings': filterData(result[2][0]) };
                    Object.assign(sendData, keywordsData, sitesData, settingsData);
                    return res.json({ data: sendData, success: true });
                default:
                    return res.json({ error: 'there is an error,please check your inputs', success: false });
            }
        });
    }
    catch (e) {
        return res.json({ error: e, success: false });
    }
};
/*helper functions*/
const con = config_1.default();
const getSql = (table, uid) => {
    return `select * from ${table} where uid=${uid}`;
};
let wholeTables = ['keywords', 'sites', 'settings'];
const filterData = (data) => {
    if (data.hasOwnProperty('uid'))
        delete data['uid'];
    if (data.hasOwnProperty('id'))
        delete data['id'];
    return data;
};
