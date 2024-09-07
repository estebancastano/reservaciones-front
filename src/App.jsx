import { useState } from 'react';
import Header from './components/Header';
import TableComponent from './components/Table';  // Asegúrate de usar el componente TableComponent

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Función para manejar el cambio en el input
  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Actualizamos el estado con el valor del input
  };

  return (
    <div className='bg-primary'>
      <Header />

      <div className='mx-auto max-w-4xl mt-8'>
      <input
        type='text'
        placeholder="Buscar..."
        onChange={handleChange}
        value={searchTerm}
        className='rounded-lg'
      />
      </div>

      <div className="mt-10 max-w-4xl mx-auto text-2xl sm:text-xl rounded-lg">
        <TableComponent searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default App;

