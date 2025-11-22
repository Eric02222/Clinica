import ConsultsCount from "../../components/counters/ConsultsCount"
import ExamsCount from "../../components/counters/ExamsCount"
import PacientsCount from "../../components/counters/PacientsCount"
import PacientList from "../../components/PacientsList/PacientList"


function DashBoard() {
    return (
        <>
            <h2 className="text-xl font-semibold mb-4">Estatísticas do Sistema</h2>
            <div className="flex gap-6">
                <PacientsCount/>
                <ConsultsCount/>
                <ExamsCount/>
            </div>
            <div>
                <PacientList/>
            </div>
        </>
    )
}

export default DashBoard