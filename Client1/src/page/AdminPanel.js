import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Container } from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDye from "../components/modals/CreateDye";
import CreateType from "../components/modals/CreateType";
import DeleteBrand from "../components/modals/DeleteBrand";
import DeleteType from "../components/modals/DeleteType";
import DeleteDye from "../components/modals/DeleteDye";
import DyeEdit from "../components/modals/DyeEdit";

const AdminPanel = () => {
    const [brandVisible,SetBrandVisible] = useState(false)
    const [typeVisible,SetTypeVisible] = useState(false)
    const [dyeVisible,SetDyeVisible] = useState(false)
    const [DeleteBrandVisible,SetDeleteBrandVisible] = useState(false)
    const [DeleteTypeVisible,SetDeleteTypeVisible] = useState(false)
    const [DeleteDyeVisible,SetDeleteDyeVisible] = useState(false)
    const [EditDyeVisible,SetEditDyeVisible] = useState(false)
    const history = useNavigate() 
    return (
      <Container className="d-flex flex-column">
        <Button variant={"outline-dark"} onClick={()=> SetTypeVisible(true)} className="mt-2 p-1">Добавить тип</Button>
        <Button variant={"outline-dark"} onClick={()=> SetBrandVisible(true)} className="mt-2 p-1">Добавить производителя</Button>
        <Button variant={"outline-dark"} onClick={()=> SetDyeVisible(true)} className="mt-2 p-1">Добавить краску</Button>
        <Button variant={"outline-dark"} onClick={()=> SetDeleteBrandVisible(true)} className="mt-2 p-1">Удалить производителя</Button>
        <Button variant={"outline-dark"} onClick={()=> SetDeleteTypeVisible(true)} className="mt-2 p-1">Удалить тип</Button>
        <Button variant={"outline-dark"} onClick={()=> SetDeleteDyeVisible(true)} className="mt-2 p-1">Удалить товар</Button>
        <Button variant={"outline-dark"} onClick={()=> SetEditDyeVisible(true)} className="mt-2 p-1">Редактировать товар</Button>
        <Button variant={"outline-dark"} className="mt-2 p-1" onClick={()=>history("/orders/all")}>Список заказов</Button>
        <CreateBrand show={brandVisible} onHide={()=> SetBrandVisible(false)}/>
        <CreateDye show={dyeVisible} onHide={()=> SetDyeVisible(false)}/>
        <CreateType show={typeVisible} onHide={()=> SetTypeVisible(false)}/>
        <DeleteBrand show={DeleteBrandVisible} onHide={() => SetDeleteBrandVisible(false)}/>
        <DeleteType show={DeleteTypeVisible} onHide={() => SetDeleteTypeVisible(false)}/>
        <DeleteDye show={DeleteDyeVisible} onHide={() => SetDeleteDyeVisible(false)}/>
        <DyeEdit show={EditDyeVisible} onHide={() => SetEditDyeVisible(false)}/>
      </Container>
    );
  }
  
  export default AdminPanel;