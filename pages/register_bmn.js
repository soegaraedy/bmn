import Head from "next/head";
import Layout from "@/layout/layout";
//import Link from "next/link";
import styles from '../styles/Form.module.css';
//import { useState } from "react";
import { useFormik } from "formik";
//
//import {HiAtSymbol, HiFingerPrint, HiOutlineUser} from "react-icons/hi";
import { registerBmnValidate } from "@/lib/validate";
import { useRouter } from "next/router";

export default function Register_bmn(){

    //const [show, setShow] = useState({password:false, cpassword:false});
    const router = useRouter();

    const formik = useFormik({
        initialValues:{            
            nomor_bmn: '',
            jenis_bmn: '',
            serial_number: '',
            merk: '',
            tipe: '', 
            os: '',
            office: '',
            antivirus: '',
            nama_pemegang: '',
            nip: '',
            ruangan: '',
            asal_pengadaan: '',
            tahun: '',
            kondisi: ''
        },
        validate:registerBmnValidate,
        onSubmit
    })

    //console.log to check in dev mode only, ga bagus keystroking
    async function onSubmit(values){
        //console.log("The values")
        //console.log(values)
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }

        await fetch('http://localhost:3000/api/auth/signupBmn', options)
            .then(res => res.json())
            //.then(data => console.log(data))
            //.then(data => console.log("Bawa data ini mau dioper ke signupBmn"))
            
            .then((data) =>{
               if(data) router.push('http://localhost:3000')
            })
    }

    return(
        <Layout>
            <Head>
                <title>Register BMN</title>
            </Head>
            
            {/*<h1>Login</h1>*/}
            <section className="w-3/4 mx-auto flex-1 flex-col gap-10">
                {/** title*/}
                <div className="title">
                    <h1 className='text-gray-800 tex-4xl font-bold py-4'>Add New BMN</h1>
                    {/** <p className='w-3/4 mx-auto text-gray-400'>Please Fill In</p>*/}
                    
                </div>
                
                {/** form*/}
                <form className='flex flex-col gap-1' onSubmit={formik.handleSubmit}>
                <div className={styles.input_group}>
                        <input 
                        type="text"
                        name="nomor_bmn"
                        placeholder="Nomor BMN"
                        className={styles.input_text}
                        {...formik.getFieldProps('nomor_bmn')}

                        />  
                                                                  
                    </div>
                    {formik.errors.nomor_bmn && formik.touched.nomor_bmn?<span className="text-rose-500">{formik.errors.nomor_bmn}</span>:<></>}
                    
                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name="jenis_bmn"
                        placeholder="Jenis BMN"
                        className={styles.input_text}
                        {...formik.getFieldProps('jenis_bmn')}

                        />  
                                                                   
                    </div>
                    {formik.errors.jenis_bmn && formik.touched.jenis_bmn?<span className="text-rose-500">{formik.errors.jenis_bmn}</span>:<></>}
                    
                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='serial_number'
                        placeholder='Serial Number'
                        className={styles.input_text}
                        {...formik.getFieldProps('serial_number')}

                        />     
                    </div>
                    {formik.errors.serial_number && formik.touched.serial_number?<span className="text-rose-500">{formik.errors.serial_number}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='merk'
                        placeholder='Merk'
                        className={styles.input_text}
                        {...formik.getFieldProps('merk')}

                        />                         
                    </div>
                    {formik.errors.merk && formik.touched.merk?<span className="text-rose-500">{formik.errors.merk}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='tipe'
                        placeholder='Tipe'
                        className={styles.input_text}
                        {...formik.getFieldProps('tipe')}

                        />    
                           
                    </div>
                    {formik.errors.tipe && formik.touched.tipe?<span className="text-rose-500">{formik.errors.tipe}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='os'
                        placeholder='Sistem Operasi'
                        className={styles.input_text}
                        {...formik.getFieldProps('os')}

                        />    
                          
                    </div>
                    {formik.errors.os && formik.touched.os?<span className="text-rose-500">{formik.errors.os}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='office'
                        placeholder='Office'
                        className={styles.input_text}
                        {...formik.getFieldProps('office')}

                        />    
                          
                    </div>
                    {formik.errors.office && formik.touched.office?<span className="text-rose-500">{formik.errors.office}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='antivirus'
                        placeholder='Anti Virus'
                        className={styles.input_text}
                        {...formik.getFieldProps('antivirus')}

                        />    
                        
                    </div>
                    {formik.errors.antivirus && formik.touched.antivirus?<span className="text-rose-500">{formik.errors.antivirus}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='nama_pemegang'
                        placeholder='Nama Pemegang'
                        className={styles.input_text}
                        {...formik.getFieldProps('nama_pemegang')}

                        />    
                         
                    </div>
                    {formik.errors.nama_pemegang && formik.touched.nama_pemegang?<span className="text-rose-500">{formik.errors.nama_pemegang}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='nip'
                        placeholder='NIP Pemegang'
                        className={styles.input_text}
                        {...formik.getFieldProps('nip')}

                        />    
                          
                    </div>
                    {formik.errors.nip && formik.touched.nip?<span className="text-rose-500">{formik.errors.nip}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='ruangan'
                        placeholder='Ruangan'
                        className={styles.input_text}
                        {...formik.getFieldProps('ruangan')}

                        />    
                         
                    </div>
                    {formik.errors.ruangan && formik.touched.ruangan?<span className="text-rose-500">{formik.errors.ruangan}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='asal_pengadaan'
                        placeholder='Asal Pengadaan'
                        className={styles.input_text}
                        {...formik.getFieldProps('asal_pengadaan')}

                        />    
                          
                    </div>
                    {formik.errors.asal_pengadaan && formik.touched.asal_pengadaan?<span className="text-rose-500">{formik.errors.asal_pengadaan}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='tahun'
                        placeholder='Tahun Pengadaan'
                        className={styles.input_text}
                        {...formik.getFieldProps('tahun')}

                        />    
                          
                    </div>
                    {formik.errors.tahun && formik.touched.tahun?<span className="text-rose-500">{formik.errors.tahun}</span>:<></>}

                    <div className={styles.input_group}>
                        <input 
                        type="text"
                        name='kondisi'
                        placeholder='Kondisi'
                        className={styles.input_text}
                        {...formik.getFieldProps('kondisi')}

                        />    
                         
                    </div>
                    {formik.errors.kondisi && formik.touched.kondisi?<span className="text-rose-500">{formik.errors.kondisi}</span>:<></>}
                                                      
                    {/** Buttons*/}
                    <div className='input-button'>
                        <button type="submit" className={styles.button}>
                            Submit
                        </button>                        
                    </div>                    
                </form>    

            </section>
        </Layout>
    )
}