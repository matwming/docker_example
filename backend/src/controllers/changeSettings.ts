import {Request, Response, RequestHandler} from "express";
import {MysqlError} from 'mysql';
import connection from "../config";


/*
* post request handler
* */
export const changeSettings: RequestHandler = (req: Request, res: Response) => {
    try {
        const data = req.body;
        if (!data.hasOwnProperty('uid')) return res.json({error: 'please input your user id', success: false});
        const uid: string = data?.uid;
        if (Number.isNaN(parseInt(uid))) return res.json({error: "please input a valid user id", success: false});
        //console.log('data', data);
        delete data.uid;
        const updateSql = getMultiSql(data)(uid);
        //console.log('updateSql', updateSql);
        con.query(updateSql, (err: (MysqlError | null), result: (any)) => {
            if (err) {
                return res.json({error: 'there is an error:' + err, success: false})
            }
            //console.log('result', result);
            const isSuccess: boolean = Array.isArray(result) && result.filter(el => el.warningCount !== 0).length === 0;
            //console.log('isSuccess', isSuccess);
            if (isSuccess) {
                return res.json({msg: 'data is successfully updated', success: true})
            }
            return res.json({error: 'there is an error updating data,please try again', success: false});
        })
    } catch (e) {
        return res.json({error: e, success: false})
    }

};

/* helper functions */
const con = connection();

const updateSql = (table: string, valueset: string, uid: string): string => {
    return `update ${table} set ${valueset} where uid=1`;
};

const getMultiSql = (data: any): Function => {
    let copiedData = {...data};
    Object.keys(copiedData).forEach(el => {
        let array = [];
        for (let [key, value] of Object.entries(copiedData[el])) {
            array.push(key + '=' + JSON.stringify(value))
        }
        copiedData[el] = array.join(',')
    });
    //console.log('copideddata', copiedData);
    return (uid: string): string => {
        let sql: string[] = [];
        for (let [k, v] of Object.entries(copiedData)) {
            sql.push(updateSql(k, v as string, uid))
        }
        return sql.join(';');
    }
};
