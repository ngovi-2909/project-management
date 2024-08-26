import logo from './logo.svg';
import './App.css';
import ProjectManagement from "./Pages/ProjectManagement";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateProject from "./Pages/CreateProject";
import EditProject from "./Pages/EditProject";
import ErrorPage from "./Pages/Error";

function App() {
  return (
      <div>
          <BrowserRouter>
              <Routes>
                  <Route exact path="/" element={<ProjectManagement />}></Route>
                  <Route exact path="/create" element={<CreateProject />}></Route>
                  <Route exact path="/edit" element={<EditProject />}></Route>
                  <Route exact path="/error" element={<ErrorPage />}></Route>
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
