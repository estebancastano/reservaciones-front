
const ConfirmationToast = ({ onConfirm, onCancel }) => (
    <div>
        <p>¿Estás seguro de que deseas eliminar este viaje?</p>
        <div className="flex space-x-2 mt-2">
            <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={onConfirm}
            >
                Confirmar
            </button>
            <button
                className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-500"
                onClick={onCancel}
            >
                Cancelar
            </button>
        </div>
    </div>
);

export default ConfirmationToast;
