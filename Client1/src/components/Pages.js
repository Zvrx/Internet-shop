import React, { useContext } from 'react';
import { Context } from '../../../Client1/src';
import {observer} from 'mobx-react-lite'
import ListGroup from 'react-bootstrap/ListGroup';
import { Pagination } from 'react-bootstrap';


const TypeBar = observer(() => {
    const {dye} = useContext(Context)
    const pages = [1,2,3,4,5]
    return (
        <Pagination className='mt-5'>
            {pages.map(page =>
                <Pagination.Item>{page}</Pagination.Item>
                )}
        </Pagination>
      );
  }
)
export default TypeBar;