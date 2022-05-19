import React, { useState } from "react";
import {FiSearch} from 'react-icons/fi'

import './estilo.css'
import api from "./services/api";

const App = props =>{
    const [input, setInput] = useState('')
    const [cep, setCep] = useState({})
   async function search(){
       if(input === ''){
           alert('Preencha algum cep!')
           return;
       }
       try{
           const response = await api.get(`${input}/json`)
           setCep(response.data)
           setInput('')
       }catch{
           alert('ops erro ao buscar')
           setInput('')
       }
    }
    return(
        <div className="container">
           <h1 className="title">Buscar Cep</h1>
           <div className="containerInput">
               <input type="text" placeholder="Digite seu Cep" value={input} onChange={e => setInput(e.target.value)}/>

               <button className="search" onClick={search}>
                  <FiSearch size={25} color="FFF"/>
               </button>
           </div>

           {Object.keys(cep).length > 1 &&(
                <main className="main">
                    <h2>Cep: {cep.cep}</h2>

                    <span> {cep.logradouro} </span>
                    <span>Complemento: {cep.complemento === ""? 'Sem valor específico': cep.complemento} </span>
                    <span>Bairro: {cep.bairro}</span>
                    <span>Localidade: {cep.localidade} - {cep.uf} </span>
                    <span>DDD: {cep.ddd}</span>
                </main>
           )}
        </div>
    )
    
}

export default App