import './App.css';
import { BrowserRouter as Router} from 'react-router-dom';
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './Routes';


function App() {
  return (
    <div className="App">
     <Header/>
     <Router>
      <AppRoutes/>
    </Router>
    </div>
  );
}

export default App;
