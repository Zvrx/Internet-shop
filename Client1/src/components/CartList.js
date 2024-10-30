import React, { useContext ,useState, useEffect} from 'react';
import { Context } from '../../../Client1/src';
import {observer} from 'mobx-react-lite'
import DyeItem from './DyeItem';
import {Container, Form, Row, Col, Card, Button, Toast } from 'react-bootstrap'
import axios from 'axios';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { useNavigate, useNavigation } from "react-router-dom"

const CartList = (props) => {

  const DyeDescription = styled.div`
    font-size: 13px;
    font-family: sans-serif;
    height: 80px;
    width:700px;
    overflow: hidden;
    word-wrap: break-word;
    margin-bottom: 10px;
    textOverflow: "ellipsis";
  `;
  const EmptyCartMessage = styled.p`
    text-align: center;
    font-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin-left: 200px;
    margin-top: -70px
  `;

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [dyeIds, setDyeIds] = useState([]);
  const [dyeCards, setDyeCards] = useState([]);
  const userObj = JSON.parse(localStorage.getItem('user'));
  const userEmail = userObj.name;
  const [userId, setUserId] = useState(null);
  const history = useNavigate() 
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/Basket", {
        params: {
          userMail: userEmail
        }
      });
      const userId = response.data.userId;
      setUserId(userId);
      const dyes = response.data.dyes;
      let dyeId = 0
      const nonNullDyes = dyes.filter(dye => dye !== null);

      const dyeCards = nonNullDyes.map((dye) => (
        <Card onClick={() => history("/dye" + '/' + dye.id)} style={{ marginBottom: '10px', textDecoration: 'none' ,cursor:'pointer'}}>
            <Card.Body style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <div style={{ flex: 1 }}>
                  <Card.Title>{dye.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {dye.Brand ? dye.Brand.name : ' '} - {dye.Type ? dye.Type.name : ' '}
                  </Card.Subtitle>
                  <DyeDescription>{dye.description}</DyeDescription>
                  <Card.Text style={{ marginRight: '10px', textDecoration: 'none' }}>Цена: {dye.price} бел.руб</Card.Text>
                  <div style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                    <Card.Text style={{ marginRight: '10px', textDecoration: 'none' }}>Количество: {dye.quantity}</Card.Text>
                    <Button variant="outline-danger" onClick={(event) => { event.stopPropagation(); deleteDyeFromCart(userId, dye.id); }}>Удалить</Button>
                  </div>
                </div>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/${dye.img}`}
                  style={{ width: 150, height: 150, objectFit: 'cover' }}
                />
              </Card.Body>
            </Card>
            ));

      let quantitySum = 0;
      let priceSum = 0;
      let ids = [];

      nonNullDyes.forEach((dye) => {
        quantitySum += dye.quantity;
        priceSum += dye.price * dye.quantity;
        ids.push(dye.id);
      });

      setTotalQuantity(quantitySum);
      setTotalPrice(priceSum);
      setDyeIds(ids);
      setDyeCards(dyeCards);
      props.onDataReceived(quantitySum, priceSum, ids);

    } catch (error) {
      setShowToast(true);
      setToastMessage(`Ошибка: ${error.message}\n Место ошибки: ${error.stack}`);
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
    setToastMessage('');
  };

  const deleteDyeFromCart = async (UserId,DyeId) => {
    try {
      const response = await axios.post('http://localhost:5000/api/Basket/delete', {
        UserId,
        DyeId,
      });
      console.log(response.data);
      setShowToast(true);
      setToastMessage('Краска была удалена');
      getData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        {dyeCards.length === 0 ? (
          <EmptyCartMessage>Корзина пуста</EmptyCartMessage>
        ) : (
          dyeCards
        )}
      </Row>
      <Toast
        show={showToast}
        onClose={handleToastClose}
        delay={3000}
        autohide
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
      >
        <Toast.Header>
          <strong className='me-auto'>Уведомление</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
}

export default CartList;

