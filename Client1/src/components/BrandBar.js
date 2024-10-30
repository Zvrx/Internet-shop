import React, { useContext } from 'react';
import { Context } from '../../../Client1/src';
import {observer} from 'mobx-react-lite'
import {Form, Card} from 'react-bootstrap'



const BrandBar = observer(() => {
    const {dye} = useContext(Context)

    return (
        <Form className='d-flex justify-content-space-between'>
            {dye._Brands.map(brand=>
                <Card key={brand.id} 
                    className="p-3" 
                    onClick={()=> dye.setSelectedBrand(brand)} 
                    border={brand.id === dye.GetSelectedBrand().id ? 'danger' : 'light'} 
                    style={{cursor:'pointer'}}>
                    {brand.name}
                </Card>
                )}
        </Form>
      );
  }
)
export default BrandBar;