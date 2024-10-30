import React, { useContext, useState, useEffect } from 'react';
import { Container, Dropdown, Form, Row, Button, Modal, Toast } from 'react-bootstrap';
import { Context } from '../../../../Client1/src';
import { createDye, fetchBrand, fetchType } from '../../http/DyeApi';

const CreateDye = ({ show, onHide }) => {
  const { dye } = useContext(Context);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    fetchType().then((data) => dye.setTypes(data));
    fetchBrand().then((data) => dye.setBrands(data));
  }, []);

  const handleToastClose = () => {
    setShowToast(false);
  };

  const AddDye = () => {
    if (!name || !price || !file || !dye.GetSelectedBrand() || !dye.GetSelectedType()) {
      <Toast show={showToast} onClose={handleToastClose} delay={3000} autohide>
      <Toast.Header>
        <strong className="me-auto">Ошибка</strong>
      </Toast.Header>
      <Toast.Body>Заполните все поля.</Toast.Body>
    </Toast>
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('BrandId', `${JSON.stringify(dye.GetSelectedBrand().id)}`);
    formData.append('TypeId', `${JSON.stringify(dye.GetSelectedType().id)}`);
    formData.append('description', description);

    createDye(formData)
      .then((data) => {
        onHide();
        setShowToast(true); // Show the success toast message
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Добавить новую краску</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Dropdown className="mt-3 md-2">
              <Dropdown.Toggle>Выберите тип</Dropdown.Toggle>
              <Dropdown.Menu>
                {dye._Types.map((type) => (
                  <Dropdown.Item onClick={() => dye.setSelectedType(type)} key={type.id}>
                    {type.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="mt-3 md-2">
              <Dropdown.Toggle>Выберите фирму</Dropdown.Toggle>
              <Dropdown.Menu>
                {dye._Brands.map((brand) => (
                  <Dropdown.Item onClick={() => dye.setSelectedBrand(brand)} key={brand.id}>
                    {brand.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form>
              <Form.Control
                className="mt-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите название краски "
              />
              <Form.Control
                className="mt-2"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Введите цену краски"
                type="number"
              /> бел руб
                            <Form.Control
                className="mt-2"
                type="file"
                onChange={selectFile}
              />
              <hr />
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Добавьте описание</Form.Label>
                <Form.Control
                  as="textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </Form.Group>
            </Form>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-danger" onClick={onHide}>
            Закрыть
          </Button>
          <Button variant="outline-success" onClick={AddDye}>
            Добавить
          </Button>
        </Modal.Footer>
      </Container>
      <Toast
        show={showToast}
        onClose={handleToastClose}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1,
        }}
        delay={3000}
        autohide
      >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">Успех!</strong>
        </Toast.Header>
        <Toast.Body>Краска успешно добавлена.</Toast.Body>
      </Toast>
    </Modal>
  );
};

export default CreateDye;