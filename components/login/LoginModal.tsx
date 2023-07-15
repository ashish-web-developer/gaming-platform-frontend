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
    toggleModal 
} from "@/store/login.slice";


// Styles
import useLoginStyles from "@/styles/login.style";

const LoginModal:FC = ()=>{
    const dispatch = useAppDispatch();
    const _showModal:boolean  = useAppSelector(showModal);
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
                            />

                        </Grid>
                        <Grid item >
                            <Input
                            className = {classes.loginInputField}
                            fullWidth
                            disableUnderline
                            name = "email"
                            placeholder = "Email"
                            type = "text"
                            />

                        </Grid>


                    </Grid>
                    <Button 
                        className = {classes.loginCta}
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