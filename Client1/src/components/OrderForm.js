import React, { useState,useContext,useEffect } from 'react';
import { Card, Button, Form, Modal,Toast } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { Context } from '../../../Client1/src';
import { useNavigate } from "react-router-dom"
import { fetchDye } from '../../../Client1/src/http/DyeApi';


const OrderForm = ({ totalQuantity, totalPrice, dyeIds }) => {
  const [showModal, setShowModal] = useState(false);
  const history = useNavigate()  
  const [dyes, setDyes] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [sendReport, setSendReport] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const userObj = JSON.parse(localStorage.getItem("user"));
  const userEmail = userObj.name;
  const { dye } = useContext(Context);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchDye().then(data => {
      dye.setDyes(data.rows);
      setDyes(data.rows);
    });
  }, []);
  const selectedDyeNames = dyeIds.map((dyeId) => {
    const selectedDye = dye._Dyes.find((dye) => dye.id === dyeId);
    return selectedDye ? selectedDye.name : '';
  });
  const selectedDyeNamesString = selectedDyeNames.join(', ');
  const sendReportByEmail = async (toEmail, reportContent) => {
    try {
      const serviceID = 'service_w806mdv';
      const templateID = 'template_2lpg0xg';
      const userID = 'NUvF4zlj9ZaBU5nOq';
  
      const templateParams = {
        DyesList: selectedDyeNamesString,
        amount: totalQuantity,
        summ: totalPrice,
        usermail: userEmail
      };
  
      await emailjs.send(serviceID, templateID, templateParams, userID);
  
      console.log('Отчет успешно отправлен');
    } catch (error) {
      console.error('Не удалось отправить отчет:', error);
    }
  };

  const handleOrderSubmit = async () => {
    if(paymentMethod === '')
    {
      setPaymentMethod("наличные")
    }
    if (!name || !phoneNumber || !paymentMethod) {
      setShowToast(true);
      return
    }
    try {
      const orderData = {
        customerName: name,
        customerEmail: userEmail,
        totalQuantity,
        totalPrice,
        productIds: dyeIds,
        delivery: deliveryMethod,
        paymentMethod, 
        phone: phoneNumber,
        sendReport,
      };

      const response = await axios.post('http://localhost:5000/api/Order/add', orderData);
      
      if (response.data.success) {
        setShowModal(false);

        Swal.fire({
          icon: 'success',
          title: 'Заказ успешно оформлен',
          showConfirmButton: false,
          timer: 2000, 
        });
        if (sendReport) {
          const reportContent = 'Текст отчета о заказе';
          await sendReportByEmail(userEmail, reportContent);
        }
      } else {
        alert('Заказ успешно оформлен');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>Информация о заказе</Card.Title>
          <Card.Text>Общее количество товаров: {totalQuantity}</Card.Text>
          <Card.Text>Суммарная цена: {totalPrice} бел.руб</Card.Text>
          <Button variant="outline-success" className="mb-2" onClick={()=>history("/orders")}>
            Просмотреть все заказы
          </Button>
          <Button variant="outline-success" className="ml-2" onClick={() => setShowModal(true)}>
            Оформить заказ
          </Button>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Оформление заказа</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDeliveryMethod">
              <Form.Label className="mt-1">Выберите способ доставки</Form.Label>
              <Form.Control
                as="select"
                value={deliveryMethod}
                onChange={(e) => setDeliveryMethod(e.target.value)}
              >
                <option value="pickup">Самовывоз</option>
                <option value="delivery">Доставка</option>
              </Form.Control>
            </Form.Group>

            {deliveryMethod === 'delivery' && (
              <Form.Group controlId="formAddress">
                <Form.Label className="mt-1">Введите адрес доставки</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите адрес"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
            )}

            <Form.Group controlId="formName">
              <Form.Label className="mt-1">Введите ваше Ф.И.O</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ф.И.О" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formName">
              <Form.Label className="mt-1">Введите номер телефона</Form.Label>
              <Form.Control
                type="text"
                placeholder="номер" 
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPaymentMethod">
              <Form.Label className="mt-1">Способ оплаты</Form.Label>
              <Form.Control
                as="select"
                value={paymentMethod || setPaymentMethod("наличные")}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="наличные">Наличные</option>
                <option value="карта">Карта</option>
                <option value="перевод">Перевод на счет</option>
        </Form.Control>
        </Form.Group>
        <Form.Group className="mt-1" controlId="formSendReport">
          <Form.Check
            type="checkbox"
            label="Отправить отчет о заказе"
            checked={sendReport}
            onChange={(e) => setSendReport(e.target.checked)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="outline-danger" onClick={() => setShowModal(false)}>
        Закрыть
      </Button>
      <Button variant="outline-success" onClick={handleOrderSubmit}>
        Оформить заказ
      </Button>
    </Modal.Footer>
  </Modal>
  <Toast
    show={showToast}
    onClose={() => setShowToast(false)}
    style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
    autohide
    delay={5000}
  >
    <Toast.Header>
      <strong className="mr-auto">Уведомление</strong>
    </Toast.Header>
    <Toast.Body>Не заполнены все поля</Toast.Body>
  </Toast>
</div>
);
};

export default OrderForm;