import connectMongo from "@/database/conn";
import Bmn from "@/model/BmnSchema";

export default async function getBmn(req, res){
    const currentPage = req.query.page || 1; //jika parameter page tidak diberikan, ambil 1 sebagai default value
    const perPage = req.query.perpage || 10;
    let totalItems;

  

    //lagi ditambahin role??
    console.log("Role awal req: ", req.role);    
    req.role="admin";
    console.log("Assigned Role: ", req.role);
    
    if(req.role=="admin"){
        //console.log(req.role);
        connectMongo().catch(error => res.json({error:"Connection Failed"}));
        try{
            await Bmn.find({})
            .countDocuments()
            .then(count =>{
                totalItems = count;
                return Bmn.find()
                //.skip((parseInt(currentPage)-1)*parseInt(perPage))
                .skip((currentPage-1)*perPage)
                //.limit(parseInt(perPage))
                .limit(perPage)
            })
            .then(docs => {
                const response = {                      
                    currentPage: currentPage, //count : docs.length,                                     
                    products : docs.map(doc => {
                        return {
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
                    }),
                    total_data: totalItems,
                    per_page: perPage,   
                };
                res.status(200).json(response);
                //console.log("paginated response", response)
            })
            .catch(err => {
                console.log(err)
                res
                .status(500)
                .json({message: err});
            });        
    
        }catch(err){
            throw err;
        } 
    }else{
        console.log("non admin")
    }       
}