import { useEffect } from "react"


const useAudioRecorder = ()=>{
    useEffect(()=>{
        (async function(){
            const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(mediaStream);
            console.log("value of mediastream", mediaStream);
            })()
    },[])
}


export default useAudioRecorder;