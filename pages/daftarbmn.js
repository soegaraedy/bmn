import { getSession } from "next-auth/react";
//import { useTable } from "react-table";
import React, {Fragment, useState} from "react";
import useSWR, { useSWRConfig, mutate } from "swr";
import { useRouter } from "next/router";

//Listbox from headless ui
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

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

    const filters = [
        {id: 1, filterName: 'Semua'},
        {id: 2, filterName: 'PC'},
        {id: 3, filterName: 'Laptop'},
        {id: 4, filterName: 'UPS'},
    ];
    const[selectedFilter, setSelectedFilter] = useState(filters[0]);

    const [options, setOptions] = useState({
        page: 1,
        perpage: 10,
        filterName: 'Semua'
    });

    const [search, setSearch] = useState('');

    /**SWR */
    const address = `../api/auth/getBmn/?page=${options.page}&perpage=${options.perpage}&filterJenisBmn=${options.filterName}`;
    const fetcher = (...args) => fetch(...args).then(res=>res.json());
    const {data, error} = useSWR(address, fetcher);    
    if(error) return <div>Failed to load</div>
    if(!data) return <div>Loading</div>
    
    
    const vals = Object.values(data);
    
    
   

    const totalData = data.total_data;
    //console.log("totalData: ", totalData);
    const maxPage = Math.ceil(totalData/perpage);

    const next = ()=>{
        //setPage( page === maxPage? page: page+1);
        setOptions(options.page === maxPage? {...options, page:options.page} : {...options, page:options.page+1});
        setShowModal({visible:false, data:[]});
    }
    const prev = ()=>{
        //setPage(page > 1 ? page-1 : 1);
        setOptions(options.page > 1 ? {...options, page:options.page-1} : {...options, page:1});
        setShowModal({visible:false, data:[]});
    }
       
    /*
    const perPage = (perHalaman) =>{
        setPerpage(perpage = perHalaman)
        console.log("perpage changed: ", perpage)
    }
    */

    function perubahanIklim(change){
        console.log("Change: ", change.filterName);
        setOptions(options.page !== 1 ? {...options, page:1, filterName:change.filterName} : {...options, filterName:change.filterName});
        setShowModal({visible:false, data:[]});
    }

    return(              

        <Fragment> 
        
        {showModal.visible && <Modal setOpenModal={showModal} />}  
        
        <div className="text-gray-900 bg-gray-200" >
            <div className="p-4 flex">
                <h1 className="text-3xl">Daftar Perangkat  TI</h1>
            </div>  
                       
        {/**Select Jenis BMN */}
            <div className="top-1 w-72 px-3">           

                <Listbox value={options} onChange={perubahanIklim}>
                    <div className="relative mt-1">
                        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                            <span className="block truncate">{options.filterName}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                            </span>
                        </Listbox.Button>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filters.map((filter) => (
                                <Listbox.Option
                                key={filter.id}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                    }`
                                }
                                value={filter}
                                >
                                {({ selected }) => (
                                    <>
                                    <span
                                        className={`block truncate ${
                                        selected ? 'font-medium' : 'font-normal'
                                        }`}
                                    >
                                        {filter.filterName}
                                    </span>
                                    {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                        </span>
                                    ) : null}
                                    </>
                                )}
                                </Listbox.Option>
                            ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </Listbox>

                <div>
                    <form>
                        <p className="rounded  py-1 mt-4 w-full">Per Page</p>
                        <select data-te-select-init>
                            <option >10</option>
                            <option disabled>30</option>
                            <option disabled>50</option>
                            <option disabled>100</option>
                        </select>

                        <input className="rounded  py-1 mt-4 w-full pl-3" type="text" name="search" placeholder="Search" 
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        />

                        
                    </form> 
            </div>   
            </div>

            
            
        {/**Select Perpage */}

                   
               
            
            <div className="px-3 py-8 justify-center top-1" >
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
                        Object.values((vals[1])
                        .filter((items)=>{
                            //console.log("items: ", items.jenis_bmn)
                            return search.toLowerCase() === '' ?
                            //items : items.toString().jenis_bmn.toLowerCase().includes(search)
                            items : items.jenis_bmn.toLowerCase().includes(search) || 
                                    items.nomor_bmn.toLowerCase().includes(search) ||
                                    items.merk.toLowerCase().includes(search) ||
                                    //items.tipe.toLowerCase().includes(search) || //items.tipe ada null value jadi skip aja
                                    items.nama_pemegang.toLowerCase().includes(search) ||
                                    items.ruangan.toLowerCase().includes(search) ||
                                    items.kondisi.toLowerCase().includes(search) 
                                    //console.log("typeof", items.jenis_bmn.toLowerCase().includes(search));
                            
                        })
                        )                    
                        .map((item) =>(
                            
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
                <p className="mr-3">{options.page}/{maxPage}</p>
                <button onClick={next} className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">
                    Next
                </button>
            </div>                                                   
        </div>  
      
        </Fragment>        
    )
}

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
