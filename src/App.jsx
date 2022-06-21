import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import UserCard from './Components/UserCard'
import Form from './Components/Form'
import { useForm } from 'react-hook-form'

function App() {

  const { register, handleSubmit, reset } = useForm();

  const [users, setUsers] = useState()
  const [isShownForm, setIsShownForm] = useState(false)
  const [objectUpdate, setObjectUpdate] = useState()

  const URL = "https://users-crud1.herokuapp.com/users/"
 
  const getUsers = () =>{
    axios.get(URL)
      .then(res => setUsers(res.data))
      .catch(err => console.log('err'))

      console.log(users)
  }
  useEffect(() => {
    getUsers()
  }, [])
  
 const showForm = () => {
  const obj = {
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    birthday:""
  }
  reset(obj)
  setIsShownForm(!isShownForm)

 }
 const updateUserById = (id, data) => {
  axios.patch(`https://users-crud1.herokuapp.com/users/${id}/`, data)
      .then(res =>{
          console.log(res.data)
          getUsers()
          setObjectUpdate()
          setIsShownForm(false)
      })
      .catch(err => console.log('err'))
}

  return (
    <div className="App">
      <button onClick={showForm}>{isShownForm ? 'Ocultar' : 'Mostrar Formulario'}</button>
      {
        isShownForm &&  <Form
       
        URL={URL}
        getUsers={getUsers}
        updateUserById={updateUserById}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        objectUpdate={objectUpdate}
        />
      }
      <div className='conteiner_card'>
      { users?.map( user =>(
        <UserCard
        user={user}
        key={user.id}
        getUsers={getUsers}
        setObjectUpdate={setObjectUpdate}
        setIsShownForm={setIsShownForm}
        reset={reset}
        />
      ))
      }
      </div>
    </div>
  )
}

export default App
