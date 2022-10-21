const {users, Sequelize} = require('../models');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');
const op = Sequelize.Op;

module.exports={
    register_member: (req,res) =>{
        const {body} = req;
        const saltRounds = 10;
        const roles = "member";
        body.password = bcrypt.hashSync(body.password, saltRounds);
        users.create({...body,roles: roles})
        .then((data) =>{
            res.status(200).send({
                msg: "register member sukses",
                status: "200",
                data: {
                    id: data.id,
                    nama: data.nama,
                    email: data.email,
                    roles: data.roles,
                    updatedAt: data.updatedAt,
                    createdAt: data.createdAt
                }
            })
        })
        .catch((error) =>{
            res.status(500).send({
                msg: "register member failed",
                status: "500",
                error,
            })
        })
    },
    register_admin: (req,res) =>{
        const {body} = req;
        const saltRounds = 10;
        const {roles} = req.decodedToken;
        if(roles != "superadmin"){
            res.status(401).send({
                msg: "gagal register",
                status: 401,
                error: "hanya superadmin yg diperbolehkan",
            })
        }else{
        body.password = bcrypt.hashSync(body.password, saltRounds);
        users.create({...body,roles: "admin"})
        .then((data) =>{
            res.status(200).send({
                msg: "register admin sukses",
                status: "200",
                data: {
                    id: data.id,
                    nama: data.nama,
                    email: data.email,
                    roles: data.roles,
                    updatedAt: data.updatedAt,
                    createdAt: data.createdAt
                }
            })
        })
        .catch((error) =>{
            res.status(500).send({
                msg: "register admin failed",
                status: "500",
                error,
            })
        })
        }
    },
    login: async(req, res) =>{
        const {email,password}= req.body;
        let findUser = await users.findOne({
            where : {
                [op.or] : [
                    {email : email},
                ]},
        })
        if(findUser === null){
            res.status(404).send({
                msg: "login gagal",
                status: 404,
                error: "user not found",
            })
        }
        const invalidPassword = bcrypt.compareSync(
            password,
            findUser.dataValues.password
        );
        if(!invalidPassword) {
            res.status(401).send({
                msg: "login gagal",
                status: 401,
                error: "password salah",
            })
        }
        const payload = {
            id : findUser.dataValues.id,
            username : findUser.dataValues.username,
            email : findUser.dataValues.email,
            roles: findUser.dataValues.roles
        }
        const token = jwt.sign(payload, process.env.SECRET_KEY,{
            expiresIn: 86400,
        });
        delete findUser.dataValues.password;
        res.status(200).send({
            msfg: "login sukses",
            status: 200,
            data: {...findUser.dataValues, token},
        })
    }
}