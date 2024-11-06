import { useState}  from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TableComponent from './components/Table';
import Admin from './components/Admin';
import Login from './components/Login';
import SearchBar from './components/SearchBar'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar el cambio en el input
  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Actualizamos el estado con el valor del input
  };

  return (
    <BrowserRouter>
      <div className='bg-gradient-to-r from-cyan-500 to-blue-500'>
        <Header />
        {/* Definir las rutas */}
        <Routes>
          <Route path="/" element={
            <div className='mx-auto max-w-4xl mt-8'>
              <SearchBar searchTerm={searchTerm} handleChange={handleChange} />
              <div className="mt-10 max-w-4xl mx-auto text-2xl sm:text-xl rounded-lg">
                <TableComponent searchTerm={searchTerm} />
              </div>
            </div>
          } />
          <Route path="/admin" element={
            <div className='mx-auto max-w-4xl mt-8'>
              <Admin />
              <SearchBar searchTerm={searchTerm} handleChange={handleChange} />
              <TableComponent searchTerm={searchTerm} />
            </div>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
