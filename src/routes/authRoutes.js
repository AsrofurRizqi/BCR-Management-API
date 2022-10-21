const authRoutes = require('express').Router();
const authController = require('../controllers/authControllers');
const authMiddleware = require('../helpers/authMiddleware')

authRoutes.post('/login', authController.login);
authRoutes.post('/register', authController.register_member);
authRoutes.post("/reg-admin",authMiddleware.checkLogin ,authController.register_admin);

authRoutes.get("/whoAmI", authMiddleware.checkToken);
module.exports = authRoutes;