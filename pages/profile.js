import { getSession } from "next-auth/react";
import Link from "next/link";

const profile = () => {
    return(
        <section className="container mx-auto text-center">
            <h3 className="text-4xl font-bold">Profile Page</h3>

            <Link href="/">Home Page</Link>
        </section>
    )
}

profile.displayName = 'profile';
export default profile;

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

