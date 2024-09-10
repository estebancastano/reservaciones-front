/*import { FaRegUser } from "react-icons/fa";*/
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  return (
    <header className="relative h-12 max-w-5xl w-full bg-secondary rounded-2xl shadow-xl flex items-center justify-center mx-auto mt-5 px-4">
  <h1 className="text-lg sm:text-xl text-center w-full">
    Agendamiento Disponibilidad Vehicular
  </h1>

  {location.pathname === '/admin' && (
    <a className="text-sm sm:text-base absolute right-4 mb-6 sm:mb-0" href='/login'>
      Iniciar sesión
    </a>
  )}
</header>


  )
}

export default Header