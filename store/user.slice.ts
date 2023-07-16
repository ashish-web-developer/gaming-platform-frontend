import { createSlice ,PayloadAction} from "@reduxjs/toolkit";


// Types
import type { User } from "@/types/user";
import { RootState } from "./rootReducer";


const initialState:User = {
    id:null,
    name:null,
    username:null,
    email:null,
    admin:0,
    email_verified_at:null,
    created_at:null,
    updated_at:null
}

const userSlice = createSlice({
        name:"user",
        initialState,
        reducers:{
            updateUser:(state,action:PayloadAction<User>)=>{
                state = action.payload;
            }
        }
})


export const {updateUser} = userSlice.actions;
export const user = (state:RootState) => state.user;
export default userSlice.reducer;
