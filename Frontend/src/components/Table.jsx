import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import isAuthenticated from "./Login";
import ViajeService from '../../../Backend/src/service/ViajeService';
import ConfirmationToast from './ConfirmationToast';
import 'font-awesome/css/font-awesome.min.css';
import { toast } from 'react-toastify';

const TableComponent = ({searchTerm}) => {
  const [viajes, setViajes] = useState([]);

  const handleEdit = (id) => {
    console.log(`Editando el registro con ID: ${id}`);
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

  // Función para eliminar un viaje
  const handleDelete = async (id) => {
    toast(
      <ConfirmationToast
        onConfirm={async () => {
          try {
            await ViajeService.deleteViaje(id);
            toast.success('Viaje eliminado con éxito');
            fetchViajes(); // Actualiza la lista después de eliminar
          } catch (error) {
            toast.error('Error al eliminar el viaje');
            console.log(error);
          }
        }}
        onCancel={() => toast.dismiss()}
      />,
      {
        autoClose: false,
        closeOnClick: true,
      }
    );
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
                onClick={() => handleEdit(row)}
              ></i>
              <i
                className="fa fa-trash text-red-500 text-xl cursor-pointer hover:text-red-700"
                onClick={() => {
                  console.log("ID del viaje a eliminar:", row.idViaje);
                  handleDelete(row.idViaje)}}
                
              ></i>
            </div>
          ),
          width: '70px'
        }]
      : [])
  ];

  // Filtra los datos usando el término de búsqueda
  const filteredData = viajes.filter(row => {
    const estado = row.estado || '';
    const fecha_inicio = row.tiempoInicio || '';
    const fecha_fin = row.tiempoFin || '';
    const municipio = row.municipio?.nombreMunicipio || '';
    const tipo_desplazamiento = row.tipoDesplazamiento?.descripcion || '';
    const creador = row.usuarioCrea?.nombreUsuario || '';
    const vehiculo = row.vehiculo?.placa || '';
    const mision = row.misiones[0]?.nombreMision || '';
    

    return (
      estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fecha_inicio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fecha_fin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      municipio.toLowerCase().includes(searchTerm.toLowerCase())||
      tipo_desplazamiento.toLowerCase().includes(searchTerm.toLowerCase())||
      creador.toLowerCase().includes(searchTerm.toLowerCase())||
      vehiculo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mision.toLowerCase().includes(searchTerm.toLowerCase())
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
