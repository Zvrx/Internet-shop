import React, { useContext, useEffect, useState } from 'react';
import { Container, Toast } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../index';
import { fetchDye } from '../../http/DyeApi';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const DeleteDye = ({ show, onHide }) => {
  const { dye } = useContext(Context);
  const [dyes, setDyes] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastTextt] = useState('');

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  async function fetchAndSetDyes() {
    const data = await fetchDye();
    setDyes(data);
  }

  useEffect(() => {
    fetchDye().then((data) => dye.setDyes(data.rows));
  }, []);

  useEffect(() => {
    fetchAndSetDyes();
  }, []);

  const handleDelete = () => {
    if (selectedOption) {
      axios
        .post('http://localhost:5000/api/dye/delete', {
          DyeName: selectedOption,
        })
        .then((response) => {
          setShowToast(true);
          setToastTextt("Краска была удалена")  // Список красок в корзине
          onHide();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowToast(true);
      setToastTextt("Выберите краску для удаления") 
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Выберите товар для удаления
          </Modal.Title>
        </Modal.Header>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle>{selectedOption || 'Выберите тип'}</Dropdown.Toggle>
          <Dropdown.Menu style={{ width: '100%' }}>
            {dye._Dyes.map((dye) => (
              <Dropdown.Item key={dye.id} eventKey={dye.name}>
                {dye.name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={handleDelete}>
            Удалить
          </Button>
        </Modal.Footer>
      </Container>
      <Toast
        show={showToast}
        onClose={handleToastClose}
        delay={3000}
        autohide
        style={{ position: 'fixed', top: 20, right: 20 }}
      >
        <Toast.Header>
          <strong className="me-auto">Уведомление</strong>
        </Toast.Header>
        <Toast.Body>{toastText}</Toast.Body>
      </Toast>
    </Modal>
  );
};

export default DeleteDye;
