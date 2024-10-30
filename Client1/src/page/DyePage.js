import React, { useEffect, useState, useContext } from "react";
import { Card, Col, Image, Container, Row, Button, Modal, Form,Toast } from "react-bootstrap";
import { Context } from "../../../Client1/src/index";
import { useParams } from "react-router-dom";
import { fetchOneDye } from "../http/DyeApi"
import { createDye, fetchBrand, fetchType } from '../http/DyeApi';
import axios from "axios";

const DyePage = () => {
  const { dye } = useContext(Context);
  const { id } = useParams();
  const parsedId = parseInt(id, 10);
  const [paint, setPaint] = useState(null);
  const { user } = useContext(Context);
  const userObj = JSON.parse(localStorage.getItem("user"));
  const userEmail = userObj ? userObj.name : null;
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0); // Добавлено состояние для рейтинга
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleAddToCart = () => {
    axios
      .post(`http://localhost:5000/api/dye/${parsedId}/add`, {
        userMail: userEmail,
        DyeId: id,
        quantity: quantity,
      })
      .then((response) => {
        setShowToast(true);
        setToastMessage('Краска добавлена в корзину.');
        setShow(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchType().then((data) => dye.setTypes(data));
    fetchBrand().then((data) => dye.setBrands(data));
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleRateDye = () => {
    axios
      .post(`http://localhost:5000/api/dye/${parsedId}/AddRating`, { newRating: rating })
      .then((response) => {
        const newRating = response.data.rating;
      
        // Обновить состояние с новым рейтингом
        setPaint({ ...paint, rating: newRating });
        setShowToast(true);
        setToastMessage('Рейтинг обновлен.');
      })
  };

  function getBrandName(brandId) {
    const brand = dye._Brands.find((brand) => brand.id === brandId);
    return brand ? brand.name : "Неизвестный производитель";
  }
  
  function getTypeName(typeId) {
    const type = dye._Types.find((type) => type.id === typeId);
    return type ? type.name : "Неизвестный тип";
  }

  const IsLogin = localStorage.getItem('user');

  const extractVolumeFromDescription = (description) => {
    const volumeRegex = /(\d+)\s*([кгглл])/i;
    const match = description.match(volumeRegex);
    if (match) {
      const value = match[1];
      const unit = match[2].toLowerCase();
      let volume = value;
      if (unit === 'кг') {
        volume += 'кг';
      } else if (unit === 'г') {
        volume += 'г';
      } else {
        volume += 'л';
      }
      return volume;
    }
    return null;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/dye/${parsedId}`)
      .then((response) => {
        setPaint(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!paint) {
    return <p>Loading...</p>;
  }

  return (
    <Container className="mt-3">
        <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        autohide
        delay={5000}
        style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 9999 }}
      >
        <Toast.Header>
          <strong className="mr-auto">Уведомление</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={`http://localhost:5000/${paint.img}`} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-itmes-center">
            <h2>{paint.name}</h2>
            <h3>Рейтинг: {paint.rating}</h3>
            <div className="d-flex align-items-center justify-content-between">
            <Form.Group controlId="rating" className="mr-2">
              <Form.Label>Выставить рейтинг:</Form.Label>
              <Form.Control as="select" value={rating} onChange={handleRatingChange}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Form.Control>
            </Form.Group>
            <Button variant={"outline-dark"} onClick={handleRateDye}>
              Оценить
            </Button>
          </div>
            <div className="d-flex align-items-center justufy-content-center"></div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{ width: 300, height: 300, fontSize: 32, border: "2px solid lightgray" }}
          >
            <h3>{paint.price} бел.руб</h3>
            <Button
              variant="outline-dark"
              onClick={handleShow}
              disabled={!IsLogin}
            >
              Добавить в корзину
            </Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-5 ml-2">
        <h1>
          Описание товара
          <br></br>
        </h1>
        <div
          style={{
            fontSize: "14px",
            fontFamily: "sans-serif",
            overflow: "hidden",
            wordWrap: "break-word",
          }}
        >
          <h1> </h1>
          {getBrandName(paint.BrandId) !== 'Неизвестный брэнд' && (
            <h4>Производитель: {getBrandName(paint.BrandId)}<br /></h4>
          )}
          {getTypeName(paint.TypeId) !== ' ' && (
            <h4>Тип: {getTypeName(paint.TypeId)}<br /></h4>
          )}
          {extractVolumeFromDescription(paint.description) && (
            <h4>
              Объем: {extractVolumeFromDescription(paint.description)}
            </h4>
          )}
          <h4>
          {paint.description.includes('Артикул:') && (
            <h4>
              Атрикул в каталоге:{" "}
              {paint.description.split('Артикул:')[1].trim().split('\n')[0]}
            </h4>
          )}
          </h4>
          <h1>Подробное Описание</h1>
          <h5>{paint.description}</h5>
        </div>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить в корзину</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="quantity">
            <Form.Label>Количество</Form.Label>
            <Form.Control type="number" min="1" max="10" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </Form.Group>
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleClose} variant={"outline-danger"}>
              Закрыть
            </Button>
            <Button variant={"outline-success"} onClick={handleAddToCart}>
            Добавить в корзину
            </Button>
            </Modal.Footer>
            </Modal>
            </Container>
            
            );
            
            };

export default DyePage;