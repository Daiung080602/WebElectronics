import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginForm from "./page/LoginForm";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route path={"/login"} element={<LoginForm/>}></Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
