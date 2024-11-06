import PropTypes from 'prop-types';  // Importa PropTypes
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react'
import isAuthenticated from "./Login";
import ViajeService from '../../../Backend/src/service/ViajeService';
import 'font-awesome/css/font-awesome.min.css';

const TableComponent = ({ searchTerm }) => {
  const [viajes, setViajes] = useState([]);
  //const [filteredData, setFilteredData] = useState([]);
  const handleEdit = (id) => {
    console.log(`Editando el registro con ID: ${id}`);
    // Aquí puedes agregar lógica para editar el registro, como abrir un formulario o redirigir
  };

  const handleDelete = (id) => {
    console.log(`Eliminando el registro con ID: ${id}`);
    // Aquí puedes agregar lógica para eliminar el registro, como hacer una llamada a la API
  };

  const customStyles = {
    headCells: {
      style: {
        fontSize: '12px', // Ajusta el tamaño de fuente aquí
        fontWeight: 'semibold', // Opcional: para hacer el texto en negrita
        padding: '6px',
        backgroundColor:'#003B87', // Cambia este valor al color que desees
      color: 'white', // Cambia el color del texto
      },
    },
    cells: {
      style: {
        padding: '6px', // Reduce el espacio en las celdas
        borderRight: '1px solid #ddd',
      },
    }
  };

  // Función para obtener los viajes

  const fetchViajes = async () => {
    try {
      const data = await ViajeService.getViajes(); // Usa el servicio aquí
      setViajes(data);
      //setFilteredData(data);
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
    { name: 'Municipio', selector: row => row.municipio?.nombreMunicipio, width:'90px'},
    { name: 'Tipo Desplazamiento', selector: row => row.tipoDesplazamiento?.descripcion, width: '140px' },
    { name: 'Creador', selector: row => row.usuarioCrea?.nombreUsuario, width: '80px' },
    { name: 'Vehículo', selector: row => row.vehiculo?.placa, width: '80px' },
    { name: 'Misión', selector: row => row.misiones[0]?.nombreMision, width: '90px' },

    
    ...(isAuthenticated
      ? [
        {
          name: 'Acciones',
          cell: row => (
            <div className="flex space-x-2"> {/* Espaciado entre iconos */}
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

  const filteredData = Array.isArray(viajes) ? viajes.filter(row => {
    const fecha_inicio = row.fecha_inicio || '';
    const fecha_fin = row.fecha_fin || '';
    const vehiculo = row.vehiculo || '';
    const estado = row.estado || '';

    return fecha_inicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fecha_fin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //turno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estado.toLowerCase().includes(searchTerm.toLowerCase());
  }) : [];

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    noRowsPerPage: true,
    selectAllRowsItemText: "ALL",
    striped: true,
  };

  return (
    <div className='w-full'>
      <DataTable
        columns={columns}
        data={viajes}
        pagination
        paginationPerPage={5}
        highlightOnHover
        noDataComponent={<h2>No hay datos que mostrar, busca de nuevo</h2>}
        paginationComponentOptions={paginationComponentOptions}
        responsive
        className='w-96'
        customStyles={customStyles}
      />

    </div>
  );
};

// Validación de prop-types
TableComponent.propTypes = {
  searchTerm: PropTypes.string.isRequired  // 'searchTerm' es obligatorio y debe ser una cadena
};

export default TableComponent;
