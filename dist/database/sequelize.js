"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const db_1 = require("../config/db");
const sequelize = new sequelize_typescript_1.Sequelize(db_1.default.mysql.database, db_1.default.mysql.user, db_1.default.mysql.password || null, {
    host: db_1.default.mysql.host,
    port: db_1.default.mysql.port,
    dialect: 'mysql',
    pool: {
        max: db_1.default.mysql.connectionLimit,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    timezone: '+08:00',
});
sequelize
    .authenticate()
    .then(() => {
    console.log('数据库连接成功');
})
    .catch((err) => {
    console.error(err);
    throw err;
});
exports.default = sequelize;
//# sourceMappingURL=sequelize.js.map