import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import SuccessPage from "./components/SuccessPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<UserForm />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App