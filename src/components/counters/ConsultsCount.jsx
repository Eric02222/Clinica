import {useState, useEffect} from 'react'
import axios from 'axios'
import {FaChair} from 'react-icons/fa'

function ConsultsCount() {
    const [consultCount, setconsultCount] = useState(0);

    useEffect(() => {
        const fetchConsults = async () => {
            const token = localStorage.getItem("token")
            try{
                const res = await axios.get("http://localhost:4000/consultas", { 
                    headers: { Authorization: `Bearer ${token}` },
                    params: {page: 1, limit: 100}
                 });
                setconsultCount(res.data.length)
            }catch (error){
                console.log("Erro ao obter os dados dos Consultas", error)
            }
        }
        fetchConsults()
    }, [])

  return (
    <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
        <h2 className='text-xl font-bold items-center gap-2'>
            <FaChair className='text-blue-600'/>{consultCount}
        </h2>
        <p className='text-gray-600 mt-2'>Consultas</p>
    </div>
  )
}

export default ConsultsCount