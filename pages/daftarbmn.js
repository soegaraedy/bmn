import { getSession } from "next-auth/react";
//import { useTable } from "react-table";
import React, {Fragment, useState} from "react";
import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";

import Modal from "@/components/Modal";
//JANGAN IMPORT getBmn dari api/auth
//import { deleteBmnById } from "./api/auth/getBmn"; <== jgn dipangiil
//import getBmn from "./api/auth/getBmn"; <== client side g bs import dari server side

export default function Daftarbmn(){             
   
    return(
        <GetBmn />
    )      
}

export function GetBmn(){  
    const[showModal, setShowModal] = useState({visible: false, data:[]});

    const[page, setPage] = useState(1);
    const [perpage, setPerpage] = useState(10);

    /**SWR */
    const address = `../api/auth/getBmn/?page=${page}&perpage=${perpage}`;
    const fetcher = (...args) => fetch(...args).then(res=>res.json());
    const {data, error} = useSWR(address, fetcher);    
    if(error) return <div>Failed to load</div>
    if(!data) return <div>Loading</div>
    
    const vals = Object.values(data);
    const totalData = data.total_data;
    //console.log("totalData: ", totalData);
    const maxPage = Math.ceil(totalData/perpage);

    const next = ()=>{
        setPage( page === maxPage? page: page+1);
        setShowModal({visible:false, data:[]});
    }
    const prev = ()=>{
        setPage(page > 1 ? page-1 : 1);
        setShowModal({visible:false, data:[]});
    }


    /*
    const newResult = result.map((item) =>{
        const [count, products] = item; 

    })
    */      
    
    return(              

        <Fragment> 
        
        {showModal.visible && <Modal setOpenModal={showModal} />}  
        
        <div className="text-gray-900 bg-gray-200">
            <div className="p-4 flex">
                <h1 className="text-3xl">Daftar Perangkat  TI</h1>
            </div>
            
            <div className="px-3 py-4 justify-center">
                <table className="table-fixed text-sm bg-white shadow-md rounded mb-4" >
                    <thead >
                        <tr className="font-bold p-2 border-b text-center bg-indigo-700 text-white">                            
                            <th className="w-1/12 p-3 px-5" scope="col">Jenis</th>
                            <th className="w-1/12 p-3 px-5" scope="col">Nomor BMN</th>                            
                            <th className="w-1/12 p-3 px-5" scope="col">Merk</th>   
                            <th className="w-1/12 p-3 px-5" scope="col">Tipe</th>                    
                            <th className="w-1/12 p-3 px-5" scope="col">Nama Pemegang</th>                            
                            <th className="w-1/12 p-3 px-5" scope="col">Ruangan</th>  
                            <th className="w-1/12 p-3 px-5" scope="col">Kondisi</th>
                            <th className="w-1/12 p-3 px-5" scope="col">Opsi</th>
                        </tr>                            
                    </thead>
                    <tbody >
                    {
                        Object.values(vals[1]).map((item) =>(
                            
                            <tr className="even:bg-gray-300 border-b hover:bg-orange-100 bg-gray-100" key={item.nomor_bmn}>
                                
                                <td className="p-3 px-5">
                                    {item.jenis_bmn}
                                </td>
                                <td className="p-3 px-5">
                                    {item.nomor_bmn}
                                </td>                                   
                                <td className="p-3 px-5">
                                    {item.merk}
                                </td>      
                                <td className="p-3 px-5">
                                    {item.tipe}
                                </td>                          
                                <td className="p-3 px-5">
                                    {item.nama_pemegang}
                                </td>                                    
                                <td className="p-3 px-5">
                                    {item.ruangan}
                                </td> 
                                <td className="p-3 px-5">
                                    {item.kondisi}
                                </td>   
                                <td className="p-3 px-5 flex justify-end">                                    
                                    <button onClick={()=>{setShowModal({visible:true, data:item})}} 
                                        type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                        Edit
                                    </button>                                    
                                    <button onClick={()=> deleteBmnById(item.nomor_bmn).then(mutate(address))} 
                                        type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                                        Delete
                                    </button>
                                    
                                    {/*<button onClick={()=> editBmnById(item.nomor_bmn).then(mutate(address))} type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Test Update</button> */}
                                
                                </td>                                 
                            </tr>
                        ))
                    }
                    </tbody>            
                </table>
            </div>
            <div className="pagination w-6/12 flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button onClick={prev} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Prev
                </button>
                <p className="mr-3">{page}/{maxPage}</p>
                <button onClick={next} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Next
                </button>
            </div>                                                   
        </div>  
      
        </Fragment>        
    )
}

/*
async function editBmnById(nomor_bmn){
    const editId = nomor_bmn;
    console.log("idBmn to edit: ", editId);    

    //https://www.youtube.com/watch?v=IfJaGxIqijE
    //https://morioh.com/p/059573f49760

    try{
        
        const req = {
            serial_number : 'req.body.serial_number',
            jenis_bmn: 'UPS',
            merk: 'req.body.merk',
            tipe: 'req.body.tipe',
            os: 'req.body.os',
            office: 'req.body.office',
            antivirus: 'req.body.antivirus',                        
            nama_pemegang: 'req.body.nama_pemegang',
            nip: 'req.body.nip',
            ruangan: 'req.body.ruangan',  
            asal_pengadaan: 'req.body.asal_pengadaan',                      
            tahun: 'req.body.tahun',
            kondisi: 'req.body.kondisi',
        }       

        console.log("JSON Stringify", JSON.stringify(req))
        const options = {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(req)
        }
        
        const res = await fetch(`../api/products/${editId}`, options)
        
        const response = await res.json();
        //console.log(response.jenis_bmn);

        //const vals = Object.values(response);
        //console.log(vals)
        console.log(Object.values(response));         
        
        //setModeldata(response);

    }catch(err){
        console.log(err);
    }      
}
*/

async function deleteBmnById(nomor_bmn){
    //const {mutate} = useSWRConfig;
    const deleteId = nomor_bmn;
    console.log("deleteId: ", deleteId);

    const resp = await fetch(`../api/products/${deleteId}`,{
        method: 'DELETE'
    })
    .then(
        res => console.log("SUCCESS: "+res.json())
        
        )
    .catch(e => console.log("Error: " +e))
    //.then(mutate('api/'))
    
}

export async function getServerSideProps({req}){
    const session = await getSession({req})

    //unauthorized user returns to home
    if(!session){
        return{
            redirect:{
                destination:"/login",
                permanent: false
            }
        }
    }    

    //authorized user returns session
    return{
        props:{session}  
    }
}


//======================== UNUSED FUNCTION ========================================//
/**
 
function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({
        columns,
        data,
      });
} 

function Header(){
    return(
        <h1>Daftar BMN</h1>
    )
}
 */
//tadinya mau pakai getData, tapi engga jadi, pakai SWR aja
/*
async function getData({req}){
    const router = useRouter();
    //console.log(req)
    
    const options = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(req)
    }

    await fetch('http://localhost:3000/api/auth/getBmn', options)
        .then(res => res.json())
        
        //.then(data => console.log(data))
        //return res
        .then((data) => {
            //console.log(data);
            return data;
            //if(data) router.push('http://localhost:3000');
            //return data;
            
        })            
}

*/