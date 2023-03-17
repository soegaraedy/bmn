import connectMongo from "@/database/conn";
import Bmn from "@/model/BmnSchema";
//import { hash } from "bcryptjs";

export default async function handler(req, res){

    //res.json({message:"Signup Post Request"});
    connectMongo().catch(error => res.json({error:"Connection Failed"}))

    //only post method is accepted
    if(req.method==='POST'){
        if(!req.body){
            return res.status(400).json({error:"Dont have form data"});
        }

        const {nomor_bmn, jenis_bmn, serial_number, merk, tipe, os, office, 
            antivirus, nama_pemegang, nip, ruangan, asal_pengadaan, tahun, kondisi} = req.body;
            //console.log("sampai sinids-------------------------------------------------------------------------")
            //console.log({nomor_bmn})

        const checkAll = await Bmn.find();
        console.log(checkAll);

        //check duplicate users
        const checkexisting = await Bmn.findOne({nomor_bmn:nomor_bmn});
        if(checkexisting) return res.status(422).json({message:"BMN already exists sign up g jadi"});

        

        //insert
        Bmn.create({nomor_bmn, jenis_bmn, serial_number, merk, tipe, os, office, 
            antivirus, nama_pemegang, nip, ruangan, asal_pengadaan, tahun, kondisi}, function(err, data){
            if(err) return res.status(404).json({err});
            res.status(201).json({status:true, bmn:data});
        });

    }else{
        res.status(500).json({message:"HTTP method not valid only POST accepted"})
    }
}