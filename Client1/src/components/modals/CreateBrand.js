import {React,useState} from 'react';
import { Container, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createBrand } from '../../http/DyeApi';


const CreateBrand = ({show,onHide}) => {
  const [value, setValue] = useState('');

  const addBrand = () => {
    createBrand({ name: value }).then(data => {
      setValue('');
      onHide();
    });
  };
    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
        <Container>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить нового производителя
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                  
                <Form.Control 
                  value={value}
                  onChange={e => setValue(e.target.value)}
                  placeholder='Введите название типа '/>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
          <Button variant='outline-success' onClick={addBrand}>Добавить</Button>
        </Modal.Footer>
        </Container>
        </Modal>
      );
  }
export default CreateBrand;