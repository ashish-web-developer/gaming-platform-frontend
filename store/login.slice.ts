import { 
    createSlice, 
    PayloadAction,
    createAsyncThunk
} from "@reduxjs/toolkit";

import { updateUser } from "@/store/user.slice";

// Types
import { LoginInitialState ,} from "@/types/redux";
import { User } from "@/types/user";

import type { RootState } from "./rootReducer";

// Axios
import { Axios } from "@/helpers/axios";


// Cookie
import Cookies from "universal-cookie"


const cookies = new Cookies();

type LoginResponse = {
    success:boolean,
    user:User,
    token:string
}
type RegisterArgs = {
    name:string,
    username:string,
    email:string,
    password:string,
}

type LoginArgs = {
    username?:string,
    email?:string,
    password:string,
}

export const signUpHandler = createAsyncThunk<LoginResponse,RegisterArgs>(
    "api/register",
    async ({name,username,email,password},{rejectWithValue,dispatch})=>{
        try{
            const res = await Axios.post("/register",{
                name,
                username,
                email,
                password
            })
            cookies.set("token",res.data.token);
            dispatch(updateUser(res.data.user));
            return res.data;
        }catch(error:any){
            return rejectWithValue(error?.response?.data)
        }
    }
) 

export const loginHandler = createAsyncThunk<LoginResponse,LoginArgs>(
    "api/register",
    async ({username,email,password},{rejectWithValue,dispatch})=>{
        try{
            const res = await Axios.post("/login",{
                username,
                email,
                password
            })
            cookies.set("token",res.data.token);
            dispatch(updateUser(res.data.user));
            return res.data;
        }catch(error:any){
            return rejectWithValue(error?.response?.data)
        }
    }
) 

const initialState:LoginInitialState = {
    showModal:true,
    showLogin:false,
}

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        toggleModal:(state,action:PayloadAction<boolean>)=>{
            state.showModal = action.payload;
        },
        updateShowLogin:(state,action:PayloadAction<boolean>)=>{
            state.showLogin = action.payload
        }
    }
})


export const {toggleModal,updateShowLogin}  = loginSlice.actions;
export const showModal = (state:RootState) => state.login.showModal;
export const showLogin = (state:RootState) => state.login.showLogin;
export default loginSlice.reducer;