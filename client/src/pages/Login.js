import React,{useState,useContext} from 'react'
import { Form,Button } from 'semantic-ui-react';
import { useMutation,gql} from '@apollo/client';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/auth';
const LOGIN_USER=gql`
  
  mutation login($username:String!,$password:String!){

    login(username:$username, password:$password) {
      id
      username
       token
       email
      createdDate
  
     }
  }

`

export default function Login(props) {
  const context=useContext(AuthContext);
  const [errors,setErrors]=useState({});
  const [values,setValues]=useState({
    username:"",
    password:"",
   
  })
  
  
  let navigate=useNavigate();
  const [login,{loading}]=useMutation(LOGIN_USER,{

    update(proxy,{data:{login:userData}}){
      context.login(userData)
      navigate("/",{replace:true})
    },
    onError(err){
      //console.log(err.graphQLErrors[0].extensions.exception.validation);
      setErrors(err.graphQLErrors[0].extensions.exception.validation)
    },
    variables:values,

  
  })
  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    login();
  
    
  }
  return (
    
    <div className='form-container'>
         
        <Form onSubmit={onSubmit} noValidate className={loading?'loading':''}>
          <h1>Giriş</h1>
        <Form.Input 
          label="Kullanıcı Adı" 
          placeholder="Kullanıcı Adını Giriniz" 
          error={errors.username? true:false}
          name="username" 
          onChange={onChange}
          value={values.username}/>


        <Form.Input
        label="Parola" 
        placeholder="Parola Giriniz" 
        name="password" 
        type="password" 
        onChange={onChange} 
        error={errors.password?true:false}
        value={values.password}/>
       
        <Button type='submit' inverted color='blue'>Giriş</Button>
        </Form>

        {
          Object.keys(errors).length>0 &&(
            <div className='ui error message'>
              <ul className='list'>
                {
                    Object.values(errors).map(
                      value=><li key={value}>{value}</li>
                    )



                }
              </ul>
            </div>
          )
        }
   
    </div>
  )
}

