import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect ,useState} from "react";


// Components
import LoginModal from "../components/login/LoginModal";


// styles
import useLoginStyles from "@/styles/login.style";


// Redux
import { user } from "@/store/user.slice";
import { useAppSelector } from "@/hooks/redux";


const Login:NextPage = ()=>{
    const _user = useAppSelector(user);
    const [isLoading,setIsLoading] = useState(false);
    const classes = useLoginStyles();
    const router = useRouter();

    useEffect(()=>{
        setIsLoading(true);
    },[])


    /*useEffect(()=>{
        if(_user.username){
            router.push("/");
        }
    },[_user])*/
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
                    <LoginModal keepShowingModal = {true}/>
                </div>
            }
        </>
    )
}

export default Login;