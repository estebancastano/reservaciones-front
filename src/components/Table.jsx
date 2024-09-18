import PropTypes from 'prop-types';  // Importa PropTypes
import DataTable from 'react-data-table-component';

const TableComponent = ({ searchTerm }) => {
  const columns = [
    { name: 'Asignación', selector: row => row.asignacion, width:"100px" },
    { name: 'Documento', selector: row => row.documento, width:"100px" },
    { name: 'Observación', selector: row => row.observacion, wrap:true, width:"300px" },
    { name: 'Fecha', selector: row => row.fecha, width:"100px", wrap:true},
    { name: 'Turno', selector: row => row.turno, width:"150px" },
    { name: 'Vehículo', selector: row => row.vehiculo, width:"100px" }
  ];

  const data = [
    { asignacion: '0935823', documento: '124532344', observacion: 'Se requiere fotógrafo y herramientas', fecha: '09/09/2024', turno: '7:00am-5:00pm', vehiculo:'Moto' },
    { asignacion: '0935824', documento: '124356344', observacion: 'Se requiere herramientas', fecha: '08/09/2024', turno: '7:00am-5:00pm', vehiculo:'Carro' },
    { asignacion: '0935825', documento: '124426344', observacion: 'Se requiere herramientas', fecha: '15/09/2024', turno: '8:00am-5:00pm', vehiculo:'Moto' },
    { asignacion: '0935825', documento: '124426344', observacion: 'Se requiere herramientas', fecha: '15/09/2024', turno: '8:00am-5:00pm', vehiculo:'Moto' },
    { asignacion: '0935825', documento: '124426344', observacion: 'Se requiere herramientas', fecha: '15/09/2024', turno: '8:00am-5:00pm', vehiculo:'Moto' },
    { asignacion: '0935825', documento: '124426344', observacion: 'Se requiere herramientas', fecha: '15/09/2024', turno: '8:00am-5:00pm', vehiculo:'Moto' },
    { asignacion: '0935825', documento: '124426344', observacion: 'Se requiere herramientas', fecha: '15/09/2024', turno: '8:00am-5:00pm', vehiculo:'Moto' },
    { asignacion: '0935825', documento: '124426344', observacion: 'Se requiere herramientas', fecha: '15/09/2024', turno: '8:00am-5:00pm', vehiculo:'Moto' },
    { asignacion: '0935825', documento: '124426344', observacion: 'Se requiere herramientas', fecha: '15/09/2024', turno: '8:00am-5:00pm', vehiculo:'Moto' },
  ];

  const filteredData = data.filter(row => 
    row.asignacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.documento.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.observacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.fecha.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.turno.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.vehiculo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginationComponentOptions = {
    selectAllRowsItem: true,
    noRowsPerPage: true,
    selectAllRowsItemText: "ALL",
  };

  return (
    <DataTable 
      columns={columns}
      data={filteredData}
      pagination
      paginationPerPage={5}
      noDataComponent={<h2>No hay datos que mostrar, busca de nuevo</h2>}
      paginationComponentOptions={paginationComponentOptions}
    />
  );
};

// Validación de prop-types
TableComponent.propTypes = {
  searchTerm: PropTypes.string.isRequired  // 'searchTerm' es obligatorio y debe ser una cadena
};

export default TableComponent;

