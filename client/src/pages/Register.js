import React,{useState,useContext} from 'react'
import { Form,Button } from 'semantic-ui-react';
import { useMutation,gql} from '@apollo/client';
import {useNavigate} from 'react-router-dom'
import { AuthContext } from '../context/auth';
//FIXME: history push yerine useNavigate kullanıldı (kullanımı register functionunda gösterilmekte)
const REGISTER_USER=gql`

  mutation register($username:String!,$email:String!,$password:String!,$repassword:String!){
    register(registerInput:{username:$username,email:$email,password:$password,repassword:$repassword}){
      username,
      token,
      email
    }
  }

`

export default function Register(props) {

  const context=useContext(AuthContext);
  const [errors,setErrors]=useState({});
  const [values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    repassword:""
  })
  
  //   FIXME: 
  //   history yerine useNavigate oluşturuldu
  //   let navigate=useNavigate() şeklinde
  //   sonra 
  //   navigate("/",{replace:true}) şeklinde düzenlendi.

  
  let navigate=useNavigate();
  const [register,{loading}]=useMutation(REGISTER_USER,{

    update(proxy,{data:{register:userData}}){
      context.login(userData);
      navigate("/",{replace:true})
    },
    onError(err){
      console.log(err.graphQLErrors[0].extensions.exception.validation);
      setErrors(err.graphQLErrors[0].extensions.exception.validation)
    },
    variables:values,

  
  })
  const onChange=(e)=>{
    setValues({...values,[e.target.name]:e.target.value})
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    register();
  
    
  }
  return (
    
    <div className='form-container'>
         
        <Form onSubmit={onSubmit} noValidate className={loading?'loading':''}>
          <h1>Üye Ol</h1>
        <Form.Input 
          label="Kullanıcı Adı" 
          placeholder="Kullanıcı Adını Giriniz" 
          error={errors.username? true:false}
          name="username" 
          onChange={onChange}
          value={values.username}/>


        <Form.Input
         label="E-Mail"
         placeholder="E-Mail Giriniz" 
         name="email" 
         type="email" 
         onChange={onChange}
         error={errors.email?true:false} 
         value={values.email}/>

        <Form.Input
        label="Parola" 
        placeholder="Parola Giriniz" 
        name="password" 
        type="password" 
        onChange={onChange} 
        error={errors.password?true:false}
        value={values.password}/>
        <Form.Input 
        label="Parola Tekrarı" 
        placeholder={"Parolayı Tekrar Giriniz" }
        type="password"  
        name="repassword" 
        onChange={onChange}
        error={errors.repassword?true:false} 
        value={values.repassword}/>
        <Button type='submit' inverted color='blue'>Kayıt Ol</Button>
        </Form>

        {
          Object.keys(errors).length>0 &&(
            <div className='ui error message'>
              <ul className='list'>
                {
                    Object.values(errors).map(
                      value=><li>{value}</li>
                    )



                }
              </ul>
            </div>
          )
        }
   
    </div>
  )
}
