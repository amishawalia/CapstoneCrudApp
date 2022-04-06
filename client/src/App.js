import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import CreateUser from './components/User/CreateUser';
import EditUser from './components/User/EditUser';
import ListUser from './components/User/ListUser';
function App() {
  const {isLogged} = useSelector(state =>state)
  const localData = localStorage.getItem('token');
  return (
    <div className="container">
      <h2>This is crud app</h2>
      {/* {!isLogged && <Login/>} */}
      {localData && <Header/>}
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/list' element={<ListUser/>}/>
        <Route path='/create' element={<CreateUser/>}/>
        <Route path='/edit/:id' element={<EditUser/>}/>
      </Routes>

    </div>
  );
}

export default App;
