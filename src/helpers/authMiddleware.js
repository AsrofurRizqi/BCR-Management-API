const jwt = require("jsonwebtoken");
const {users} = require("../models")

module.exports = {
    checkLogin : (req,res,next)=>{
        const bearer = req.headers.authorization
        if(!bearer){
            res.status(401).send({
                msg: "cannot access",
                status: 401,
                error: "harap isi token akses"
            })
        }else{
            const token = bearer.split("Bearer ")[1]
            try{
                const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                req.decodedToken = decodedToken; 
                next();
            }
            catch(error){
                res.status(401).send({
                    msg: "cannot access",
                    status: 401,
                    error: "Invalid token",
                })
            }
            
        }
    },
    authorize : async(req,res,next)=>{
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken.split("Bearer ")[1];
            const tokenPayload = jwt.verify(
              token,
              process.env.SECRET_KEY
            );
      
            req.userdata = await users.findByPk(tokenPayload.id);
            if(req.userdata.roles == "member"){
                res.status(401).send({
                    msg: "cannot access",
                    status: 401,
                    error: "hanya admin & superadmin"
                })
            }else{
                next();
            }
          } catch (err) {
            res.status(401).json({
              message: "Invalid Token",
              status: 401
            });
          }      
    },
    checkToken : async(req,res)=>{
        const bearer = req.headers.authorization
        if(!bearer){
            res.status(401).send({
                msg: "cannot access",
                status: 401,
                error: "harap isi token akses"
            })
        }else{
            const token = bearer.split("Bearer ")[1]
            try{
                const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
                const expire = new Date(decodedToken.exp*1000);
                const userdata = await users.findByPk(decodedToken.id)
                res.status(200).send({
                    msg: "check token success",
                    status:200,
                    data: {nama: userdata.nama, roles: userdata.roles,exptoken: expire}
                })
            }
            catch(error){
                res.status(401).send({
                    msg: "cannot access",
                    status: 401,
                    error: "Invalid token",
                })
            }
        }
    }
}