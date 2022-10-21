const mainRoutes = require("express").Router();
const carsRoutes = require("./carsRoutes");
const authRoutes = require("./authRoutes");
const openapiRoutes = require("./openapiRoutes");

mainRoutes.use("/cars", carsRoutes);
mainRoutes.use("/auth", authRoutes);
mainRoutes.use("/openapi", openapiRoutes)

module.exports= mainRoutes;