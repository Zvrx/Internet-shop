import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '..';
import {observer} from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom';

const NavBar = observer(() => {
    const {user} = useContext(Context)
    let userRole = "";
    if (localStorage.getItem('user')) {
      const AuthUser = JSON.parse(localStorage.getItem('user'));
      userRole = AuthUser.role;    
      
    }
    
    const logOut = () =>{
      localStorage.removeItem('user');
      user.setUser({})
      user.setIsAuth(false)

    }
    return (
        <>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">Профикарлайн</Navbar.Brand>
            {user._IsAuth ?
              <Nav> 
                {userRole=="\"ADMIN\""?<Button variant={"outline-light"} href="/admin" className="mr-2">Админ</Button>:null
                }
                <p>...</p>
                <Button variant={"outline-light"}  href="/basket" className="mr-2">корзина</Button>
                <p>...</p>
                <Button variant={"outline-light"} className="ml-7" onClick={()=>logOut()} >Выйти</Button>
              </Nav> 
              :
              <Nav className="ml-auto"> 
                <Button variant={"outline-light"} href="/login" className="mr-2">Авторизация</Button>
              </Nav> 
            }      
          </Container>
        </Navbar>
        </>
    );
  }
)//onClick={logOut()}
export default NavBar;