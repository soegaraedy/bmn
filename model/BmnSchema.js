import mongoose from "mongoose";
import { Schema, model, models } from "mongoose";

const mongoosePaginate = require('mongoose-paginate-v2');

const bmnSchema = new mongoose.Schema(
    {
        nomor_bmn: String,
        jenis_bmn: String,
        serial_number: String,
        merk: String,
        tipe: String, 
        os: String,
        office: String,
        antivirus: String,
        nama_pemegang: String,
        nip: String,
        ruangan: String,
        asal_pengadaan: String,
        tahun: String,
        kondisi: String
    }
)

//const Bmn = mongoose.model('bmn', bmnSchema)
//const Bmn = models.bmn||model('bmn', bmnSchema)

//export default Bmn;

//const Bmn = mongoose.models.bmn||mongoose.model('bmn', bmnSchema);
//module.exports = Bmn;

//export default mongoose.models.Bmn || mongoose.model("Bmn", bmnSchema);

//global.PizzaSchema = global.NoteSchema || mongoose.model('Note', NoteSchema);
//export default global.NoteSchema;
bmnSchema.plugin(mongoosePaginate);

//try solve problem
mongoose.models ={};
const Bmn = mongoose.model('Bmn', bmnSchema);

export default Bmn;