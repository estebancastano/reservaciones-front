import PropTypes from 'prop-types';

const SearchBar = ({ searchTerm, handleChange }) => (
    <input
        type='text'
        placeholder="Buscar..."
        onChange={handleChange}
        value={searchTerm}
        className='rounded-lg h-8 mb-8'
    />
);

SearchBar.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
