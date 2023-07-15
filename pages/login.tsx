import type { NextPage } from "next";
import Head from "next/head";
import { useEffect ,useState} from "react";


// Components
import LoginModal from "../components/login/LoginModal";


// styles
import useLoginStyles from "@/styles/login.style";



const Login:NextPage = ()=>{
    const [isLoading,setIsLoading] = useState(false);
    const classes = useLoginStyles();

    useEffect(()=>{
        setIsLoading(true);
    },[])
    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com"/>
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
            </Head>
            {
                isLoading &&
                <div className = {classes.root}>
                    <LoginModal/>
                </div>
            }
        </>
    )
}

export default Login;