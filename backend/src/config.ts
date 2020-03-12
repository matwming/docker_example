import mysql, {MysqlError} from 'mysql';
import ip from "ip";

/*
* mysql config info
* */
const connection=()=> mysql.createConnection({
    host:'192.168.20.34',
    user:'root',
    password:'ijn1234',
    database:'test',
    multipleStatements:true
});
let con=connection();

con.connect((err:MysqlError)=>{
    if(err){
        console.log('mysql error: ',err);
        return;
    } else{
        console.log('mysql is successfully connected.');
    }
});

export default connection;
