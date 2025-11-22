import { useState, useEffect } from 'react'
import { Link } from 'react-router'
import axios from 'axios'


const MedicalRepordList = () => {
    const [patients, setPatients] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchPatients = async () => {
        const token = localStorage.getItem("token")
        try {
            const res = await axios.get("http://localhost:4000/pacientes" , { headers: { Authorization: `Bearer ${token}` } })

            setPatients(res.data)
        } catch (e) {
            console.error("Erro ao obter dados do paticente", e)
        }
    }

    useEffect(() => {
        fetchPatients()
    }, []);

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value)
    }

    const filteredPatients = patients.filter((patient) => {
        return (
            patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
            patient.id.toString().includes(searchTerm) 
        )
    })

    return (
        <section className='p-6 bg-gray-50 rounded-lg shadow-md'>
            <h2 className='text-2x-l font-bold mb-6 text-gray-800'>
                Listagem de Pacientes
            </h2>
            {/* campo busca */}

            <div className='mb-6 flex flex-col sm:flex=row sm:items-center sm:justify-between gap-3'>
                <label htmlFor="" className='text-gray-700 font-medium'>Buscar Paciente:</label>
                <input type="text" id="search" value={searchTerm} onChange={handleSearchTerm} placeholder='Digite o nome ou o Indentificador' className='w-full sm:w1/2 p-2 border roumded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600'/>
            </div>

            {/* Lista de Pacientes */}

            <ul className='space-y-4'>
                {
                    filteredPatients.length > 0 ? (
                        filteredPatients.map((patients) => (
                            <li key={patients.id} className='p-4 bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow'>
                                <p className='text-sm text-gray-700'>
                                    <strong className='text-gray-500'>Registro:</strong> {patients.id}
                                </p>
                                <p className='text-sm text-gray-700'>
                                    <strong className='text-gray-500'>Nome:</strong> {patients.fullName}
                                </p>
                                <p className='text-sm text-gray-700'>
                                    <strong className='text-gray-500'>Convênio:</strong> {patients.heathInsurance}
                                </p>
                                
                                <Link to={`/paciente/${patients.id}`} className='inline-block mt-2 text-cyan-700 font-semibold hover:underline'>Ver detalhes</Link>
                            </li>
                        ))
                    ):(
                        <p className='text-gray-600'>Nenhum Paciente Encontrado.</p>
                    )
                }
            </ul>

        </section>
    )


}   

export default MedicalRepordList;