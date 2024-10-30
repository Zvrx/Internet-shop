import React, { useContext,useState } from 'react';
import { Context } from '../../../Client1/src';
import {observer} from 'mobx-react-lite'
import DyeItem from './DyeItem';
import {Container, Form, Card, Button, Nav, Row} from 'react-bootstrap'


const SearchDye = observer(() => {
    const { dye } = useContext(Context);
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredDyes = dye._Dyes.filter((dye) =>
      dye.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
        <div className="mb-4">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Поиск краски"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </Form.Group>
        <Row className="d-flex">
          {filteredDyes.map((dye) => {
            console.log(dye.id); // добавляем вывод id в консоль
            return <DyeItem key={dye.id} Dye={dye} />;
          })}
        </Row>
      </div>
    );
  });
export default SearchDye;