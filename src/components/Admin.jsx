import { FaRegCheckCircle } from "react-icons/fa";
const Admin = () => {
    return (
        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
                <label>Asignación</label>
                <input type="text" className="w-full rounded-[5px]" disabled />
            </div>

            <div>
                <label>Documento</label>
                <input type="text" className="w-full rounded-[5px]" disabled />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
                <label>Observaciones</label>
                <input type="text" className="w-full rounded-[5px]" disabled />
            </div>

            <div>
                <label>Fecha</label>
                <input type="date" className="w-full rounded-[5px]" disabled />
            </div>

            <div>
                <label>Turno</label>
                <input type="text" className="w-full rounded-[5px]" disabled />
            </div>

            <div>
                <label>Vehículo</label>
                <input type="text" className="w-full rounded-[5px]" disabled />
            </div>

            <div>
                <button type="submit">
                <FaRegCheckCircle className="w-full rounded-[5px] cursor-pointer" disabled/>
                </button>
            </div>
        </div>

    )
}

export default Admin