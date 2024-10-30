import React, { useContext } from 'react';
import { Context } from '../../../Client1/src';
import {observer} from 'mobx-react-lite'
import ListGroup from 'react-bootstrap/ListGroup';


const TypeBar = observer(() => {
    const {dye} = useContext(Context)
    return (
        <ListGroup>
            {dye._Types.map( type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active = {type.id === dye.GetSelectedType().id}
                    onClick={() => dye.setSelectedType(type)}
                    key={type.id}>
                    {type.name}
                </ListGroup.Item>)}
        </ListGroup>
      );
  }
)
export default TypeBar;