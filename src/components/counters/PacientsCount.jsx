import {useState, useEffect} from 'react'
import axios from 'axios'
import {FaHospitalUser} from 'react-icons/fa'

function PacientsCount() {
    const [patientCount, setPatientCount] = useState(0);

    useEffect(() => {
        const fetchpatients = async () => {
            const token = localStorage.getItem("token")
            try{
                const res = await axios.get("http://localhost:4000/pacientes" , { headers: { Authorization: `Bearer ${token}` } });
                setPatientCount(res.data.length)
            }catch (error){
                console.log("Erro ao obter os dados dos pacientes", error)
            }
        }
        fetchpatients()
    }, [])

  return (
    <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
        <h2 className='text-xl font-bold items-center gap-2'>
            <FaHospitalUser className='text-blue-600'/>{patientCount}
        </h2>
        <p className='text-gray-600 mt-2'>Pacientes</p>
    </div>
  )
}

export default PacientsCount