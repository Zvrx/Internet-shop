import {React,useContext} from 'react';
import {Card, Col, Image } from 'react-bootstrap';
import { Context } from '..';
import { useNavigate, useNavigation } from "react-router-dom"

const DyeItem = ({Dye}) => {
    const history = useNavigate()  
    const {dye} = useContext(Context)
    const typeName = dye._Types.find(type => type.id === Dye.TypeId)?.name;
    const brandname = dye._Brands.find(brand => brand.id === Dye.BrandId)?.name;
    //alert(JSON.stringify(typeName))

    return (
    <Col md={3} className='mt-3' onClick={()=>history("/dye"+'/'+Dye.id)}>
      <Card style={{width:150, cursor: 'pointer'}} border='light'>
        <Image width={150} height={150} src={`http://localhost:5000/${Dye.img}`}/>
        <div className='text-black-50 mt-1 d-flex justify-content-between'>
          <div>{typeName}</div>
          <div className='d-flex align-items-center'>
            <div>{Dye.rating}</div>
          </div>
        </div>
        <div className='text-black-50 mb-1 d-flex justify-content-between' style={{marginTop: '-5px'}}>{brandname}</div>
        <div>{Dye.name}</div>
      </Card>
    </Col>
      );
  }
export default DyeItem;