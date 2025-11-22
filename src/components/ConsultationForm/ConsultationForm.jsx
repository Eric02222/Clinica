import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'

import Modal from "../Modal/Modal.jsx"

function ConsultationForm() {
    //variaveis e estados
    const [searchTerm, setSearchTerm] = useState("")
    const [patients, setPatients] = useState([])
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [formData, setFormData] = useState(
        {
            reason: "",
            date: "",
            time: "",
            description: "",
            medication: "",
            dosagePrecaution: ""
        }
    )

    //busca pacientes

    const fetchPatients = async () => {
        try {
            const res = await axios.get("http://localhost:3000/patients")
            setPatients(res.data)
        } catch (e) {
            console.error("Erro ao obter dados", e)
        }
    }

    useEffect(() => {
        fetchPatients()
    }, [])

    //funções auxiliares

    const handleSearchChange = (e) => searchTerm(e.target.value)
    const filteredPatients = patients.filter(
        (patients) => patients.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || patients.id.toString().includes(searchTerm)
    )


    const handleSelectPatients = (patient) => {
        setSelectedPatient(patient)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedPatient(null)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const resetForm = () => {
        setFormData({
            reason: "",
            date: "",
            time: "",
            description: "",
            medication: "",
            dosagePrecaution: ""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedPatient) return;

        try {
            setIsSaving(true)
            const dataToSave = {
                patientId: selectedPatient.id,
                ...formData
            }

            await axios.post("http://localhost:3000/consults", dataToSave)
            toast.success("Consulta Cadastrada com sucesso", {
                autoClose: 3000,
                hideProgressBar: true
            })

            resetForm()
            handleCloseModal()
        } catch (e) {
            toast.error("Erro ao cadastrar Consulta!", {
                autoClose: 3000,
                hideProgressBar: true
            })
        }finally{
            setIsSaving(false)
        }
    }


    return (
        <section className='p-6 text-gray-800'>
            {/*Campo Busca*/}
            <div className='mb-6'>
                <label htmlFor="searchBar" className='block text-sm font-semibold mb-2'>Busca paciente para cadastrar consulta</label>
                <input
                    type="text"
                    id="searchBar"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-600 outiline-none'
                    placeholder='Digite nome ou registro do paciente'
                />
            </div>

            {/* Lista de pacientes */}

            <ul className='apace-y-3'>
                {filteredPatients.map((patient) => (
                    <li
                        key={patient.id}
                        className="p-4 borde rounded-lg shadow-sm flex justify-between items-center hover:bg-gray-50 transition"
                    >
                        <div>
                            <p className='text-sm'>
                                <strong>Registro:</strong>{patient.id}
                            </p>
                            <p className='text-sm'>
                                <strong>Nome:</strong>{patient.name}
                            </p>
                            <p className='text-sm'>
                                <strong>convênio:</strong>{patient.heathInsurance}
                            </p>
                        </div>
                        <button onClick={() => handleSelectPatients(patient)} className='bg-cyan-700 text-white px-3 py-2 rounded-lg hover:bg-cyan-600 transition'>Selecionar</button>
                    </li>
                ))}
            </ul>

            {/* Modal de cadastro consulta */}

            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {selectedPatient && (
                    <>
                        <h2 className='text-lg font-bold mb-4 text-cyan-700 '>
                            Cadastrar consulta para {selectedPatient.fullName}
                        </h2>

                        <div className='mb-4 text-sm text-gray-700'>
                            <p>
                                <strong>Email: </strong>{selectedPatient.email}
                            </p>
                            <p>
                                <strong>Telefone: </strong>{selectedPatient.phone}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className='space-y-4'>
                            <div>
                                <label htmlFor="reason" className='block text-sm font-medium mb-1'>Motivo consulta</label>
                                <input type="text"
                                    name='reason'
                                    id='reason'
                                    value={formData.reason}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none' />
                            </div>

                            <div className='grid grid-cols-2 gap-4'>
                                <div>
                                    <label htmlFor="date" className='block text-sm font-medium mb-1'>Data:</label>
                                    <input type="date"
                                        name='date'
                                        id='date'
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none' />
                                </div>

                                <div>
                                    <label htmlFor="time" className='block text-sm font-medium mb-1'>Horario:</label>
                                    <input type="time"
                                        name='time'
                                        id='time'
                                        value={formData.time}
                                        onChange={handleInputChange}
                                        required
                                        className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none' />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="description" className='block text-sm font-medium mb-1'>Descrição Problema:</label>
                                <textarea
                                    name='description'
                                    id='description'
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows='3'
                                    required
                                    className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none' />
                            </div>

                            <div>
                                <label htmlFor="medication" className='block text-sm font-medium mb-1'>Medicação Receita:</label>
                                <input
                                    type='text'
                                    name='medication'
                                    id='medication'
                                    value={formData.medication}
                                    onChange={handleInputChange}
                                    required
                                    className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none' />
                            </div>

                            <div>
                                <label htmlFor="dosagePrecaution" className='block text-sm font-medium mb-1'>Dosagem e Precauções:</label>
                                <textarea
                                    name='dosagePrecaution'
                                    id='dosagePrecaution'
                                    value={formData.dosagePrecaution}
                                    onChange={handleInputChange}
                                    rows='3'
                                    required
                                    className='w-full border p-2 rounded-lg focus:ring-cyan-600 outline-none' />
                            </div>

                            {/*  */}

                            <div className='flex justify-end gap-3 pt-4'>
                                <button type='button' onClick={handleCloseModal} className='px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition'>cancelar</button>

                                <button type='submit' disabled={isSaving} className='px-4 py-2 bg-cyan-700 text-white rounded-lg hover:bg-cyan-600 disable:opacity-50 transition'>{isSaving ? "Salvando..." : "Salvar" }</button>
                            </div>
                        </form>
                    </>
                )}
            </Modal>
        </section>
    )
}

export default ConsultationForm