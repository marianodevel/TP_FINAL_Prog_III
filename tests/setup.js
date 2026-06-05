// Variables de entorno para el entorno de test
process.env.PORT = "3001";
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "test_secret_key_para_jest";
process.env.JWT_EXPIRES_IN = "1h";
process.env.DB_HOST = "localhost";
process.env.DB_PORT = "3306";
process.env.DB_NAME = "prog3_turnos";
process.env.DB_USER = "root";
process.env.DB_PASSWORD = "";
process.env.FRONTEND_URL = "http://localhost:5173";
