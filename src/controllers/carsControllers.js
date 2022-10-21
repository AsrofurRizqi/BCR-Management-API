const {cars} = require("../models/");

module.exports = {
    getAllCars : (req, res)=>{
        cars.findAll()
        .then((data)=>{
            res.send({
                msg: "Success get all data",
                status: 200,
                data
            })
        })
        .catch ((err)=>{
            res.send({
                msg: 'Error to get all data',
                status:500,
                err,
            })
        })
    },
    getAllCarsMember : (req, res)=>{
        cars.findAll({
            where : {deleted: false},
        })
        .then((data)=>{
            let newData = [];
            data.forEach(a=>{
                newData.push({
                    id: a.id,
                    nama: a.nama,
                    harga: a.harga,
                    ukuran: a.ukuran,
                    image: a.image,
                    createdAt: a.createdAt,
                    updatedAt: a.updatedAt
                })
            }),
            res.send({
                msg: "Success get all data",
                status: 200,
                data : newData
            })
        })
        .catch ((err)=>{
            res.send({
                msg: 'Error to get all data',
                status:500,
                err,
            })
        })
    },
    postCars : (req, res)=>{
        let{body} = req;
        let{nama}= req.userdata

        const newData = {
            ...body,
            image: req.image.url,
            createdBy: nama,
            updatedBy: nama,
            deleted: false
        };
        cars.create(newData)
        .then((data)=>{
            res.status(200).send({
                msg: "Success to post data",
                status : 200,
                data
            })
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed to post data',
                status: 500,
                err,
            })
        })
    },
    getDataById :(req,res)=>{
        let{ id }=req.params;
        cars.findOne({
            where : {id,deleted: false},
        })
        .then ((data)=>{
            if(data == null){
                res.status(404).send({
                    msg: 'data is deleted or moved',
                    status:404,
                })
            }else{
                res.status(200).send({
                    msg: 'Success get data By Id',
                    status:200,
                    data
                })    
            }
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed get data By Id',
                status: 500,
                err,
            })
        })
    },
    deleteData :(req, res)=>{
        let{id}=req.params;
        let{nama}=req.userdata
        cars.update({deleted: true,deletedAt: Date(),deletedBy: nama},{
            where : {id},
        })
        .then((data)=>{
            if(data == 0){
                res.status(404).send({
                    msg: 'data is deleted or moved',
                    status: 404,
                    data
                })
            }else{
                res.status(200).send({
                    msg: 'Success delete data',
                    status: 200,
                    data
                })    
            }
        })
        .catch((err)=>{
            res.status(500).send({
                msg: 'Failed delete data',
                status: 500,
                err,
            })
        })
    },
    updateDataById: (req, res)=>{
        let{id}=req.params;
        let{nama}=req.userdata
        let{body}=req;
        
        if(req.image == null){
            cars.update({...body,updatedBy: nama},{
                where:{id}
            })
            .then((data)=>{
                res.status(200).send({
                    msg: 'Success update data by id',
                    status: 200,
                    data
                })
            })
            .catch((err)=>{
                res.status(500).send({
                    msg: 'Failed update data by id',
                    status: 500,
                    err,
                })
            })
        }else{
            cars.update({...body,image: req.image.url,updatedBy: nama},{
                where:{id}
            })
            .then((data)=>{
                res.status(200).send({
                    msg: 'Success update data by id',
                    status: 200,
                    data
                })
            })
            .catch((err)=>{
                res.status(500).send({
                    msg: 'Failed update data by id',
                    status: 500,
                    err,
                })
            })
        }

    },
}