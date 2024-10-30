import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Toast } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../index';
import { fetchBrand } from '../../http/DyeApi';
import Dropdown from 'react-bootstrap/Dropdown';
import axios from 'axios';

const DeleteBrand = ({ show, onHide }) => {
  const { dye } = useContext(Context);

  useEffect(() => {
    fetchBrand().then((data) => dye.setBrands(data));
  }, []);

  const [selectedOption, setSelectedOption] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastText, setToastTextt] = useState('');
  
  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleDelete = () => {
    if (selectedOption) {
      axios
        .post('http://localhost:5000/api/brand/delete', {
          brandName: selectedOption,
        })
        .then((response) => {
          setShowToast(true);
          setToastTextt("Фирма была удалена") 
          onHide();
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setShowToast(true);
      setToastTextt("Выберите фирму для удаления") 
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
            Выберите фирму для удаления
          </Modal.Title>
        </Modal.Header>
        <Dropdown onSelect={handleSelect}>
          <Dropdown.Toggle>{selectedOption || 'Выберите фирму'}</Dropdown.Toggle>
          <Dropdown.Menu style={{ width: '100%' }}>
            {dye._Brands.map((brand) => (
              <Dropdown.Item key={brand.id} eventKey={brand.name}>
                {brand.name}
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

export default DeleteBrand;
