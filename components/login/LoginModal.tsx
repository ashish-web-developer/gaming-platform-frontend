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
    name,
    username,
    email,
    password,
    toggleModal,
    updateName,
    updateUserName,
    updateEmail,
    updatePassword,
} from "@/store/login.slice";


// Styles
import useLoginStyles from "@/styles/login.style";


// Axios
import { Axios } from "@/helpers/axios";

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
                <div className = {classes.loginInputContainer}>
                    <Grid direction = "column" spacing = {2} container>
                        <Grid item>
                            <Input
                            className = {classes.loginInputField}
                            fullWidth
                            disableUnderline
                            name = "name"
                            placeholder = "Name"
                            type = "text"
                            onChange = {(event)=>{dispatch(updateName(event.target.value))}}
                            />


                        </Grid>
                        <Grid item >
                            <Input
                            className = {classes.loginInputField}
                            fullWidth
                            disableUnderline
                            name = "username"
                            placeholder = "Gamer Tag (Username)"
                            type = "text"
                            onChange = {(event)=>{dispatch(updateUserName(event.target.value))}}
                            />

                        </Grid>
                        <Grid item >
                            <Input
                            className = {classes.loginInputField}
                            fullWidth
                            disableUnderline
                            name = "email"
                            placeholder = "Email"
                            type = "email"
                            onChange = {(event)=>(dispatch(updateEmail(event.target.value)))}
                            />

                        </Grid>
                        <Grid item >
                            <Input
                            className = {classes.loginInputField}
                            fullWidth
                            disableUnderline
                            name = "password"
                            placeholder = "Password"
                            type = "password"
                            onChange = {(event)=>(dispatch(updatePassword(event.target.value)))}
                            />

                        </Grid>
                    </Grid>
                    <Button 
                        className = {classes.loginCta}
                        onClick={()=>submitHandler()}
                        variant="contained"
                        fullWidth
                    >
                        Continue
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default LoginModal;