import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card, Button, Form, Dropdown } from 'react-bootstrap';
import { Context } from '../index';
import { fetchDye } from '../http/DyeApi';
import { Col, Row,Container,InputGroup } from "react-bootstrap";
import { BiReset } from 'react-icons/bi';

const OrdersList = ({ orders }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [ordersList, setOrdersList] = useState([]);
  const { dye } = useContext(Context);

  useEffect(() => {
    fetchDye().then((data) => dye.setDyes(data.rows));
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/Order/all');
        const { orders } = response.data;
        setOrdersList(orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  const getDyeNameById = (dyeId) => {
    const foundDye = dye._Dyes.find((dye) => dye.id === dyeId);
    return foundDye ? foundDye.name : '';
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.post('http://localhost:5000/api/Order/edit', {
        orderId: orderId,
        newStatus: newStatus
      });
      
      // Обновление списка заказов после успешного изменения статуса
      const updatedOrders = ordersList.map((order) => {
        if (order.id === orderId) {
          return { ...order, status: newStatus };
        }
        return order;
      });
      setOrdersList(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.post('http://localhost:5000/api/Order/delete', {
        orderId: orderId
      });
      // Обновление списка заказов после успешного удаления
      const updatedOrders = ordersList.filter((order) => order.id !== orderId);
      setOrdersList(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders = ordersList.filter((order) => {
    if (!order) {
      return false;
    }
    const orderInfo =
      order.orderIdentifier.toString() +
      order.phone.toString() +
      order.totalPrice.toString() +
      order.totalQuantity.toString();
    return orderInfo.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleFilterChange = (eventKey) => {
    setStatusFilter(eventKey);
  };
  const filterOrders = () => {
    let filteredAndSortedOrders = filteredOrders;
  
    if (statusFilter === 'Новые') {
      filteredAndSortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (statusFilter === "принят на рассмотрение") {
      filteredAndSortedOrders = filteredAndSortedOrders.filter(
        (order) => order.status === 'в процессе доставки'
      );
      filteredAndSortedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (statusFilter === 'доставлен') {
      filteredAndSortedOrders = filteredAndSortedOrders.filter(
        (order) => order.status === 'доставлен'
      );
    }
  
    return filteredAndSortedOrders;
  };
  
  const filteredAndSortedOrders = filterOrders();
  const resetFilters = () => {
    window.location.reload();
  };

  return (
    <Container>
    <Row className="mt-2">
      <Col md={12}>
        <div className="mb-4">
        <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Поиск"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <Button onClick={resetFilters} variant="outline-secondary" className="ms-2">
                  <BiReset />
                </Button>
          </InputGroup>
      <br/>
      <Dropdown onSelect={handleFilterChange} className="mb-3">
        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
          {statusFilter || 'Фильтр заказов'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="Новые">Сначала новые</Dropdown.Item>
          <Dropdown.Item eventKey="в процессе доставки">в процессе доставки</Dropdown.Item>
          <Dropdown.Item eventKey="доставлен">доставлен</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      
      {filteredAndSortedOrders.map((order) => (
        <Card className="mb-3" key={order.id}>
          <Card.Body>
            <div className="d-flex justify-content-between">
              <div>
                <Card.Title>Заказ #{order.orderIdentifier}</Card.Title>
                <Card.Text>
                  Номер телефона клиента: {order.phone}
                  <br />
                  Ф.И.О клиента: {order.customerName}
                  <br />
                  Общая цена заказа: {order.totalPrice} способ оплаты: {order.paymentMethod}
                  <br />
                  Общее количество: {order.totalQuantity}
                  <br/>
                  Названия товаров: {order.productIds.map((dyeId) => (
                <span key={dyeId}>{getDyeNameById(dyeId)}</span>
              ))}
                </Card.Text>
              </div>
              <Dropdown
                onSelect={(eventKey) => handleStatusChange(order.id, eventKey)}
                style={{ minWidth: '100px' }}
              >
                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                  {order.status}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item eventKey="принят на рассмотрение">принят на рассмотрение</Dropdown.Item>
                  <Dropdown.Item eventKey="в процессе доставки">в процессе доставки</Dropdown.Item>
                  <Dropdown.Item eventKey="доставлен">доставлен</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              </div>
              <div className="d-flex justify-content-end mt-2">
              <Button variant="outline-danger" className="mr-2" onClick={() => handleDeleteOrder(order.id)}>
                Удалить
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
      </Col>
      <Col md={3}>
          
      </Col>
    </Row>
  </Container>
    
  );
};

export default OrdersList;
