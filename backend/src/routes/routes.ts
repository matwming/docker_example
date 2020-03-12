import {Router, Response, Request} from "express";
import {changeSettings} from '../controllers/changeSettings';
import {getSettingInfo} from "../controllers/getSettingInfo";

const router:Router = Router();

/*
* http requests handled by different functions in controllers
* */

/**
 * @method Get
 * @header
 * @return html: test page
 */
router.get('/', (req:Request, res:Response) =>
    res.send('<h1>Welcome to your Ad Settings Page</h1>'));

/**
 * @method Get user settings info
 * @header
 * @return user settings json
 */
router.get('/setting-info/:value', getSettingInfo);
/**
 * @method Post
 * @header content-Type:application/json
 * @param null
 * @return success and msg indicating whether data is successfully dated in mysql
 */
router.post('/change-settings', changeSettings);

export default router;
