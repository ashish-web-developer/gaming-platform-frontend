import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material";

const color = {
    primary:"rgb(3 13 9)",
    secondary:"rgb(16 9 22)",
    text:"#fffdff",
    button:"#8102f7",
    errors :"#d11534"
}

const useLoginStyles = makeStyles((theme:Theme)=>({
    root:{
        backgroundColor:color.primary,
        width:"100%",
        minHeight:"100vh",
    },
    modalContainer:{
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50%,-50%)",
        width:500,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        //boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.24)",
        borderRadius:"10px",
        backgroundColor:color.secondary,
        border:"3px solid rgb(31 26 37)",
        padding:"20px 0px 30px 0px",
        "&:focus-visible":{
            outline:"none"
        },
        [theme.breakpoints.down('sm')]: {
            width:"90%"
        },
    },
    modalTitle:{
        color:color.text,
        fontFamily: "'Poppins', sans-serif",
        textAlign:"center"
    },
    loginInputContainer:{
        width:"90%",
        marginTop:"16px"
    },
    loginInputField:{
        backgroundColor:color.primary,
        "&.MuiInput-root":{
            color:color.text,
            padding:"8px 16px",
            border:"2px solid rgb(31 26 37)",
            borderRadius:"10px"
        }
    },
    loginCta:{
        marginTop:"20px",
        "&.MuiButton-root":{
            backgroundColor:color.button,
            color:color.text,
            padding:"12px 16px",
            fontFamily: "'Poppins', sans-serif",
            marginTop:"20px",
            "&:hover":{
                backgroundColor:color.button,
            }
        }
    },
    switchModal:{
        color:color.text,
        fontFamily: "'Poppins', sans-serif",
        marginTop:"10px",
        fontSize:"14px"
    },
    switchModalSpan:{
        "&.MuiButton-root":{
            color:color.button,
            textTransform:"capitalize",
            textDecoration:"underline"
        }
    },
    passwordEndAdorment:{
        "&.MuiIconButton-root":{
            color:"#fff !important"
        }
    },
    validation:{
        color:color.errors,
        fontFamily: "'Poppins', sans-serif",
        fontSize:"12px",
        margin:"8px 8px 0px 0px",
    }
}))


export default useLoginStyles;