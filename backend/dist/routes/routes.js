"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const changeSettings_1 = require("../controllers/changeSettings");
const getSettingInfo_1 = require("../controllers/getSettingInfo");
const router = express_1.Router();
/*
* http requests handled by different functions in controllers
* */
/**
 * @method Get
 * @header
 * @return html: test page
 */
router.get('/', (req, res) => res.send('<h1>Welcome to your Ad Settings Page</h1>'));
/**
 * @method Get user settings info
 * @header
 * @return user settings json
 */
router.get('/setting-info/:value', getSettingInfo_1.getSettingInfo);
/**
 * @method Post
 * @header content-Type:application/json
 * @param null
 * @return success and msg indicating whether data is successfully dated in mysql
 */
router.post('/change-settings', changeSettings_1.changeSettings);
exports.default = router;
