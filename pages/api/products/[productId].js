//import {MongoClient, ObjectId} from "mongodb";

import connectMongo from "@/database/conn";
import Bmn from "@/model/BmnSchema";

export default async function handler(req, resp){

    //const {productId} = req.query

    //const params = req.query.params
    //console.log(params)
    //res.status(200).json(params)    

    if(req.method === 'GET'){
        const {productId} = req.query
        connectMongo().catch(error => resp.json({error:"Connection Failed"}));
        try{
            await Bmn.findOne({nomor_bmn: productId}).then(function(doc){
                
                //console.log(docs);
                //console.log("Detected Data: ", productId)   
                
                const data = {
                    jenis_bmn: doc.jenis_bmn,
                    nomor_bmn: doc.nomor_bmn,
                    serial_number: doc.serial_number,
                    merk: doc.merk,
                    tipe: doc.tipe,
                    os: doc.os,
                    office: doc.office,
                    antivirus: doc.antivirus,                        
                    nama_pemegang: doc.nama_pemegang,
                    nip: doc.nip,
                    ruangan: doc.ruangan,  
                    asal_pengadaan: doc.asal_pengadaan,                      
                    tahun: doc.tahun,
                    kondisi: doc.kondisi,                        
                    _id: doc._id,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/api/bmn/" +doc._id
                    }
                };

                console.log(data);
                return resp.status(200).json(data);             

            })

        }catch(error){
            console.log("No Data Matched Your Query");
            resp.status(404).json({message: error.message});
        }

    }else if(req.method === 'PATCH'){
        const {productId} = req.query;
        const product = req.body;
        //console.log("Coba product: ", product.office);   

        const filter = {nomor_bmn: productId};
        //const update = {nama_pemegang:'rahayu'}        
        //console.log("nama pemegang baru: ", productId);
               
        const update = {            
            //nomor_bmn: req.nomor_bmn,
            serial_number: req.body.serial_number,
            jenis_bmn: req.body.jenis_bmn,
            merk: req.body.merk,
            tipe: req.body.tipe,
            os: req.body.os,
            office: req.body.office,
            antivirus: req.body.antivirus,                        
            nama_pemegang: req.body.nama_pemegang,
            nip: req.body.nip,
            ruangan: req.body.ruangan,  
            asal_pengadaan: req.body.asal_pengadaan,                      
            tahun: req.body.tahun,
            kondisi: req.body.kondisi,
        };    

        try{
            const doc = await Bmn.findOneAndUpdate(filter, update, {new:true});
            //console.log("nama pemegang baru: ", doc.nama_pemegang);

            return resp.status(200).json({
                nomor_bmn: productId,
                message: "BMN Updated"
            })
        }catch(err){
            throw err
        }
        
        




    }else if(req.method === 'POST'){
        const {productId} = req.query

    }else if(req.method === 'DELETE'){
        const {productId} = req.query
        connectMongo().catch(error => res.json({error:"Connection Failed"}))

        try{
            Bmn.findOneAndDelete({nomor_bmn: productId}).then(function(){
                console.log("Data has been deleted: ", productId)   
                
                return resp.status(200).json({
                    nomor_bmn: productId,
                    message: "BMN Deleted"
                })
            })
        }catch (err){
            throw err
        }
        /*
        const client = await MongoClient.connect("{process.env.MONGO_URL}")
        const db = client.db()
        const collection = db.collection("bmns")
        const result = await (await collection.deleteOne({_id: new ObjectId(productId)})).deletedCount;
        client.close()
    
        console.log("deleted count::::" +result)
        return resp.json({
            nomor_bmn: result,
            message: "BMN deleted"
        })
        */

    }
}