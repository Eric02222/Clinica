import axios from 'axios'
import React, { useState } from 'react'
import { toast } from "react-toastify"

const RegisterUser = () => {
    //campos formularios
    const [name, setName] = useState('')
    const [cargo, setCargo] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    //verificador de correspondencia de senha
    const [isPasswordMatch, SetIsPasswordMatch] = useState(true)
    const [isSaving, SetIsSaving] = useState(false)

    //funções de alteração de estado
    const handleNameChange = (e) => setName(e.target.value)
    const handlesetCargoChange = (e) => setCargo(e.target.value)
    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value)

    //validação do campos de senha
    const ispassordValid = () => password.length >= 8 && password === confirmPassword

    //função para limpar formulario apos enviado
    const resetForm = () => {
        setName('')
        setEmail('')
        setCargo("")
        setPassword('')
        setConfirmPassword('')
        SetIsPasswordMatch(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!ispassordValid()) {
            SetIsPasswordMatch(false)
            return
        }

        SetIsSaving(true)
        try {
            await axios.post('http://localhost:4000/auth/register', {
                nome:  name,
                email: email,
                senha: password,
                cargo: cargo
            })


            resetForm()
            SetIsSaving(false)
            toast.success('Usuario criado com sucesso!', {
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false
            })
        } catch (error) {
            console.error("Erro ao criar usuario", error)
            SetIsSaving(false)
            toast.error('Erro ao criar usuario', {
                autoClose: 3000,
                hideProgressBar: true,
                pauseOnHover: false
            })
        }
    }

    return (
        <div className='w-full max-w-md p-6 bg-white rounded-xl shadow-lg '>
            <form onSubmit={handleSubmit} className='space-y-4'>

                <h2 className='text-2xl font-bold mb-6 text-center'>Criar Usuário</h2>

                <div>
                    <label htmlFor="nomeRegisterUser" className='block text-sm font-medium mb-1'>Nome</label>
                    <input type="text" id='nomeRegisterUser' value={name} onChange={handleNameChange} required className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </div>

                <div>
                    <label htmlFor="emailRegisterUser" className='block text-sm font-medium mb-1'>Email</label>
                    <input type="email" id='emailRegisterUser' value={email} onChange={handleEmailChange} required className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </div>

                <div>
                    <label htmlFor="cargoRegisterUser" className='block text-sm font-medium mb-1'>Cargo</label>
                    <input type="text" id='cargoRegisterUser' value={cargo} onChange={handlesetCargoChange} required className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </div>

                <div>
                    <label htmlFor="passwordRegisterUser" className='block text-sm font-medium mb-1'>Senha</label>
                    <input type="password" id='passwordRegisterUser' value={password} onChange={handlePasswordChange} required minLength={8} className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />
                </div>

                <div>
                    <label htmlFor="confirmPassword" className='block text-sm font-medium mb-1'>Confirmar Senha</label>
                    <input type="password" id='confirmPassword' value={confirmPassword} onChange={handleConfirmPasswordChange} required minLength={8} className='w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' />

                    {!isPasswordMatch && (
                        <p className='text-red-500 text-sm mt-1 text-center'>Senhas não correspodem</p>
                    )}

                </div>


                <div className='flex justify-center'>
                    <button type='submit' disabled={isSaving} className={`w-full p-2 rounded-lg text-white ${isSaving ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'} transition-colors`}>
                        {isSaving ? 'Salvando' : 'Criar Usuário'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterUser