import React from 'react'
import axios from 'axios'

const Form = ({URL, getUsers, updateUserById, register, handleSubmit, reset, objectUpdate}) => {

    
    const defaultValues =  {
    first_name: "",
    last_name:"",
    email:"",
    password:"",
    birthday:""
    }

    const createUser = newUser => {
        axios.post("https://users-crud1.herokuapp.com/users/", newUser)
        .then(res => 
          console.log(res.data),
        getUsers()
        )
          .catch(err => console.log('err'))
    }
    
    const submit = data => {
        if(objectUpdate.id !== undefined){
            updateUserById(objectUpdate.id, data)
            reset(defaultValues)
        } else {
        createUser(data)
      }
            getUsers() 
            reset(defaultValues)
    }
  return (
    <form onSubmit={handleSubmit(submit)}>
    <div>
            <label htmlFor='first_name'>First</label>
            <input type='text' id='first_name' {...register("first_name")} />
    </div>
    <div>
            <label htmlFor='last_name'>Last</label>
            <input type='text' id='last_name' {...register("last_name")} />
    </div>
    <div>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' {...register("email")} />
    </div>
    <div>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' {...register("password")} />
    </div>
    <div>
            <label htmlFor='date'>Date</label>
            <input type='date' id='date' {...register("birthday")} />
    </div>
    <button>Submit</button>
</form>

  )
}

export default Form