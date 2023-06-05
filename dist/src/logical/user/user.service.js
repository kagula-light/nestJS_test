"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const Sequelize = require("sequelize");
const sequelize_1 = require("../../../database/sequelize");
const cryptogram_1 = require("../../utils/cryptogram");
let UserService = exports.UserService = class UserService {
    async findOne(username) {
        const sql = `
      SELECT
        user_id userId, account_name username, real_name realName, passwd password,
        passwd_salt salt, mobile, role
      FROM
        admin_user
      WHERE
        account_name = '${username}'
    `;
        try {
            return (await sequelize_1.default.query(sql, {
                type: Sequelize.QueryTypes.SELECT,
                raw: true,
                logging: true,
            }))[0];
        }
        catch (error) {
            console.error(error);
            return void 0;
        }
    }
    async register(requestBody) {
        const { accountName, realName, password, repassword, mobile } = requestBody;
        if (password !== repassword) {
            return {
                code: 400,
                msg: '两次密码输入不一致',
            };
        }
        const user = await this.findOne(accountName);
        if (user) {
            return {
                code: 400,
                msg: '用户已存在',
            };
        }
        const salt = (0, cryptogram_1.makeSalt)();
        const hashPwd = (0, cryptogram_1.encryptPassword)(password, salt);
        const registerSQL = `
      INSERT INTO admin_user
        (account_name, real_name, passwd, passwd_salt, mobile, user_status, role, create_by)
      VALUES
        ('${accountName}', '${realName}', '${hashPwd}', '${salt}', '${mobile}', 1, 3, 0)
    `;
        try {
            await sequelize_1.default.query(registerSQL, { logging: false });
            return {
                code: 200,
                msg: 'Success',
            };
        }
        catch (error) {
            return {
                code: 503,
                msg: `Service error: ${error}`,
            };
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map