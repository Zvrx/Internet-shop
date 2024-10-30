import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Collapse } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const userObj = JSON.parse(localStorage.getItem('user'));
        const customerEmail = userObj.name;

        const response = await axios.get('http://localhost:5000/api/Order', {
          params: {
            customerEmail: customerEmail,
          },
        });

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          console.log('Failed to fetch user orders');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserOrders();
  }, []);

  const handleOrderClick = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };
  const handleGoBack = (orderId) => {
    setExpandedOrderId(orderId === expandedOrderId ? null : orderId);
  };
  
  const getOrderStatusColor = (status) => {
    if (status === 'принят на рассмотрение' || status === 'в процессе доставки') {
      return 'orange';
    } else if (status === 'отменен') {
      return 'red';
    } else if (status === 'доставлен') {
      return 'limegreen';
    }
    return '';
  };

  
  const orderCardStyle = {
    backgroundColor: '#fff',
    marginBottom: '10px',
    borderRadius: '5px',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease-in-out',
    width: '800px', // Adjust the width as needed
    marginLeft: '300px'
  };
  

  const orderCardHoverStyle = {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const orderCardExpandedStyle = {
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const orderHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  };

  const orderIdStyle = {
    fontSize: '16px',
    fontWeight: 'normal',
    color: '#333',
  };

  const orderStatusStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
  };


  const orderDetailContainerStyle = {
    display: 'flex',
  };
  
  const orderDetailColumnStyle = {
    flex: 1,
    marginLeft:'10px'
  };
  return (
    <div>
      <h1 style={{marginLeft:'300px'}}>Мои заказы</h1>
      {orders.length === 0 ? (
        <p>У вас нет заказов.</p>
      ) : (
        <div>
          {orders.map((order) => (
            <Card
              key={order.id}
              style={{
                ...orderCardStyle,
                ...(order.id === expandedOrderId ? orderCardExpandedStyle : {}),
              }}
              onClick={() => handleOrderClick(order.id)}
            >
              <Card.Header
                style={{
                  ...orderHeaderStyle,
                  backgroundColor: 'white',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <h5 style={orderIdStyle}>
                  Заказ #{order.orderIdentifier}
                  <span
                    className={`order-status-indicator ${
                      getOrderStatusColor(order.status) === 'orange'
                        ? 'order-status-indicator--orange'
                        : getOrderStatusColor(order.status) === 'red'
                        ? 'order-status-indicator--red'
                        : getOrderStatusColor(order.status) === 'limegreen'
                        ? 'order-status-indicator--limegreen'
                        : ''
                    }`}
                  ></span>
                </h5>
                <p
                  style={{
                    ...orderStatusStyle,
                    color: getOrderStatusColor(order.status),
                  }}
                >
                  {order.status}
                </p>
              </Card.Header>
              <Collapse in={order.id === expandedOrderId}>
                <div>
                  <div style={orderDetailContainerStyle}>
                    <div style={orderDetailColumnStyle}>
                      <p>Количество товаров: {order.totalQuantity}</p>
                      <p>Сумма: {order.totalPrice} бел руб</p>
                    </div>
                    <div style={orderDetailColumnStyle}>
                      <p>Способ доставки: {order.devilery}</p>
                      <p>Способ оплаты: {order.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </Collapse>
            </Card>
          ))}
        </div>
      )}

    </div>
  );
};

export default MyOrdersPage;
