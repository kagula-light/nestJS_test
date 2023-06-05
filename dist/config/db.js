"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const productConfig = {
    mysql: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: 'fhj0610.',
        database: 'nest_zero_to_one',
        connectionLimit: 10,
    },
};
const localConfig = {
    mysql: {
        port: 3306,
        host: 'localhost',
        user: 'root',
        password: 'fhj0610.',
        database: 'nest_zero_to_one',
        connectionLimit: 10,
    },
};
const config = process.env.NODE_ENV ? productConfig : localConfig;
exports.default = config;
//# sourceMappingURL=db.js.map