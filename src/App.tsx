import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import Login from './pages/Login/Login';
import Main from './pages/main/Main';
import CreatePost from './pages/create/CreatePost';
import UpdatePost from './pages/update/UpdatePost';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/new" element={<CreatePost />} />
          <Route path="/update" element={<UpdatePost />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
