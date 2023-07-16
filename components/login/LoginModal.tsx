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
    signUpHandler
} from "@/store/login.slice";


// Formik

import { Formik } from "formik";

// Styles
import useLoginStyles from "@/styles/login.style";


const LoginModal:FC = ()=>{
    const dispatch = useAppDispatch();
    const _showModal  = useAppSelector(showModal);
    const classes = useLoginStyles();


    return(
        <Modal
            open = {_showModal}
            onClose = {()=>dispatch(toggleModal(false))}
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
                onSubmit={(values,{setSubmitting})=>dispatch(signUpHandler(values))}
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
                                    <Grid item >
                                        <Input
                                        value = {values.username}
                                        className = {classes.loginInputField}
                                        fullWidth
                                        disableUnderline
                                        name = "username"
                                        placeholder = "Gamer Tag (Username)"
                                        type = "text"
                                        onChange = {handleChange}
                                        />
                                    </Grid>
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
            </Box>
        </Modal>
    )
}

export default LoginModal;