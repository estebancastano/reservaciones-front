import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import isAuthenticated from "./Login";
import ViajeService from '../../../Backend/src/service/ViajeService';
import 'font-awesome/css/font-awesome.min.css';

const TableComponent = () => {
  const [viajes, setViajes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEdit = (id) => {
    console.log(`Editando el registro con ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Eliminando el registro con ID: ${id}`);
  };

  const customStyles = {
    headCells: {
      style: {
        fontSize: '12px',
        fontWeight: 'semibold',
        padding: '6px',
        backgroundColor: '#003B87',
        color: 'white',
      },
    },
    cells: {
      style: {
        padding: '6px',
        borderRight: '1px solid #ddd',
      },
    }
  };

  const fetchViajes = async () => {
    try {
      const data = await ViajeService.getViajes();
      setViajes(data);
    } catch (error) {
      console.error('Error al obtener los viajes:', error);
    }
  };

  useEffect(() => {
    fetchViajes();
  }, []);

  const columns = [
    { name: 'Estado', selector: row => row.estado, width: '70px' },
    { name: 'Fecha Inicio', selector: row => row.tiempoInicio, width: '150px' },
    { name: 'Fecha Fin', selector: row => row.tiempoFin, width: '150px' },
    { name: 'Municipio', selector: row => row.municipio?.nombreMunicipio, width: '90px' },
    { name: 'Tipo Desplazamiento', selector: row => row.tipoDesplazamiento?.descripcion, width: '140px' },
    { name: 'Creador', selector: row => row.usuarioCrea?.nombreUsuario, width: '80px' },
    { name: 'Vehículo', selector: row => row.vehiculo?.placa, width: '80px' },
    { name: 'Misión', selector: row => row.misiones[0]?.nombreMision, width: '90px' },

    ...(isAuthenticated
      ? [
        {
          name: 'Acciones',
          cell: row => (
            <div className="flex space-x-2">
              <i
                className="fa fa-edit text-blue-500 text-xl cursor-pointer hover:text-blue-700"
                onClick={() => handleEdit(row.id)}
              ></i>
              <i
                className="fa fa-trash text-red-500 text-xl cursor-pointer hover:text-red-700"
                onClick={() => handleDelete(row.id)}
              ></i>
            </div>
          ),
          width: '70px'
        }]
      : [])
  ];

  // Filtra los datos usando el término de búsqueda
  const filteredData = viajes.filter(row => {
    const fecha_inicio = row.tiempoInicio || '';
    const fecha_fin = row.tiempoFin || '';
    const vehiculo = row.vehiculo?.placa || '';
    const estado = row.estado || '';

    return (
      fecha_inicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fecha_fin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estado.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    noRowsPerPage: true,
    selectAllRowsItemText: "ALL",
    striped: true,
  };

  return (
    <div className='w-full'>
      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar...."
        className="mb-4 p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredData} // Usa los datos filtrados
        pagination
        paginationPerPage={5}
        highlightOnHover
        noDataComponent={<h2>No hay datos que mostrar, busca de nuevo</h2>}
        paginationComponentOptions={paginationComponentOptions}
        responsive
        className='w-98'
        customStyles={customStyles}
      />
    </div>
  );
};
TableComponent.propTypes = {
  searchTerm: PropTypes.string.isRequired  // 'searchTerm' es obligatorio y debe ser una cadena
};

export default TableComponent;
