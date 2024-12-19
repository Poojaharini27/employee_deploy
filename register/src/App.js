import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './register';
import ViewEmployees from './ViewEmployees';
import EditEmployee from './EditEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/view" element={<ViewEmployees />} />
        <Route path="/edit" element={<EditEmployee />} />
      </Routes>
    </Router>
  );
}

export default App;
