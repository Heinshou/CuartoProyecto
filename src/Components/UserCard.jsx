import React from 'react'
import axios from 'axios'
import { HiTrash, HiPencil } from 'react-icons/hi';

const UserCard = ({user, getUsers, setObjectUpdate, setIsShownForm, reset}) => {

    const deleteUser = id => {

        axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
            .then(res => console.log('eliminaó'))
            .catch(err => console.log('valiomaye'))
            .finally(getUsers)
    }

    const updateUser = () => {
        setIsShownForm(true)
        const obj ={
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: user.password,
            birthday: user.birthday
        }
        reset(obj)
        setObjectUpdate(user)
    }

  return (

    <article className='Card'>
        <h2>{user.first_name} {user.last_name}</h2>
        <p>{user.email}</p>
        {/* <p>{user.password}</p> */}
        <p>{user.birthday}</p>
        <button className='icon_button' onClick={() => deleteUser(user.id)}><HiTrash/></button>
        <button className='icon_button pencil' onClick={updateUser}><HiPencil/></button>
    </article>
  )
}

export default UserCard