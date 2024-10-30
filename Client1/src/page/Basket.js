import React, { useContext ,useState, useEffect,useNavigate} from 'react';
import { Col, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import {Container,Form} from 'react-bootstrap'
import BrandBar from "../components/BrandBar";
import CartList from "../components/CartList";
import { Context } from '../../../Client1/src/index';
import { observer } from "mobx-react-lite";
import { fetchBrand, fetchDye, fetchType } from "../http/DyeApi";
import OrderForm from '../components/OrderForm';


const Basket = () => {
  const [parentTotalQuantity, setParentTotalQuantity] = useState(0);
  const [parentTotalPrice, setParentTotalPrice] = useState(0);
  const [parentDyeIds, setParentDyeIds] = useState([]);

  // Функция обратного вызова для обновления значений в родительском компоненте
  const handleDataReceived = (quantity, price, ids) => {
    setParentTotalQuantity(quantity);
    setParentTotalPrice(price);
    setParentDyeIds(ids);
  };
  return (
    <Container>
      <Row className="mt-2">
        <Col md={9}>
          <CartList onDataReceived={handleDataReceived}/>
        </Col>
        <Col md={3}>
          <OrderForm totalQuantity={parentTotalQuantity} totalPrice={parentTotalPrice} dyeIds={parentDyeIds}/>
        </Col>
      </Row>
    </Container>
  );
};

export default Basket;
