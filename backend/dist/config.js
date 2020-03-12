"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
/*
* mysql config info
* */
const connection = () => mysql_1.default.createConnection({
    host: '192.168.20.34',
    user: 'root',
    password: 'ijn1234',
    database: 'test',
    multipleStatements: true
});
let con = connection();
con.connect((err) => {
    if (err) {
        console.log('mysql error: ', err);
        return;
    }
    else {
        console.log('mysql is successfully connected.');
    }
});
exports.default = connection;
