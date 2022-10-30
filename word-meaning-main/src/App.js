import React, { useEffect } from 'react';
import './App.css';
import {useState} from "react";
import { useRef } from 'react';
import axios from 'axios';
import { BsSearch} from "react-icons/bs";
BsSearch
function App() {
  const [word,setWord] =useState("");
  const [wData,setWData]=useState("");
  const textRef=useRef();
  const [hindi,setHindi] = useState("")




  async function Translate() {
    try{
         const input_language='en'
           const output_language = 'hi'
           const res = await fetch("https://libretranslate.de/translate",{
            method:'POST',
              body: JSON.stringify({
                q:word,
               source:input_language,
               target:output_language,
                format: "text",
               }),
               headers: {
                 "Content-Type":'application/json'
                }
            });
          const { translatedText} = await res.json();
          setHindi(translatedText)
        // console.log(translatedText)
       }
      catch (err){console.log("err:",err)}
    }
    






  const searchWord=(e)=>{
    e.preventDefault()
    axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then((r)=>{
      setWData(r.data[0])
      Translate()
    }).catch((e)=>{
      console.log(e)
    })

    
  }

  

const playAudio =()=>{
let audio =new Audio(wData.phonetics[0].audio);
audio.play();
}
  return (
    <div className="App">
      
  
      <div className='main'>
         <div><h1>Search Word</h1></div>
         <div className='main1'>
           <form onSubmit={searchWord}>
           <div style={{display:'flex'}}>
           <input type={"text"} ref={textRef} onChange={(e)=> setWord(e.target.value)}/>
              <div  onClick={searchWord}><BsSearch  size={"30px"} color={"black"} style={{marginTop:"5px",marginLeft:"20px"}}/>
             </div>
           </div>

           </form>
         </div>
       </div>
     {wData && (<div>
      
      <div className='div1' style={{width:"97%",margin:"auto",textAlign:"left",display:"flex"}}><h2> Word : {"  "}{wData.word}{" "} ({hindi})</h2><div onClick={playAudio}><img className='voice' src="https://cdn.pixabay.com/photo/2017/01/10/03/54/icon-1968243_1280.png"/></div></div>
      <div className='div2' style={{width:"97%",margin:"auto",textAlign:"left",display:"flex"}}><h3>Definition {" "} </h3><h3 style={{fontWeight:"bold",marginLeft:"20px"}}>{wData.meanings[0].definitions[0].definition}</h3></div>
      <div className='div3' style={{width:"97%",margin:"auto",textAlign:"left",display:"flex"}}><h3>Antonyms {" "} </h3><h3 style={{fontWeight:"bold",marginLeft:"20px"}}>{wData.meanings[0].antonyms[0]}</h3></div>
      <div className='div4' style={{width:"97%",margin:"auto",textAlign:"left",display:"flex"}} ><h3>Synonyms {" "}</h3><h3 style={{fontWeight:"bold",marginLeft:"20px"}}> {wData.meanings[0].synonyms[0]},{wData.meanings[0].synonyms[1]},{wData.meanings[0].synonyms[2]} </h3></div>
      <div className='div5' style={{width:"97%",margin:"auto",textAlign:"left",display:"flex"}}><h3>Part Of Speech{" "} </h3><h3 style={{fontWeight:"bold",marginLeft:"20px"}}>{wData.meanings[0].partOfSpeech}</h3></div>
    
    
      
      
      
      
     </div>)}
    </div>
  );
}

export default App;
