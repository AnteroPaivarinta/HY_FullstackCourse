
import axios from 'axios'
import React, { useState} from 'react';

const App = () => {
  
  
  const baseurl="http://localhost:3001/persons"

  const [array, setArray]=useState([{ name: 'Arto Hellas' , puh: '0', id: 1 }])
  let [id, setId]=useState(1)
  let booleann=false
  const [filter, setFilter]=useState('')
  const [newPuh, setNewPuh]=useState('')
  const [ newName, setNewName ] = useState('')
  const [ hlo, setNewHlo ] = useState(
    { name: '' , puh: '' }
  ) 
    const [ persons, setPersons] = useState([
      { name: 'Arto Hellas' , puh: '044430958', id: 1 }
    ]) 
  const takeFilter=(event)=>{
    event.preventDefault()
     booleann=false
     setFilter(event.target.value)
   }
   const readPuh=(event)=>{
    event.preventDefault()
    setNewPuh(event.target.value)
  }
  const readString=(event)=>{
    event.preventDefault()
    setNewName(event.target.value)
    
  }
  
  const handleNoteChange = (event) => {
    event.preventDefault()
    console.log(array.length+" joo")
   
      // Update the document title using the browser API
for(let i=0;i<array.length;i++){
  console.log(array[i].name," FOR LOOP")
}

    console.log("NEWNAME: ",newName)
    console.log(array.length,"<_ length")
    console.log(" NIMII: ")
for(let i=0;i<array.length;i++){
  if(array[i].name===newName){
    console.log("NEW NAME", newName , "ja puh: ",newPuh)
    booleann=true

    if (window.confirm("The name already exists. Do you want to fix name's number?: "+array[i].name+" phonenumber; ",array[i].puh, "index: ", i, "id:",array[i].id)) {
      console.log("INDEKSI",i,"PUH: ", array[i].puh, "NIMI: ",array[i].name, "ID: ", array[i].id)
      console.log("POISTETAAN: ",array[i].name, array[i].puh, "ID", array[i].id)
      const arr=array.filter(note => note.puh!==array[i].puh)
      let x=array[i].id
      arr.push({name: newName, puh: newPuh, id: x})
      setArray(arr)
     console.log("poistettavan id ID: ",x )
      
      axios
      .put(`${baseurl}/${x}`, {name: newName , puh: newPuh, id: x})
      .then(response => {
      
      
    }) 
    .catch(error => {
      console.log(error, "FAIL")
   })
   

   
   break;
    }
    else{
      console.log("CHECKATAAN IFFIN ELSE")
      break;
    }
    
  }
  

}
console.log(booleann)
if(booleann===false){
  
  id=id+1;
  setId(id)
 
      axios
    .post('http://localhost:3001/persons', { name: newName , puh: newPuh, id: id })
  .then(response => {
    
    
  }).catch(error => {
    console.log(error+" t??m?? error")
 })

 axios
 .post(`${baseurl}/${id}`, { name: newName , puh: newPuh, id: id })
.then(response => {
  console.log("Postataan: ", baseurl, newName, newPuh, id)
 
}).catch(error => {
 console.log(error)
})


 array.push({name: newName , puh: newPuh, id: id})


  }
  }

  const remove = (value) => {
    
    axios
    .delete(`${baseurl}/${value.id}`)
  .then(response => {
   setArray(array.filter(n=>n.id !== value.id))
  }).catch(error => {
    console.log(error)
 })
  


  }

  const notesToShow = booleann
  ? array
  : array.filter(person => person.name.includes(filter))


  
    // Update the document title using the browser API
    

    
      return (
        <div> 
          <h2>Phonebook</h2>
          <div>Filter shown with: <input onChange={takeFilter}/></div>
         
          <form>
            <div>
           
            <div>Name: <input onChange={readString} /></div>
            <div>number: <input onChange={readPuh}/></div>
            </div>
            <div>
              <button type='submit' onClick={handleNoteChange} >add</button>
              
            </div>
          </form>
          <h2>Numbers</h2>   
          {notesToShow.map(person=> <div>{person.name} {person.puh}  <button onClick={()=>{remove(person)}}>Remove</button>  </div>)}
        </div>
      )
    
}
export default App;
