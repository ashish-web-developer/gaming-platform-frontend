import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';


// import required modules
import { EffectCards } from 'swiper/modules';


// Types
import { ReactNode,FC } from 'react';


interface Props {
    children : ReactNode
}
const SwiperCard:FC<Props> = ({children})=>{
  return (
    <>
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {children}
      </Swiper>
    </>
  );
}


export default SwiperCard;