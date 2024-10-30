import {React,useContext, useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import {Container,Form} from 'react-bootstrap'
import BrandBar from "../components/BrandBar";
import DyesList from "../components/DyesList";
import Pages from "../components/Pages";
import { Context } from '../../../Client1/src/index';
import { observer } from "mobx-react-lite";
import { fetchBrand, fetchDye, fetchType } from "../http/DyeApi";
import SearchDye from "../components/SearcDye";


const Shop = observer(() => {
  const {dye} = useContext(Context)
  useEffect(()=>{
    fetchType().then(data => dye.setTypes(data))
    fetchBrand().then(data => dye.setBrands(data))
    fetchDye().then(data => dye.setDyes(data.rows))
  },[])
    return (
      <Container>
        <Row className="mt-2">
          <Col md={3}>
            <TypeBar/>
          </Col>
          <Col md={9}>
            <BrandBar/>
            <p></p>
            <DyesList/>
          </Col>
          <Col md={3}>
              
          </Col>
        </Row>
      </Container>
      
    );
  });
  
  export default Shop;   
   
            //<SearchDye/>