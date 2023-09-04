
import { createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Student from "./components/Student";
import Admin from "./components/Admin";
import Display from "./components/Dislpay";
import AdminDisplay from "./components/AdminDisplay";
import SolvedProbs from "./components/SolvedProbs";

const App = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/student',
    element: <Student />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/admindisplay',
    element: <AdminDisplay />
  },
  {
    path: '/displayproblems',
    element: <Display />
  },
  {
    path: '/solvedProbs',
    element: <SolvedProbs />
  }
])


export default App;
