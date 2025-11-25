# 🏥 Sistema Integrado de Gestão Clínica (SIGC)

> **Versão:** 1.0.0 (Alpha) | **Status:** Em Desenvolvimento

Bem-vindo à documentação oficial do **Sistema de Gestão Clínica**. Esta plataforma é uma solução web moderna desenvolvida para otimizar o fluxo administrativo e médico de clínicas de saúde. O projeto foca na centralização de informações, permitindo desde o cadastro de pacientes até o gerenciamento detalhado de prontuários eletrônicos, consultas e exames.

---

## 📑 Índice

1.  [Visão Geral do Projeto](#-visão-geral-do-projeto)
2.  [Arquitetura e Tecnologias](#-arquitetura-e-tecnologias)
3.  [Funcionalidades Detalhadas](#-funcionalidades-detalhadas)
4.  [Estrutura de Diretórios](#-estrutura-de-diretórios)
5.  [Instalação e Configuração](#-instalação-e-configuração)
6.  [Guia de Uso](#-guia-de-uso)

---

## 🔭 Visão Geral do Projeto

O objetivo principal desta aplicação é eliminar o uso de papel e planilhas descentralizadas, oferecendo uma interface unificada (SPA - Single Page Application) onde médicos e recepcionistas podem atuar simultaneamente.

A aplicação resolve problemas como:
* Fragmentação do histórico do paciente.
* Lentidão no acesso a dados de consultas anteriores.
* Dificuldade na padronização de cadastros.

---

## 🛠️ Arquitetura e Tecnologias

O sistema foi construído utilizando uma stack de ponta, priorizando performance, manutenibilidade e experiência do desenvolvedor (DX).

### Core
* **[React 19](https://react.dev/):** Utilização das APIs mais recentes do React para renderização otimizada.
* **[Vite](https://vitejs.dev/):** Build tool de última geração para desenvolvimento ágil.
* **[React Router v7](https://reactrouter.com/):** Gerenciamento robusto de rotas e navegação.

### Estilização e UI
* **[TailwindCSS v4](https://tailwindcss.com/):** Framework utility-first para design responsivo e consistente.
* **React Icons:** Biblioteca de ícones vetoriais.
* **React Toastify:** Sistema de notificações flutuantes para feedback de ações.

### Gerenciamento de Dados
* **Context API:** Utilizado para controle de estado global, especificamente no contexto de Autenticação (`AuthContext`).
* **Axios:** Cliente HTTP para comunicação com o backend.
* **JSON Server:** API REST simulada para prototipagem rápida e persistência de dados em desenvolvimento (`db.json`).

---

## 🚀 Funcionalidades Detalhadas

### 1. Autenticação e Segurança
O sistema possui uma camada de proteção via `PrivateRoutes`. Apenas usuários autenticados (tokenizado via Contexto) podem acessar o Dashboard e dados sensíveis.
* Login de usuários.
* Registro de novos administradores.
* Logout seguro.

### 2. Gestão de Pacientes (`Patients`)
Módulo completo para administração da base de clientes da clínica.
* **Listagem Inteligente:** Visualização rápida de todos os pacientes cadastrados.
* **Perfil Detalhado:** Acesso à página `PatientDetails` contendo dados pessoais e histórico clínico.
* **Validação de Dados:** Uso de `react-imask` para garantir que CPF, Telefones e datas sigam o padrão nacional.

### 3. Prontuário Eletrônico e Histórico (`Medical Records`)
O coração do sistema médico. Permite o registro e consulta de atendimentos passados.

* **Agendamento e Registro:** Formulários específicos para `ConsultationForm` (Consultas) e `ExamForm` (Exames).
* **Histórico Cronológico:** Visualização em timeline de todos os atendimentos do paciente.
* **Ferramenta de Produtividade (Smart Copy):**
    Para agilizar a rotina médica, cada card de histórico possui uma função de cópia rápida. Isso permite que o médico copie os dados do atendimento (Sintomas, Medicação, Dosagem) com um clique para colar em laudos externos.

    > **Visualização da Funcionalidade:**
    >
    > *O usuário visualiza o registro e clica no ícone de cópia:*
    > ![Card de Consulta](./assets/card-consulta.png)
    >
    > *O sistema confirma a ação visualmente:*
    > ![Confirmação de Cópia](./assets/card-copiado.png)

### 4. Dashboard Administrativo
Painel inicial que fornece métricas rápidas sobre o estado da clínica (total de pacientes, atendimentos do dia, etc), servindo como ponto de partida para a navegação.

---

## 📂 Estrutura de Diretórios

O projeto segue uma arquitetura modular, facilitando a escalabilidade.

```bash
src/
├── components/         # UI Kits e componentes isolados
│   ├── ConsultationForm/
│   ├── CopyButton/     # Lógica do botão de cópia
│   ├── ExamForm/
│   ├── Modal/
│   └── ...
├── contexts/           # Estados Globais (Auth, Theme, etc)
├── layouts/            # Wrappers de layout (Sidebar + Content)
├── pages/              # Telas da aplicação
│   ├── DashBoard/
│   ├── Login/
│   ├── Pacientes/
│   └── PatientDetails/
├── services/           # Configurações de API (Axios)
├── assets/             # Imagens e ícones estáticos
└── main.jsx            # Ponto de entrada
