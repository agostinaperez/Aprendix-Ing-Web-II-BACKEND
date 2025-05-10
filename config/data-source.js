const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "tu_usuario",       // <-- Cambiar esto
  password: "tu_contraseña",    // <-- Cambiar esto
  database: "tu_base_de_datos", // <-- Cambiar esto
  synchronize: true,            // true para desarrollo, false en producción
  logging: false,
  entities: [__dirname + '/../entities/*.js'], // ruta a mis entidades
  migrations: [],
  subscribers: [],
});

module.exports = { AppDataSource };
