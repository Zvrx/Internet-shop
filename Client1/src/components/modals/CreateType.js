import React, { useState } from 'react';
import { Container, Form, Toast } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createType } from '../../http/DyeApi';

const CreateType = ({ show, onHide }) => {
  const [value, setValue] = useState('');
  const [showToast, setShowToast] = useState(false);

  const addType = () => {
    if (value) {
      createType({ name: value }).then((data) => {
        setValue('');
        onHide();
        setShowToast(true);
      });
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
            Добавить новый тип
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Введите название типа"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={addType}>
            Добавить
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
        <Toast.Body>Новый тип успешно добавлен.</Toast.Body>
      </Toast>
    </Modal>
  );
};

export default CreateType;
