/*import { FaRegUser } from "react-icons/fa";*/
import { useLocation } from 'react-router-dom';
import Logo from '../assets/img/logo.jpeg'

const Header = () => {
  const location = useLocation();
  return (
    <header className="relative h-12 max-w-xl w-full bg-secondary rounded-2xl shadow-xl flex items-center justify-center mx-auto mt-5 px-4">
      <img src={Logo} className='w-10 h-10 rounded-md'/>
      <h1 className="text-lg sm:text-xl text-center w-full pr-10">
        Agendamiento Disponibilidad Vehicular
      </h1>

      {location.pathname === '/admin' && (
        <a className="text-sm sm:text-base absolute right-0 mb-6 sm:mb-0 ml-4 pr-2" href='/login'>
          Iniciar sesión
        </a>
      )}
    </header>


  )
}

export default Header