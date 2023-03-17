import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/conn";
import Users from "@/model/Schema";
import { compare } from "bcryptjs";

export default NextAuth({
    providers:[
        //Google Provider
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        }),
        GithubProvider({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET
        }),
        CredentialsProvider({
            name:"Credentials",
            async authorize(credentials, req){
                connectMongo().catch(error => {error:"Connections Failed"})
                
                //check user existance
                const user = await Users.findOne({email:credentials.email})
                if(!user){
                    throw new Error("No user found with email, please sign up")
                }
                
                //compare password bycriptjs
                const checkPassword = await compare(credentials.password, user.password);

                //incorrect password
                if(!checkPassword||user.email!==credentials.email){
                    throw new Error("Username or Password doesnt match");
                }

                return user;
            }
        })
    ],
    secret:"8z4YKII9WmGwwU81wPW55xZHoNe5Dg6FY2gfUrmou7ztnHczP7YYo1KG38xP71jLUZ6dtHDzRMQhtosXymNLuQ=="
    
})