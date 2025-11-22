import { useEffect, useState } from "react";

export function Pacientes() {

    const getPacientes = async () => {
        const [pacientes, setPacientes] = useState([])

        const BEARER_TOKEN = localStorage.getItem("token")

        try {
            const res = await axios.get("http://localhost:3000/pacientes", {
                headers: {
                    'Authorization': `Bearer ${BEARER_TOKEN}`
                }
            });
            setPacientes(res.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getPacientes()
    }, [])

    return (
        <div>
            <table>
                <thead>
                    <tr className="flex gap-2 ">
                        <td className="border">id</td>
                        <td className="border">nome</td>
                        <td className="border">cpf</td>
                        <td className="border">telefone</td>
                        <td className="border">email</td>
                        <td className="border">data_nascimento</td>
                        <td className="border">responsavel</td>
                        <td className="border">sexo</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        pacientes.map(() => {
                            <tr key={pacientes.id}>
                                <td className="border">{pacientes.id}</td>
                                <td className="border">{pacientes.nome}</td>
                                <td className="border">{pacientes.cpf}</td>
                                <td className="border">{pacientes.telefone}</td>
                                <td className="border">{pacientes.email}</td>
                                <td className="border">{pacientes.data_nascimento}</td>
                                <td className="border">{pacientes.responsavel}</td>
                                <td className="border">{pacientes.sexo}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

