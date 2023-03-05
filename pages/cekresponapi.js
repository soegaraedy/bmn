//https://www.youtube.com/watch?v=_LL5IAC8w-k

import { useState } from "react";
import useSWR from "swr";

const Products = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const { data } = useSWR(
      `/api/products?page=${page}&limit=${limit}`
    );
    const onPrevBtn = () => {
      setPage((prev) => prev - 1);
    };
    const onNextBtn = () => {
      setPage((prev) => prev + 1);
    };
    return (
        <div>
        <div>
          {data?.products?.map((product) => (
            <div key={product.id}>
              <span>{product.name}</span>
              <span>{product.price}</span>
            </div>
          ))}
        </div>
        <div>
      <button onClick={onPrevBtn}>이전</button>
      <button onClick={onNextBtn}>다음</button>
      </div>
      </div>
    );
  };
  
  export default Products;









/*
import React, {useState, useEffect} from "react"

export default function FunctionOne(){
    const myId = "3100102001-260"
    //belum bisa myId aduh 
    return(
        <MyGetBmnById />
    )
}

//https://www.youtube.com/watch?v=JG1Bc-uj5jI

//belum bisa myId ???

const MyGetBmnById = () => {
    const idBmn = "3100102001-60";
    //const idBmn = myId;
    const [editBmn, setEditBmn] = useState([]);

    useEffect( () => {
        async function getBmnById(){
            try{                
                const res = await fetch(`../api/products/${idBmn}`,{method:'GET'})
                
                const response = await res.json();
                console.log(response.jenis_bmn);

                const vals = Object.values(response);
                console.log(vals);
                  

            }catch(err){
                console.log(err);
            }
        }

        getBmnById();

    },[]);

    return (
        <div>
            <h1>Get BMN By Id</h1>
            {
                editBmn.nomor_bmn === "" ? "tidak ada nomor bmn":"ada nomor bmn"
                
            }

            {
                editBmn.nomor_bmn
            }
       
        </div>
    )
    //return <div>{editBmn}</div>
}   
*/
