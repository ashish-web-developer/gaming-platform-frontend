import { createTheme } from "@mui/material";

const lightPalette = {
    primary:{
        main:"#FFFFFF"
    },
    secondary:{
        main:"#f5f6f8"
    },
    text:{
        main:"#1C120E"
    },
    border:{
        searchbar:"#f1f1f2"
    }
}


const darkPalette = {
    primary:{
        main:"#000"
    }
}

const getTheme = (mode:"dark"|"light")=>{
    const theme = createTheme({
        palette:{
            mode,
            ...(mode=="dark"?darkPalette:lightPalette)
        }
    })
    return theme;
}


export default getTheme;