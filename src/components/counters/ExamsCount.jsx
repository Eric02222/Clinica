import {useState, useEffect} from 'react'
import axios from 'axios'
import {FaPaste} from 'react-icons/fa'

function ExamsCount() {
    const [examCount, setExamCount] = useState(0);

    useEffect(() => {
        const fetchexamns = async () => {
            const token = localStorage.getItem("token")
            try{
                const res = await axios.get("http://localhost:4000/exames", { headers: { Authorization: `Bearer ${token}` } });
                setExamCount(res.data.length)
            }catch (error){
                console.log("Erro ao obter os dados dos Exames", error)
            }
        }
        fetchexamns()
    }, [])

  return (
    <div className='bg-white shadow rounded-lg p-6 flex flex-col items-center w-60'>
        <h2 className='text-xl font-bold items-center gap-2'>
            <FaPaste className='text-blue-600'/>{examCount}
        </h2>
        <p className='text-gray-600 mt-2'>Exames</p>
    </div>
  )
}

export default ExamsCount