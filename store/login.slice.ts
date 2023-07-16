import { 
    createSlice, 
    PayloadAction,
    createAsyncThunk
} from "@reduxjs/toolkit";

import { updateUser } from "@/store/user.slice";

// Types
import { loginInitialState ,} from "@/types/redux";
import { User } from "@/types/user";

import type { RootState } from "./rootReducer";

// Axios
import { Axios } from "@/helpers/axios";


type LoginResponse = {
    success:boolean,
    user:User,
    token:string
}
type LoginArgs = {
    name:string,
    username:string,
    email:string,
    password:string,
}

export const signUpHandler = createAsyncThunk<LoginResponse,LoginArgs>(
    "api/login",
    async ({name,username,email,password},{rejectWithValue,dispatch})=>{
        try{
            const res = await Axios.post("/login",{
                name,
                username,
                email,
                password
            })
            dispatch(updateUser(res.data.user));
            return res.data;
        }catch(error:any){
            return rejectWithValue(error?.response?.data)
        }
    }
) 


const initialState:loginInitialState = {
    showModal:true,
}

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
        toggleModal:(state,action:PayloadAction<boolean>)=>{
            state.showModal = action.payload;
        },
    }
})


export const {toggleModal}  = loginSlice.actions;
export const showModal = (state:RootState) => state.login.showModal;
export default loginSlice.reducer;