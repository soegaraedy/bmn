import React from "react";
//import { useRouter } from "next/router";
//import {useState} from "react";

function Modal ({ setOpenModal }) {   
    //if(!isVisible) return null;
    //console.log(typeof setOpenModal);
    //console.log("Init setOpenModal.visible: ", setOpenModal.visible);
    //setOpenModal.visible='false'
    //console.log("setOpenModal.visible: ", setOpenModal.visible);
    //console.log(setOpenModal.data); 
        
    //const router = useRouter();
    
    if(document.getElementById('pcmodalcontainer') !== null && setOpenModal.visible){
        document.getElementById('pcmodalcontainer').style.display='block';
        //document.getElementById('test').remove(); //not good
        //console.log("If setOpenModal.visible: ", setOpenModal.visible); 
    }
    if(document.getElementById('laptopmodalcontainer') !== null && setOpenModal.visible){
        document.getElementById('laptopmodalcontainer').style.display='block'        
    }
    if(document.getElementById('upsmodalcontainer') !== null && setOpenModal.visible){
        document.getElementById('upsmodalcontainer').style.display='block'        
    }    
    
    async function submitForm(event){
        console.log("submitting form")
        //console.log("The values")
        //console.log(values)
        event.preventDefault();
    
        const editId = event.target.nomor_bmn.value;
        //console.log("idBmn to edit: ", editId); 
        const dataform = {
            jenis_bmn: event.target.jenis_bmn.value,
            nomor_bmn: event.target.nomor_bmn.value,
            serial_number: event.target.serial_number.value,
            merk: event.target.merk.value,
            tipe: event.target.tipe.value,
            os: (event.target.jenis_bmn.value==='PC' || event.target.jenis_bmn.value==='Laptop' )? event.target.os.value : '',          
            office: (event.target.jenis_bmn.value==='PC' || event.target.jenis_bmn.value==='Laptop' )? event.target.office.value:'',
            antivirus: (event.target.jenis_bmn.value==='PC' || event.target.jenis_bmn.value==='Laptop' )? event.target.antivirus.value:'',                        
            nama_pemegang: event.target.nama_pemegang.value,
            nip: event.target.nip.value,
            ruangan: event.target.ruangan.value,  
            asal_pengadaan: event.target.asal_pengadaan.value,                      
            tahun: event.target.tahun.value,
            kondisi: event.target.kondisi.value,          
        }

        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataform)
        }
    
        try{
            await fetch(`../api/products/${editId}`, options)
            .then(res => res.json())
            //.then(data => console.log(data))
            //.then(data => console.log("Bawa data ini mau dioper ke signupBmn"))            
            
            .then((data) =>{
               //if(data) router.push('http://localhost:3000/daftarbmn')
               if(data) location.reload();
               console.log("SUKSES UPDATE");               
            })
            
        }catch(err){
            console.log(err)
        }        
    }

    /**UNTUK PC */
    if(setOpenModal.data.jenis_bmn === 'PC'){
    //<div id="pcmodalcontainer" className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">        
        return(
            <div id="pcmodalcontainer" className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl"> 
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">   
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">   
                            <h3 className="text-3xl font=semibold">Detail Product</h3>                           
                            <button className="bg-transparent border-0 text-black float-right"
                                onClick={
                                    ()=> {
                                        document.getElementById('pcmodalcontainer').style.display='none'; 
                                        setOpenModal.visible='false'; //console.log("X: ", setOpenModal.visible);                                
                                    }
                                }>
                                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                    X
                                </span>
                            </button>
                        </div> 
                        <div className="relative p-6 flex-auto">
                            <form onSubmit={submitForm} id="theForm" className="bg-gray-200 shadow-md rounded px-8 pt-4 pb-8 w-full">
                                <div>
                                    <label className="block text-black text-sm font-bold mb-1">Jenis BMN</label>
                                    <input                                     
                                    defaultValue={setOpenModal.data.jenis_bmn} key={setOpenModal.data.jenis_bmn} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="jenis_bmn"
                                    />
                                </div> 
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Nomor BMN</label>
                                    <input defaultValue={setOpenModal.data.nomor_bmn} key = {setOpenModal.data.nomor_bmn} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="nomor_bmn"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Serial Number</label>
                                    <input key={setOpenModal.data.serial_number} defaultValue={setOpenModal.data.serial_number} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="serial_number"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Nama Pemegang</label>
                                    <input key={setOpenModal.data.nama_pemegang} defaultValue={setOpenModal.data.nama_pemegang} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="nama_pemegang"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Merknya</label>
                                    <input key={setOpenModal.data.merk} defaultValue={setOpenModal.data.merk} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="merk"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Tipe</label>
                                    <input key={setOpenModal.data.tipe} defaultValue={setOpenModal.data.tipe} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="tipe"
                                        />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Os</label>
                                    <input key={setOpenModal.data.os} defaultValue={setOpenModal.data.os} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="os"
                                        />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Office</label>
                                    <input key={setOpenModal.data.office} defaultValue={setOpenModal.data.office} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="office"
                                        />  
                                </div> 
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Antivirus</label>
                                    <input key={setOpenModal.data.antivirus} defaultValue={setOpenModal.data.antivirus} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="antivirus"
                                        /> 
                                </div>  
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">NIP</label>
                                    <input key={setOpenModal.data.nip} defaultValue={setOpenModal.data.nip} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="nip"
                                        />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Ruangan</label>
                                    <input key={setOpenModal.data.ruangan} defaultValue={setOpenModal.data.ruangan} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="ruangan"
                                        />     
                                </div>  
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Asal Pengadaan</label>
                                    <input key={setOpenModal.data.asal_pengadaan} defaultValue={setOpenModal.data.asal_pengadaan} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="asal_pengadaan"
                                        /> 
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Tahun</label>
                                    <input key={setOpenModal.data.tahun} defaultValue={setOpenModal.data.tahun} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="tahun"
                                        /> 
                                </div>   
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Kondisi</label>
                                    <input key={setOpenModal.data.kondisi} defaultValue={setOpenModal.data.kondisi} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="kondisi"
                                        />  
                                </div>                                
                            </form>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button onClick={()=> {document.getElementById('pcmodalcontainer').style.display='none'; setOpenModal.visible='false'}} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                                    <button form="theForm" type="submit" onClick={()=> document.getElementById('pcmodalcontainer').style.display='none'} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    /**UNTUK Laptop */
    }else if(setOpenModal.data.jenis_bmn === 'Laptop'){
        return(
            <div id="laptopmodalcontainer" className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">                    
                    
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                           
                            <h3 className="text-3xl font=semibold">Detail Product</h3>
                           
                            <button className="bg-transparent border-0 text-black float-right"
                                onClick={
                                    ()=> {
                                        document.getElementById('laptopmodalcontainer').style.display='none'
                                        setOpenModal.visible='false'; //console.log("X: ", setOpenModal.visible)
                                    }
                                }>
                                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                    X
                                </span>
                            </button>
                        </div>                                         
                   
                        <div className="relative p-6 flex-auto">
                            <form onSubmit={submitForm} id="formLaptop" className="bg-gray-200 shadow-md rounded px-8 pt-4 pb-8 w-full">
                            <div>
                                <label className="block text-black text-sm font-bold mb-1">Jenis BMN</label>
                                <input                                     
                                    defaultValue={setOpenModal.data.jenis_bmn} key={setOpenModal.data.jenis_bmn} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="jenis_bmn"
                                />
                                </div>                                 
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Nomor BMN</label>
                                    <input defaultValue={setOpenModal.data.nomor_bmn} key = {setOpenModal.data.nomor_bmn} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="nomor_bmn"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Serial Number</label>
                                    <input key={setOpenModal.data.serial_number} defaultValue={setOpenModal.data.serial_number} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="serial_number"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Nama Pemegang</label>
                                    <input key={setOpenModal.data.nama_pemegang} defaultValue={setOpenModal.data.nama_pemegang} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="nama_pemegang"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Merknya</label>
                                    <input key={setOpenModal.data.merk} defaultValue={setOpenModal.data.merk} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="merk"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Tipe</label>
                                    <input key={setOpenModal.data.tipe} defaultValue={setOpenModal.data.tipe} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="tipe"
                                        />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Os</label>
                                    <input key={setOpenModal.data.os} defaultValue={setOpenModal.data.os} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="os"
                                        />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Office</label>
                                    <input key={setOpenModal.data.office} defaultValue={setOpenModal.data.office} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="office"
                                        />  
                                </div> 
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Antivirus</label>
                                    <input key={setOpenModal.data.antivirus} defaultValue={setOpenModal.data.antivirus} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="antivirus"
                                        /> 
                                </div>  
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">NIP</label>
                                    <input key={setOpenModal.data.nip} defaultValue={setOpenModal.data.nip} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="nip"
                                        />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Ruangan</label>
                                    <input key={setOpenModal.data.ruangan} defaultValue={setOpenModal.data.ruangan} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="ruangan"
                                        />     
                                </div>  
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Asal Pengadaan</label>
                                    <input key={setOpenModal.data.asal_pengadaan} defaultValue={setOpenModal.data.asal_pengadaan} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="asal_pengadaan"
                                        /> 
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Tahun</label>
                                    <input key={setOpenModal.data.tahun} defaultValue={setOpenModal.data.tahun} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="tahun"
                                        /> 
                                </div>   
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Kondisi</label>
                                    <input key={setOpenModal.data.kondisi} defaultValue={setOpenModal.data.kondisi} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="kondisi"
                                        />  
                                </div>                                                                
                            </form>   
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button onClick={()=> {document.getElementById('laptopmodalcontainer').style.display='none'; setOpenModal.visible='false'}} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                                    <button form="formLaptop" type="submit" onClick={()=> document.getElementById('laptopmodalcontainer').style.display='none'} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                            </div>                                                   
                        </div>
                    </div>
                </div>
            </div>
        )

    /**UNTUK UPS */
    }else if(setOpenModal.data.jenis_bmn==='UPS'){
        return(
<div id="upsmodalcontainer" className="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl"> 
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">   
                        <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">   
                            <h3 className="text-3xl font=semibold">Detail Product</h3>                           
                            <button className="bg-transparent border-0 text-black float-right"
                                onClick={
                                    ()=> {
                                        document.getElementById('upsmodalcontainer').style.display='none'; 
                                        setOpenModal.visible='false'; //console.log("X: ", setOpenModal.visible);                                
                                    }
                                }>
                                <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                    X
                                </span>
                            </button>
                        </div> 
                        <div className="relative p-6 flex-auto">
                            <form onSubmit={submitForm} id="formUps" className="bg-gray-200 shadow-md rounded px-8 pt-4 pb-8 w-full">
                            <div>
                                    <label className="block text-black text-sm font-bold mb-1">Jenis BMN</label>
                                    <input                                     
                                    defaultValue={setOpenModal.data.jenis_bmn} key={setOpenModal.data.jenis_bmn} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="jenis_bmn"
                                    />
                                </div> 
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Nomor BMN</label>
                                    <input defaultValue={setOpenModal.data.nomor_bmn} key = {setOpenModal.data.nomor_bmn} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="nomor_bmn"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Serial Number</label>
                                    <input key={setOpenModal.data.serial_number} defaultValue={setOpenModal.data.serial_number} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="serial_number"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Nama Pemegang</label>
                                    <input key={setOpenModal.data.nama_pemegang} defaultValue={setOpenModal.data.nama_pemegang} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="nama_pemegang"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Merknya</label>
                                    <input key={setOpenModal.data.merk} defaultValue={setOpenModal.data.merk} 
                                    className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                    name="merk"
                                    />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Tipe</label>
                                    <input key={setOpenModal.data.tipe} defaultValue={setOpenModal.data.tipe} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="tipe"
                                        />
                                </div>                              
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">NIP</label>
                                    <input key={setOpenModal.data.nip} defaultValue={setOpenModal.data.nip} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="nip"
                                        />
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Ruangan</label>
                                    <input key={setOpenModal.data.ruangan} defaultValue={setOpenModal.data.ruangan} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="ruangan"
                                        />     
                                </div>  
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Asal Pengadaan</label>
                                    <input key={setOpenModal.data.asal_pengadaan} defaultValue={setOpenModal.data.asal_pengadaan} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="asal_pengadaan"
                                        /> 
                                </div>
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Tahun</label>
                                    <input key={setOpenModal.data.tahun} defaultValue={setOpenModal.data.tahun} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="tahun"
                                        /> 
                                </div>   
                                <div>
                                    <label className="pt-4 block text-black text-sm font-bold mb-1">Kondisi</label>
                                    <input key={setOpenModal.data.kondisi} defaultValue={setOpenModal.data.kondisi} 
                                        className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                                        name="kondisi"
                                        />  
                                </div>                                                                                                
                            </form>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button onClick={()=> {document.getElementById('upsmodalcontainer').style.display='none'; setOpenModal.visible='false'}} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Cancel</button>
                                    <button form="formUps" type="submit" onClick={()=> document.getElementById('upsmodalcontainer').style.display='none'} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        )    
    }
}

export default Modal;