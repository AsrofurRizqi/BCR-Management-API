const carsRoutes = require ("express").Router();
const carsControllers = require("../controllers/carsControllers")
const uploadMiddleware = require("../helpers/uploadMiddleware")
const cloudinaryMiddleware = require("../helpers/cloudinaryMiddleware")
const authMiddleware =  require("../helpers/authMiddleware")

carsRoutes.get("/",authMiddleware.authorize ,carsControllers.getAllCars);
carsRoutes.get("/member",authMiddleware.checkLogin,carsControllers.getAllCarsMember);
carsRoutes.post("/",authMiddleware.authorize ,uploadMiddleware,cloudinaryMiddleware,carsControllers.postCars);
carsRoutes.get("/:id",authMiddleware.authorize ,carsControllers.getDataById);
carsRoutes.delete("/:id",authMiddleware.authorize ,carsControllers.deleteData);
carsRoutes.put("/:id",authMiddleware.authorize ,uploadMiddleware,cloudinaryMiddleware,carsControllers.updateDataById);

module.exports = carsRoutes;