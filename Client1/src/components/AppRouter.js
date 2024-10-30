import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPanel from "../page/AdminPanel";
import Auth from "../page/Auth";
import Basket from "../page/Basket";
import DyePage from "../page/DyePage";
import Shop from "../page/Shop";
import Orders from "../page/Orders";
import OrderViev from "../page/OrdersViev";

function AppRouter() {
    return (
      <BrowserRouter>
        <Routes>
            <Route path="/admin" element={<AdminPanel/>}/>
            <Route path="/login" element={<Auth />}/>
            <Route path="/registration" element={<Auth />}/>
            <Route path="/basket" element={<Basket />}/>
            <Route path="/orders" element={<Orders />}/>
            <Route path="/orders/all" element={<OrderViev />}/>
            <Route path="/dye/:id" element={<DyePage/>}/>
            <Route path="*" element={<Shop />}/>
        </Routes>
      </BrowserRouter>
    );
  }
export default AppRouter;
/*

 
 
 
 */