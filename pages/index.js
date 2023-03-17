import Head from 'next/head'
//import Image from 'next/image'
//import { Inter } from '@next/font/google'
//import styles from '@/styles/Home.module.css'
import Link from 'next/link'
//import { useState } from 'react'

import { getSession, useSession, signIn, signOut } from "next-auth/react";

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  //const[session, setSession]=useState(true);

  const {data:session} = useSession();

  function handleSignOut(){
    signOut();
  }

  return (
    <>
      <Head>
        <title>Home Page</title>
      </Head>

      {session? User({session, handleSignOut}):Guest()};

      {/**comment un comment  {User()} guess or authorized user */}

      {/**
       * <main className={styles.main}>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      </main>
       * 
       * 
       */}
      
    </>
  )
}

//Guest
function Guest(){
  return(
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>Guest Homepage</h3>

    <div className='flex justify-center'>
      <Link href={'/login'}  className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Sign In</Link>
    </div>
    </main>
  )
}

//Authorized
function User({session, handleSignOut}){
  return(
  <main className='container mx-auto text-center py-20'>
    <h3 className='text-4xl font-bold'>Authorized User Homepage</h3>

    {/**Show name and email */}
    <div className='details'>
      <h5>{session.user.name}</h5>
      <h5>{session.user.email}</h5>
    </div>

    <div className='flex justify-center'>
      <button onClick={handleSignOut} className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 bg-red-500'>Sign Out</button>
    </div>

    <div className='flex justify-center'>
      <Link href={'/profile'}  className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Profile</Link>
    </div>

    <div className='flex justify-center'>
      <Link href={'/daftarbmn'}  className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Daftar BMN</Link>
    </div>

    <div className='flex justify-center'>
      <Link href={'/tambahbmn'}  className='mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50'>Tambah BMN</Link>
    </div>
  </main>
  )
}

//protect home access
export async function getServerSideProps({req}){
  const session = await getSession({req});

  if(!session){
    return{
      redirect:{
        destination:'login',
        permanent:false
      }
    }
  }

  return{
    props:{session}
  }
}