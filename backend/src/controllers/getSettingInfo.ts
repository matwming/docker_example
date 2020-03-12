import {Request, Response, RequestHandler} from "express";
import {MysqlError} from "mysql";
import connection from "../config";


/*
* get request handler
* */
export const getSettingInfo: RequestHandler = (req: Request, res: Response) => {
    try {
        let table = req?.params?.value.toLowerCase();
        let uid = req.query?.uid;
        if (!uid || !table) res.json({error: 'please type your user id.',success:false});
        console.log('table', table);
        let sql: string = '';
        if (table === 'keywords' || 'settings' || "sites") {
            sql = getSql(table, uid);
        }
        if (table === 'all') {
            sql = wholeTables.map((el) => getSql(el, uid)).join(';');
        }
        //console.log('sql', sql);
        con.query(sql, (err: MysqlError | null, result: any) => {
            let sendData: any = {uid: uid};
            switch (table) {
                case 'keywords':
                case 'sites':
                case 'settings':
                    console.log('result[0]',result);
                    delete result[0]['id'];
                    delete result[0]['uid'];
                    sendData[`${table}`] = filterData(result[0]);
                    return res.json({data: sendData, success: true});
                case 'all':
                    let keywordsData = {'keywords':filterData(result[0][0])};
                    let sitesData = {'sites':filterData(result[1][0])};
                    let settingsData = {'settings':filterData(result[2][0])};
                    Object.assign(sendData, keywordsData, sitesData, settingsData);
                    return res.json({data: sendData, success: true});
                default:
                    return res.json({error: 'there is an error,please check your inputs', success: false})
            }
        })
    } catch (e) {
        return res.json({error: e, success: false})
    }

};

/*helper functions*/

const con = connection();

const getSql = (table: string, uid: string): string => {
    return `select * from ${table} where uid=${uid}`
};
let wholeTables: string[] = ['keywords', 'sites', 'settings'];

const filterData=(data:any)=>{
    if(data.hasOwnProperty('uid')) delete data['uid'];
    if(data.hasOwnProperty('id'))  delete data['id'];
    return data;
};
