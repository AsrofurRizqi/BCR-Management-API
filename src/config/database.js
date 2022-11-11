module.exports={
  "development": {
    "username": "postgres",
    "password": "tes123",
    "database": "db_chalenge6",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    use_env_variable: 'DATABASE_URL',
    dialect: "postgress",
    protocol: "postgress",
    dialectOptions: {
      ssl : {
        require : true,
        rejectUnauthorized : false
      }
    }

  }
}
