import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import AddTaskPage from "./AddTaskPage";
import ManageTasksPage from "./ManageTasksPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddTaskPage />} />
        <Route path="/manage" element={<ManageTasksPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
