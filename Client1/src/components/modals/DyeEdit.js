import React, { useContext, useEffect, useState } from 'react';
import { Container, Form, Toast } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import { Context } from '../../index';
import { fetchBrand, fetchDye, fetchType } from '../../http/DyeApi';
import axios from 'axios';

const DyeEdit = ({ show, onHide }) => {
  const { dye } = useContext(Context);
  const [selectedDye, setSelectedDye] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isFormValid, setIsFormValid] = useState(true);

  useEffect(() => {
    fetchDye().then((data) => {
      dye.setDyes(data.rows);
      setSelectedDye(null);
    });
    fetchType().then((data) => dye.setTypes(data));
    fetchBrand().then((data) => dye.setBrands(data));
  }, [dye]);

  const handleSelectDye = (selected) => {
    const selectedDye = dye._Dyes.find((dye) => dye.name === selected);
    setSelectedDye(selectedDye);
    setName(selectedDye.name);
    setPrice(selectedDye.price);
    setDescription(selectedDye.description);
  };

  const handleSaveChanges = async () => {
    if (!name || !price || !description) {
      setIsFormValid(false);
      setShowToast(true);
      setToastMessage('Заполните все поля.');
      return;
    }

    try {
      const { id, BrandId, TypeId } = selectedDye;
      const typeId = dye.GetSelectedType();
      const brandId = dye.GetSelectedBrand();
      const updatedDye = {
        id,
        name,
        price,
        description,
        BrandId: brandId?.id || BrandId,
        TypeId: typeId?.id || TypeId,
      };

      const response = await axios.post('http://localhost:5000/api/Dye/edit', updatedDye);
      const savedDye = response.data;

      setShowToast(true);
      setToastMessage('Информация успешно обновлена.');
      setSelectedDye(null);
      setName('');
      setPrice(0);
      setDescription('');
    } catch (error) {
      setShowToast(true);
      setToastMessage('Ошибка.Изменения не сохранены.');
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
    setToastMessage('');
  };

  return (
    <Modal show={show} onHide={onHide} size='lg' centered>
      <Container>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>Выберите краску для редактирования</Modal.Title>
        </Modal.Header>
        <Dropdown onSelect={handleSelectDye}>
          <Dropdown.Toggle>{selectedDye ? selectedDye.name : 'Выберите краску'}</Dropdown.Toggle>
          <Dropdown.Menu style={{ width: '100%' }}>          {dye._Dyes.map((dye) => (
            <Dropdown.Item key={dye.id} eventKey={dye.name}>
              {dye.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {selectedDye && (
        <Form>
          <Dropdown className='mt-3 md-2'>
            <Dropdown.Toggle>{dye.selectedBrand ? dye.selectedBrand.name : 'Выберите брэнд'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {dye._Brands.map((brand) => (
                <Dropdown.Item key={brand.id} onClick={() => dye.setSelectedBrand(brand)}>
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className='mt-3 md-2'>
            <Dropdown.Toggle>{dye.selectedType ? dye.selectedType.name : 'Выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {dye._Types.map((type) => (
                <Dropdown.Item key={type.id} onClick={() => dye.setSelectedType(type)}>
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Group className='mt-3'>
            <Form.Label>Название краски</Form.Label>
            <Form.Control
              type='text'
              placeholder='Введите название краски'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Цена бел.руб</Form.Label>
            <Form.Control
              type='number'
              placeholder='Введите цену'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              placeholder='Введите описание'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      )}

      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Закрыть
        </Button>
        <Button variant='outline-success' onClick={handleSaveChanges}>
          Сохранить
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
        <strong className='me-auto'>Уведомление</strong>
      </Toast.Header>
      <Toast.Body>{toastMessage}</Toast.Body>
    </Toast>
  </Modal>
)};

export default DyeEdit;
