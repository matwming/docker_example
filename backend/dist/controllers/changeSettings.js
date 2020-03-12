"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
/*
* post request handler
* */
exports.changeSettings = (req, res) => {
    var _a;
    try {
        const data = req.body;
        if (!data.hasOwnProperty('uid'))
            return res.json({ error: 'please input your user id', success: false });
        const uid = (_a = data) === null || _a === void 0 ? void 0 : _a.uid;
        if (Number.isNaN(parseInt(uid)))
            return res.json({ error: "please input a valid user id", success: false });
        //console.log('data', data);
        delete data.uid;
        const updateSql = getMultiSql(data)(uid);
        //console.log('updateSql', updateSql);
        con.query(updateSql, (err, result) => {
            if (err) {
                return res.json({ error: 'there is an error:' + err, success: false });
            }
            //console.log('result', result);
            const isSuccess = Array.isArray(result) && result.filter(el => el.warningCount !== 0).length === 0;
            //console.log('isSuccess', isSuccess);
            if (isSuccess) {
                return res.json({ msg: 'data is successfully updated', success: true });
            }
            return res.json({ error: 'there is an error updating data,please try again', success: false });
        });
    }
    catch (e) {
        return res.json({ error: e, success: false });
    }
};
/* helper functions */
const con = config_1.default();
const updateSql = (table, valueset, uid) => {
    return `update ${table} set ${valueset} where uid=1`;
};
const getMultiSql = (data) => {
    let copiedData = { ...data };
    Object.keys(copiedData).forEach(el => {
        let array = [];
        for (let [key, value] of Object.entries(copiedData[el])) {
            array.push(key + '=' + JSON.stringify(value));
        }
        copiedData[el] = array.join(',');
    });
    //console.log('copideddata', copiedData);
    return (uid) => {
        let sql = [];
        for (let [k, v] of Object.entries(copiedData)) {
            sql.push(updateSql(k, v, uid));
        }
        return sql.join(';');
    };
};
