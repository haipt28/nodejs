module.exports = {
    HOST: "DESKTOP-93DLBCE",
    USER: "sa",
    PASSWORD: "Oryza@2021",
    DB: "CSDLTest",
    dialect: "mssql",
    PORT: 1433,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    options: {
        keepAlive: true,
        encrypt: true,
        enableArithAbort: true,
    },
};