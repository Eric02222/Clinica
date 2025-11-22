# 🏥 Plataforma de Gestão Clínica

Sistema web desenvolvido para gerenciamento integral de clínicas médicas

## 🚀 Funcionalidades

Com base na estrutura do projeto, as principais funcionalidades incluem:

* **🔐 Autenticação & Segurança:**
    * Login e Registro de Usuários.
    * Proteção de rotas (Rotas Privadas) via Context API.
* **👥 Gestão de Pacientes:**
    * Cadastro completo de pacientes.
    * Listagem e busca de pacientes.
    * Página de detalhes do paciente.
* **📝 Atendimentos:**
    * Agendamento de Consultas (`ConsultationForm`).
    * Solicitação e registro de Exames (`ExamForm`).
    * Histórico de Prontuários Médicos.
* **📊 Dashboard:**
    * Painel administrativo com visão geral da clínica.
    * Layout responsivo com Menu Lateral (`SideMenu`).
* **🔔 Notificações:**
    * Feedback visual de ações (sucesso/erro) utilizando Toasts.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído com as versões mais recentes das seguintes ferramentas:

* **Core:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Estilização:** [TailwindCSS v4](https://tailwindcss.com/)
* **Roteamento:** [React Router v7](https://reactrouter.com/)
* **Gerenciamento de Estado:** Context API + Hooks
* **Requisições HTTP:** Axios
* **Utilitários:**
    * `react-imask`: Para máscaras de inputs (CPF, Telefone, etc).
    * `react-toastify`: Para notificações flutuantes.
    * `react-icons`: Para ícones vetoriais.
* **Mock Backend:** `json-server` (Simulação de API REST).

## 📂 Estrutura do Projeto

```bash
src/
├── components/      # Componentes reutilizáveis (Forms, Modais, Botões)
├── contexts/        # Estado Global (AuthContext)
├── layouts/         # Layouts de página (DashboardLayout)
├── pages/           # Páginas (Login, Dashboard, Pacientes, Prontuários)
├── services/        # Configuração do Axios e Banco de dados (db.json)
└── ...