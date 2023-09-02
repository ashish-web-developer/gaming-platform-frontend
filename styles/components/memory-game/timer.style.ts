import styled from "styled-components";
// framer motion
import {motion} from "framer-motion"


const StyledTimer = styled(motion.h1)`
  position: absolute;
  left: 50%;
  transform: translateX(-80%);
  bottom: 30px;
  font-family: ${({ theme }) => theme.palette.fontFamily.primary.monofett};
  color: #140f2d;
  font-size: 100px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-transform: uppercase;
`;

export {
    StyledTimer
}