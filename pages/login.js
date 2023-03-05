import Head from "next/head";
import Layout from "@/layout/layout";
import Link from "next/link";
import styles from '../styles/Form.module.css';
import Image from "next/image";
import {HiAtSymbol, HiFingerPrint} from "react-icons/hi";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "@/lib/validate";
import { useRouter } from "next/router";

export default function Login(){

    const [show, setShow] = useState(false);

    //formik hook
    const formik = useFormik({
        initialValues:{
            email:'',
            password:''
        },
        //generally put validate function here, but we put it in another file inside lib directory
        //validate:()=>{},
        validate: login_validate,
        onSubmit
    })

    //console the error to see
    //console.log(formik.errors)

    //useRouter
    const router = useRouter();

    async function onSubmit(values){
        //console.log(values)
        const status = await signIn('credentials',{
            redirect:false,
            email:values.email,
            password:values.password,
            callbackUrl:"/"
        })

        //console.log(status);
        if(status.ok) router.push(status.url);
    }


    //Google Handler Function
    async function handleGoogleSignin(){
        signIn('google',{callbackUrl:"http://localhost:3000"})
    }

    //Github Login
    async function handleGithubSignin(){
        signIn('github', {callbackUrl:"http://localhost:3000"})
    }

    return(
        <Layout>
            {/*this will be the children of Layout */}
            <Head>
                <title>Login Page</title>
            </Head>

            {/*<h1>Login</h1>*/}
            <section className="w-3/4 mx-auto flex-1 flex-col gap-10">
                {/** title*/}
                <div className="title">
                    <h1 className='text-gray-800 tex-4xl font-bold py-4'>Login Form</h1>
                    {/**<p className='w-3/4 mx-auto text-gray-400'>Welcome to authapp</p>*/}
                </div>                
                {/** form*/}
                <form className='flex flex-col gap-1' onSubmit={formik.handleSubmit}>
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
                    {/** 
                     * 
                     * {formik.errors.email && formik.touched.email?<span className="text-rose-500">{formik.errors.email}</span>:<></>} 
                    */
                    }
                    {formik.errors.email && formik.touched.email?<span className="text-rose-500">{formik.errors.email}</span>:<></>}
                    
                    
                    <div className={styles.input_group}>
                        <input 
                        type={`${show? "text":"password"}`}
                        name='password'
                        placeholder='password'
                        className={styles.input_text}
                        {...formik.getFieldProps('password')}

                        />    
                        <span className='icon flex items-center px-4' onClick={()=>setShow(!show)}>
                            <HiFingerPrint size={25}/>
                        </span>   
                        
                    </div>
                    {formik.errors.password && formik.touched.password?<span className="text-rose-500">{formik.errors.password}</span>:<></>}
                    {/** Buttons*/}
                    <div className='input-button'>
                        <button type="submit" className={styles.button}>
                            Login
                        </button>                        
                    </div>
                    <div className="input-button">
                        <button type="button" onClick={handleGoogleSignin} className={styles.button_custom}>
                            Sign In with Google
                            <Image src={'/assets/google.svg'} width="20" height={20} alt=''/>
                        </button>                        
                    </div>
                    <div className="input-button">
                        <button type="button" onClick={handleGithubSignin} className={styles.button_custom}>
                            Sign In with Github
                            <Image src={'/assets/github.svg'} width="20" height={20} alt=''/>
                        </button> 
                    </div>
                </form>
                
                {/**Bottom */}
                <p className='text-center text-gray-800'>
                    dont have account yet? {'\t'}
                    <Link href={'/register'} className='text-blue-800 font-bold'>Sign Up</Link>                
                </p>

            </section>
        </Layout>
    );
};

/*
function Login(){

    return(
        <div>
            <h1>Login</h1>
        </div>
    )
}

export default Login;
*/