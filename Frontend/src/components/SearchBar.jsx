import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, handleChange }) => (
    <input
        type="text"
        placeholder="Buscar...."
        className="mb-4 p-2 border border-gray-300 rounded"
        value={searchTerm}
        onChange={handleChange}
    />
);

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
