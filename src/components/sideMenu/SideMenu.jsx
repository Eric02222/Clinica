import { useState } from 'react';
import { Link, useNavigate, NavLink  } from 'react-router';
import { MdDashboard, MdExitToApp, MdMenu, MdClose } from 'react-icons/md'
import { FaUserPlus, FaListAlt, FaCalendarCheck } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext';

export const SideMenu = () => {
    const navigate = useNavigate();
    const { logout } = useAuth;

    const [isCollapse, setIsCollapse] = useState(false)

    const handleLogout = () => {
        logout();
        navigate('/')
    }

    const toggleMenu = () => {
        setIsCollapse(!isCollapse)
    }

    return (
        <aside className={`h-screen bg-cyan-800 text-white flex flex-col justify-between transition-all duration-300 ${isCollapse ? "w-15" : "w-64"}`} >

            <div className='p-4 flex items-center justify-between border-2 border-cyan-700'>
                {
                    !isCollapse && (
                        <h1 className='text-lg font-bold'>Clinica</h1>
                    )
                }

                <button onClick={toggleMenu} className='text-white hover:text-cyan-300 focus:outline-none cursor-pointer'>
                    {isCollapse ? <MdMenu size={24} /> : <MdClose size={24} />}
                </button>
            </div>

            <nav className='flex-1 p-4 space-y-4 overflow-y-auto'>
                <ul className='space-y-3'>
                    <li>
                        <NavLink  to="/dashboard" className={({ isActive }) =>
                            isActive ? "bg-cyan-600 font-bold flex items-center gap-3 p-1 w-full rounded transition duration-300" : "flex items-center gap-3 hover:text-cyan-300 transition duration-300"
                        }><MdDashboard size={20} />{!isCollapse && <span>Inicio</span>} </NavLink >
                    </li>

                    {!isCollapse && <h2 className='text-white py-4 font-bold text-lg'>Pacientes</h2>}

                    <li>
                        <NavLink to="/prontuarios" className={({ isActive }) =>
                            isActive ? "bg-cyan-600 font-bold flex items-center gap-3 p-1 w-full rounded transition duration-300" : "flex items-center gap-3 hover:text-cyan-300 transition duration-300"
                        }><FaListAlt size={20} />{!isCollapse && <span>Protuarios</span>} </NavLink>
                    </li>

                    <li>
                        <NavLink to="/pacientes" className={({ isActive }) =>
                            isActive ? "bg-cyan-600 font-bold flex items-center gap-3 p-1 w-full rounded transition duration-300" : "flex items-center gap-3 hover:text-cyan-300 transition duration-300"
                        }><FaUserPlus size={20} />{!isCollapse && <span>Pacientes</span>} </NavLink>
                    </li>

                    {!isCollapse && <h2 className='text-white py-4 font-bold text-lg'>Consultas e Exames</h2>}


                    <li>
                        <NavLink to="/consultas" className={({ isActive }) =>
                            isActive ? "bg-cyan-600 font-bold flex items-center gap-3 p-1 w-full rounded transition duration-300" : "flex items-center gap-3 hover:text-cyan-300 transition duration-300"
                        }><FaCalendarCheck size={20} />{!isCollapse && <span>Consultas</span>} </NavLink>
                    </li>

                    <li>
                        <NavLink to="/exames" className={({ isActive }) =>
                            isActive ? "bg-cyan-600 font-bold flex items-center gap-3 p-1 w-full rounded transition duration-300" : "flex items-center gap-3 hover:text-cyan-300 transition duration-300"
                        }><FaListAlt size={20} />{!isCollapse && <span>Exames</span>} </NavLink>
                    </li>

                </ul>
            </nav>

            {/*Botão Sair*/}
            <div className='p-4 border-t border-cyan-700'>
                <button onClick={handleLogout} className='flex items-center gap-3 text-red-300 hover:text-red-500 w-full'>
                    <MdExitToApp size={20} />
                    {!isCollapse && <span>Sair</span>}
                </button>
            </div>
        </aside>
    )
}