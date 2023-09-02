import Image from "next/image";
import { useState , useEffect} from "react";

// styled components
import { StyledWelcomeCardImage } from "@/styles/components/memory-game/welcome-card-image.style";

// framer motion
import {motion} from "framer-motion";
import { Opacity } from "@mui/icons-material";
const WelcomeCardImage = () =>{
    const [cardIImageNumber,setCardImageNumber] = useState(1);



    useEffect(()=>{
      const timer = setInterval(()=>{
        setCardImageNumber((prev)=>prev+1);
      },3000)
      return ()=>{
        clearInterval(timer);
      }
    },[])

    useEffect(()=>{
      if(cardIImageNumber == 10){
        setCardImageNumber(1);
      }
    },[cardIImageNumber])
    return(

        <StyledWelcomeCardImage
          key = {cardIImageNumber}
          initial = {{
            scale:1.4,
            opacity:0,
            rotate:180
          }}
          animate = {{
            scale:1,
            opacity:1,
            rotate:0
          }}
          transition={{
            duration:0.3
          }}
        >
          <motion.img
          />
          <Image width = {150} height = {221.67} src = {`/memory-game/welcome-interface/queen-card/queen-card-girl-${cardIImageNumber}.svg`} layout="responsive" alt = "queen-card" />
        </StyledWelcomeCardImage>
    )
}

export default WelcomeCardImage;