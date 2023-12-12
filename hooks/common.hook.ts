import { useState, useEffect } from "react";

const useIsMobile = () => {
  const [is_mobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(document.documentElement.clientWidth <= 600);
    const handleReSize = () => {
      setIsMobile(document.documentElement.clientWidth <= 600);
    };
    window.addEventListener("resize", handleReSize);
    return () => {
      window.removeEventListener("resize", handleReSize);
    };
  }, []);
  return is_mobile;
};


const useIsMounted = ()=>{
  const [is_mounted,setIsMounted] = useState(false);
  useEffect(()=>{
    setIsMounted(true);
    return(()=>{
      setIsMounted(false);
    })
  },[])
  return is_mounted;
}

export { useIsMobile, useIsMounted };
