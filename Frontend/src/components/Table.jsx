import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import isAuthenticated from "./Login";
import ViajeService from '../../../Backend/src/service/ViajeService';
import ConfirmationToast from './ConfirmationToast';
import 'font-awesome/css/font-awesome.min.css';
import { toast } from 'react-toastify';

const TableComponent = ({ searchTerm }) => {
  const [viajes, setViajes] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null); // Guarda la fila seleccionada para editar
  const [municipios, setMunicipios] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [desplazamientos, setDesplazamientos] = useState([]);
  const [creadores, setCreadores] = useState([]);
  const [misiones, setMisiones] = useState([]);

  useEffect(() => {
    // Carga los municipios desde el backend
    axios.get("http://localhost:8000/api/v1/municipios")
      .then(response => setMunicipios(response.data))
      .catch(error => console.error("Error al cargar municipios:", error));
  }, []);

  useEffect(() => {
    // Carga los vehiculos desde el backend
    axios.get("http://localhost:8000/api/v1/vehiculos")
      .then(response => setVehiculos(response.data))
      .catch(error => console.error("Error al cargar vehiculos:", error));
  }, []);

  useEffect(() => {
    // Carga los desplazamientos desde el backend
    axios.get("http://localhost:8000/api/v1/desplazamientos")
      .then(response => setDesplazamientos(response.data))
      .catch(error => console.error("Error al cargar desplazamientos:", error));
  }, []);

  useEffect(() => {
    // Carga los creadores desde el backend
    axios.get("http://localhost:8000/api/v1/usuarios")
      .then(response => setCreadores(response.data))
      .catch(error => console.error("Error al cargar creadores:", error));
  }, []);

  useEffect(() => {
    // Carga los creadores desde el backend
    axios.get("http://localhost:8000/api/v1/misiones")
      .then(response => setMisiones(response.data))
      .catch(error => console.error("Error al cargar misiones:", error));
  }, []);

  const handleEdit = (row) => {
    setSelectedRow(row); // Guarda los datos de la fila seleccionada
    setIsModalOpen(true); // Abre el modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cierra el modal
    setSelectedRow(null); // Limpia la fila seleccionada
  };

  const handleSaveChanges = async () => {
    try {
      await ViajeService.updateViaje(selectedRow.idViaje, selectedRow); // Envía los cambios al backend
      toast.success('Viaje actualizado con éxito');
      fetchViajes(); // Actualiza la tabla después de guardar los cambios
      setIsModalOpen(false); // Cierra el modal
    } catch (error) {
      toast.error('Error al actualizar el viaje');
      console.error(error);
    }
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
                  handleDelete(row.idViaje)
                }}

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
      municipio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tipo_desplazamiento.toLowerCase().includes(searchTerm.toLowerCase()) ||
      creador.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
      {/* Modal para edición */}
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal} ariaHideApp={false}>
        <h2 className='text-black text-center text-xl font-bold'>Editar Viaje</h2>
        {selectedRow && (
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              <div>
                <label className='text-black'>Estado</label>
                <input
                  type="text"
                  name="estado"
                  value={selectedRow.estado}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, estado: e.target.value })}
                  className="w-full rounded-[5px] shadow-xl text-black border-black border"
                />
              </div>

              <div>
                <label className='text-black'>Fecha Inicio</label>
                <input
                  type="datetime-local"
                  name="tiempoInicio"
                  value={selectedRow.tiempoInicio}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, tiempoInicio: e.target.value })}
                  className="w-full rounded-[5px] shadow-xl border-black border"
                />
              </div>
              <div>
                <label className='text-black'>Fecha Fin</label>
                <input
                  type="datetime-local"
                  name="tiempoFin"
                  value={selectedRow.tiempoFin}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, tiempoFin: e.target.value })}
                  className="w-full rounded-[5px] shadow-xl border-black border"
                />
              </div>
              <div>
                <label className='text-black'>Municipio</label>
                <select
                  name="municipio"
                  value={selectedRow.municipio.idMunicipio}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, municipio: e.target.value })}
                  className="w-full rounded-[5px] text-black shadow-xl border-black border"
                  id="id_municipio"
                >
                  <option value="">Seleccione un municipio</option>
                  {municipios.map((municipio) => (
                    <option key={municipio.idMunicipio} value={municipio.idMunicipio}>
                      {municipio.nombreMunicipio}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='text-black'>Tipo Desplazamiento</label>
                <select
                  name="desplazamiento"
                  value={selectedRow.tipoDesplazamiento.idDesplazamiento}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, desplazamiento: e.target.value })}
                  className="w-full rounded-[5px] text-black shadow-xl border-black border"
                  id="id_desplazamiento"
                >
                  <option value="">Seleccione un tipo de desplazamiento</option>
                  {desplazamientos.map((desplazamiento) => (
                    <option key={desplazamiento.idDesplazamiento} value={desplazamiento.idDesplazamiento}>
                      {desplazamiento.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='text-black'>Creador</label>
                <select
                  name="usuarioCrea"
                  value={selectedRow.usuarioCrea.idusuario}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, usuarioCrea: e.target.value })}
                  className="w-full rounded-[5px] text-black shadow-xl border-black border"
                  id="idusuario"
                >
                  <option value="">Seleccione un creador</option>
                  {creadores.map((creador) => (
                    <option key={creador.idusuario} value={creador.idusuario}>
                      {creador.nombreUsuario}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className='text-black'>Vehículo</label>
                <select
                  name="vehiculo"
                  value={selectedRow.vehiculo.idVehiculo}
                  onChange={(e) =>
                    setSelectedRow({ ...selectedRow, vehiculo: e.target.value })}
                  className="w-full rounded-[5px] text-black shadow-xl border-black border"
                  id="id_vehiculo"
                >
                  <option value="">Seleccione un vehículo</option>
                  {vehiculos.map((vehiculo) => (
                    <option key={vehiculo.idVehiculo} value={vehiculo.idVehiculo}>
                      {vehiculo.placa}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-black">Misión</label>
                <select
                  name="misiones"
                  value={selectedRow.misiones?.numeroMision || ""}
                  onChange={(e) => {
                    const numeroMisionSeleccionado = parseInt(e.target.value, 10);
                    const misionSeleccionada = misiones.find(
                      (mision) => mision.numeroMision === numeroMisionSeleccionado
                    );
                    setSelectedRow({ ...selectedRow, misiones: misionSeleccionada });
                  }}
                  className="w-full rounded-[5px] text-black shadow-xl border-black border"
                  id="numero_mision"
                >
                  <option value="">Seleccione una misión</option>
                  {misiones.map((mision) => (
                    <option key={mision.numeroMision} value={mision.numeroMision}>
                      {mision.nombreMision}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-center space-x-4 mt-10">
              <button
                type="button"
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Guardar Cambios
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                className="bg-gray-500 text-white font-bold px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Cancelar
              </button>
            </div>

          </form>
        )}
      </Modal>
    </div>
  );
};
TableComponent.propTypes = {
  searchTerm: PropTypes.string.isRequired  // 'searchTerm' es obligatorio y debe ser una cadena
};

export default TableComponent;
