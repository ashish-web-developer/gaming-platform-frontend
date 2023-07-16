import type { FC } from "react"
import Image from "next/image";

// Mui Components
import { 
    Modal ,
    Button,
    Box,
    Input,
    Grid
} from "@mui/material";

// Redux
import { 
    useAppDispatch, 
    useAppSelector 
} from "@/hooks/redux";


import { 
    showModal,
    toggleModal,
    updateShowLogin,
    signUpHandler,
    loginHandler,
    showLogin
} from "@/store/login.slice";


// Formik

import { Formik } from "formik";

// Styles
import useLoginStyles from "@/styles/login.style";


interface Props {
    keepShowingModal:boolean;
}
const LoginModal:FC<Props> = ({keepShowingModal})=>{
    const dispatch = useAppDispatch();
    const _showModal  = useAppSelector(showModal);
    const _showLogin = useAppSelector(showLogin)
    const classes = useLoginStyles();


    return(
        <Modal
            open = {_showModal}
            onClose = {()=>{
                if(keepShowingModal) return;
                dispatch(toggleModal(false));
            }}
        >
            <Box className = {classes.modalContainer}>
                <h1 className = {classes.modalTitle}>Playground</h1>
                <Image alt = "logo" width = "200" height = "200" src = "/logo_1.png"/>
                <Formik 
                initialValues={{
                    name:"",
                    email:"",
                    username:"",
                    password:""
                }}
                onSubmit={(values,{setSubmitting})=>{
                    if(_showLogin){
                        const emailPattern = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
                        if(emailPattern.test(values.username)){
                            dispatch(loginHandler({email:values.username,password:values.password}));
                            return;
                        }
                        dispatch(loginHandler({username:values.username,password:values.password}));
                    }else{
                        dispatch(signUpHandler(values));
                    }
                }}
                >
                    {({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        isSubmitting
                    })=>(
                            <div className = {classes.loginInputContainer}>
                                <Grid direction = "column" spacing = {2} container>
                                    {
                                        !_showLogin && 
                                        <Grid item>
                                            <Input
                                            value = {values.name}
                                            className = {classes.loginInputField}
                                            fullWidth
                                            disableUnderline
                                            name = "name"
                                            placeholder = "Name"
                                            type = "text"
                                            onChange = {handleChange}
                                            />
                                        </Grid>
                                    }
                                    <Grid item >
                                        <Input
                                        value = {values.username}
                                        className = {classes.loginInputField}
                                        fullWidth
                                        disableUnderline
                                        name = "username"
                                        placeholder = {_showLogin?"Email Or Gamer Tag (Username)":"Gamer Tag (Username)"}
                                        type = "text"
                                        onChange = {handleChange}
                                        />
                                    </Grid>
                                    {
                                        !_showLogin &&
                                        <Grid item >
                                            <Input
                                            value = {values.email}
                                            className = {classes.loginInputField}
                                            fullWidth
                                            disableUnderline
                                            name = "email"
                                            placeholder = "Email"
                                            type = "email"
                                            onChange = {handleChange}
                                            />

                                        </Grid>
                                    }
                                    <Grid item >
                                        <Input
                                        value = {values.password}
                                        className = {classes.loginInputField}
                                        fullWidth
                                        disableUnderline
                                        name = "password"
                                        placeholder = "Password"
                                        type = "password"
                                        onChange = {handleChange} 
                                        />

                                    </Grid>
                                </Grid>
                                <Button 
                                    className = {classes.loginCta}
                                    onClick={()=>handleSubmit()}
                                    variant="contained"
                                    fullWidth
                                >
                                    Continue
                                </Button>
                            </div>
                    )}
                </Formik>
                {
                    !_showLogin &&
                    <p className = {classes.switchModal}>Already a member?<Button className = {classes.switchModalSpan} onClick = {()=>dispatch(updateShowLogin(true))} variant="text">Login</Button></p>
                }
                {
                    _showLogin &&
                    <p className = {classes.switchModal}>Not a member?<Button className = {classes.switchModalSpan} onClick = {()=>dispatch(updateShowLogin(false))} variant="text">Sign Up</Button></p>
                }
            </Box>
        </Modal>
    )
}

export default LoginModal;