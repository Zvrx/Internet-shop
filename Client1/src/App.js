import NavBar from "./components/NavBar";
import AppRouter from "./components/AppRouter";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from ".";
import { Spinner } from "react-bootstrap";

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  const check = async () => {
    const data = JSON.parse(localStorage.getItem("user"));

    if (data && data.token) {
      user.setIsAuth(true);
    } else {
      user.setUser(false);
      user.setIsAuth(false);
    }
  };
  
  useEffect(() => {
    setTimeout(() => {
      check().then(data => {}).finally(() => setLoading(false));
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <div style={{ flex: 1 }}>
        <AppRouter />
      </div>
      <footer
        style={{
          background: "#000",
          color: "#fff",
          padding: "10px",
          textAlign: "center",
          fontSize: "10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
        }}
      >
        <div>
          <p>ООО «Профикарлайн»</p>
          <p>E-Mail: zakaz@pcline.by или info@pcline.by</p>
          <p>Адрес: 220036, г. Минск, ул. К. Либкнехта, 66-150 (7 этаж, левое крыло)</p>
        </div>
        <div>
          <p>Время работы офиса: Понедельник-Четверг 09:00-18:00</p>
          <p>Пятница 09:00-17:00,Суббота, Воскресенье - Выходные</p>
          <p>СКЛАД: ул. Селицкого, 21 М, г. Минск</p>
        </div>
      </footer>
    </div>
  );
});

export default App;
