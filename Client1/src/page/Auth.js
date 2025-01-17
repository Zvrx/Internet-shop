import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import {Container, Form, Card, Button, Nav} from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { login, registration } from "../http/userAPI";
import { Context } from '../../../Client1/src/index';

const Auth = observer(() => {
    const history = useNavigate()
    const {user} = useContext(Context)
    const location = useLocation()
    const IsLogin = location.pathname === "/login"
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const authorization = async () =>{
      try 
      {
          let data;
          if(IsLogin){
            data = await login(email,password);
            localStorage.setItem('user', JSON.stringify({ token: password, name: email,role: (JSON.stringify(data.role))}));
          }else{
            data = await registration(email,password);
            localStorage.setItem('user', JSON.stringify({ token: password, name: email,role: (JSON.stringify(data.role))}));
          }
          user.setUser(user)
          user.setIsAuth(true)
          history("/")
      } 
      catch (e) 
      {
          alert(e.response.data.message)
      }

    }
    return (
      <Container 
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}>
        <Card style={{width:600}} className="p-5">
            <h2 className="m-auto">{IsLogin ? 'Авторизация' : 'Регистрация'}</h2>
            <Form className="d-flex flex-column">
              <Form.Control
                  className="mt-3"
                  placeholder="Введите ваш email"
                  value = {email}
                  onChange = {e=>setEmail(e.target.value)}
              />
              <Form.Control
                  className="mt-3"
                  placeholder="Введите ваш пароль"
                  value = {password}
                  onChange = {e=>setPassword(e.target.value)}
                  type='password'
              />
              <Form className="d-flex justify-content-between mt-3 pl-3 pr-3">
                {IsLogin ?
                      <div>
                        Нет аккаунтна? <NavLink to="/registration">Зарегестрироватся</NavLink>
                      </div>
                      :
                      <div>
                        Есть акааунт? <NavLink to="/login">Войдите</NavLink>
                      </div>
                } 
                <Button onClick={authorization} className="mt-3 align-self-end" variant={"outline-success"}>
                    {IsLogin ? "Войти" : "Регистрация"}
                </Button>
              </Form>

             
            </Form>
        </Card>
      </Container>
    );
  }
)
  export default Auth;