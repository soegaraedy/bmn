import Head from "next/head";
import Layout from "@/layout/layout";
import Link from "next/link";
import styles from '../styles/Form.module.css';
//import Image from "next/image";
import {HiAtSymbol, HiFingerPrint, HiOutlineUser} from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "@/lib/validate";
import { useRouter } from "next/router";


export default function Register(){

    const [show, setShow] = useState({password:false, cpassword:false});
    const router = useRouter();

    const formik = useFormik({
        initialValues:{
            username:'',
            email:'',
            password:'',
            cpassword:''
        },
        validate:registerValidate,
        onSubmit
    })

    //console.log to check in dev mode only, ga bagus keystroking
    async function onSubmit(values){
        //console.log(values)
        const options = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(values)
        }

        await fetch('http://localhost:3000/api/auth/signup', options)
            .then(res => res.json())
            //.then(data => console.log(data))
            .then((data) =>{
                if(data) router.push('http://localhost:3000')
            })
    }

    return(
        <Layout>
            <Head>
                <title>Register Page</title>
            </Head>
            
            {/*<h1>Login</h1>*/}
            <section className="w-3/4 mx-auto flex-1 flex-col gap-10">
                {/** title*/}
                <div className="title">
                    <h1 className='text-gray-800 tex-4xl font-bold py-4'>Registration Form</h1>
                    {/** <p className='w-3/4 mx-auto text-gray-400'>Please Fill In</p>*/}
                    
                </div>
                
                {/** form*/}
                <form className='flex flex-col gap-1' onSubmit={formik.handleSubmit}>
                <div className={styles.input_group}>
                        <input 
                        type="text"
                        name="username"
                        placeholder="Username"
                        className={styles.input_text}
                        {...formik.getFieldProps('username')}

                        />  
                        <span className='icon flex items-center px-4'>
                            <HiOutlineUser size={25}/>
                        </span>                                             
                    </div>
                    {formik.errors.username && formik.touched.username?<span className="text-rose-500">{formik.errors.username}</span>:<></>}
                    <div className={styles.input_group}>
                        <input 
                        type="email"
                        name="email"
                        placeholder="Email"
                        className={styles.input_text}
                        {...formik.getFieldProps('email')}

                        />  
                        <span className='icon flex items-center px-4'>
                            <HiAtSymbol size={25}/>
                        </span>                                             
                    </div>
                    {formik.errors.email && formik.touched.email?<span className="text-rose-500">{formik.errors.email}</span>:<></>}
                    <div className={styles.input_group}>
                        <input 
                        type={`${show.password? "text":"password"}`}
                        name='password'
                        placeholder='password'
                        className={styles.input_text}
                        {...formik.getFieldProps('password')}

                        />    
                        <span className='icon flex items-center px-4' onClick={()=>setShow({...show, password:!show.password})}>
                            <HiFingerPrint size={25}/>
                        </span>   
                    </div>
                    {formik.errors.password && formik.touched.password?<span className="text-rose-500">{formik.errors.password}</span>:<></>}
                    <div className={styles.input_group}>
                        <input 
                        type={`${show.cpassword? "text":"password"}`}
                        name='cpassword'
                        placeholder='Confirm Password'
                        className={styles.input_text}
                        {...formik.getFieldProps('cpassword')}
                        />    
                        <span className='icon flex items-center px-4' onClick={()=>setShow({...show, cpassword:!show.cpassword})}>
                            <HiFingerPrint size={25}/>
                        </span>   
                    </div>
                    {formik.errors.cpassword && formik.touched.cpassword?<span className="text-rose-500">{formik.errors.cpassword}</span>:<></>}
                    {/** Buttons*/}
                    <div className='input-button'>
                        <button type="submit" className={styles.button}>
                            Register
                        </button>                        
                    </div>                    
                </form>    
                <p>
                    Have an account?{'\t'}<Link href={'/login'} className='text-blue-800 font-bold'>Sign In</Link>    
                </p>                           
            </section>
        </Layout>
    )
}