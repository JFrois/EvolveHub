# 🚀 EvolveHub

> **O seu portal para o futuro do trabalho.**
> Uma plataforma unificada focada no profissional moderno, atacando três pilares essenciais: **Bem-estar, Requalificação (Reskilling) e Produtividade.**

## 📋 Sobre o Projeto

O **EvolveHub** é um Dashboard Inteligente desenvolvido para ajudar profissionais a gerenciar sua carreira e saúde mental em um ambiente de trabalho híbrido. A aplicação monitora o humor diário, gerencia trilhas de aprendizado e oferece um assistente de IA para tirar dúvidas técnicas.

### ✨ Principais Funcionalidades

1.  **🏠 Dashboard Unificado**
    * Check-in diário inteligente (Humor, Sentimento no Trabalho, Modo Presencial/Remoto).
    * Widgets de acesso rápido e saudação personalizada.
    * Visualização rápida dos cursos em andamento.

2.  **📚 Trilha de Aprendizagem (Kanban)**
    * Gestão visual de cursos e skills no formato Kanban (A Fazer, Em Progresso, Concluído).
    * Adição de novos cursos com detalhes (Instituição, Cargas Horária, Link).
    * Checklist de sub-tarefas para cada curso.
    * Persistência de dados local.

3.  **🤖 LabIA (Co-Piloto)**
    * Chat inteligente integrado com a **Google Gemini AI**.
    * Tire dúvidas técnicas, peça dicas de carreira ou resumos de conteúdo.
    * Interface amigável estilo chat.

4.  **📊 Painel Administrativo (Analytics)**
    * Gráficos visuais (Chart.js) mostrando a evolução do bem-estar.
    * Comparativo entre trabalho Home Office vs Presencial.
    * KPIs de produtividade e horas de estudo.

5.  **👤 Perfil & Autenticação**
    * Login simulado (Admin e Convidado).
    * Edição de perfil com salvamento local.
    * Persistência de sessão (não desloga ao atualizar a página).

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as tecnologias mais modernas do ecossistema JavaScript:

* **Frontend:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Estilização:** [React Bootstrap](https://react-bootstrap.netlify.app/) + CSS Modules
* **Roteamento:** [React Router Dom](https://reactrouter.com/)
* **Gráficos:** [Chart.js](https://www.chartjs.org/) + React-Chartjs-2
* **Inteligência Artificial:** [Google Generative AI SDK](https://ai.google.dev/) (Gemini Flash 1.5)
* **Backend (Serverless):** Node.js (Vercel Functions) para proteger a API Key.
* **Armazenamento:** LocalStorage (Simulação de Banco de Dados no navegador).

---

## 🚀 Como Rodar o Projeto

Siga os passos abaixo para rodar o EvolveHub na sua máquina:

### 1. Pré-requisitos
* Node.js instalado (versão 18 ou superior recomendada).
* Uma chave de API do Google Gemini (Gratuita no [Google AI Studio](https://aistudio.google.com/)).

### 2. Instalação

Clone o repositório e instale as dependências:

```bash
# Clone este repositório
git clone [https://github.com/JFrois/EvolveHub.git](https://github.com/JFrois/EvolveHub.git)

# Entre na pasta
cd EvolveHub

# Instale as dependências
npm install
````

### 3\. Configuração da API Key (IA)

Para que o **LabIA** funcione, você precisa configurar a chave de API.
Crie um arquivo chamado `.env` na raiz do projeto (ao lado do `package.json`) e adicione:

```env
GEMINI_API_KEY=sua_chave_do_google_aqui
```

*(Substitua `sua_chave_do_google_aqui` pela chave que você gerou).*

### 4\. Rodando Localmente

```bash
npm run dev
```

O projeto rodará geralmente em `http://localhost:5173`.

-----

## 📂 Estrutura de Pastas

```text
EvolveHub/
├── api/                 # Backend Serverless (Integração com IA)
│   ├── ai.js            # Configuração do Gemini
│   └── chat.js          # Rota da API
├── public/              # Arquivos estáticos
├── src/
│   ├── assets/          # Imagens e Logos
│   ├── components/      # Componentes reutilizáveis (Cards, Navbar, Widgets)
│   ├── pages/           # Páginas principais (Dashboard, Trilha, Admin...)
│   ├── App.jsx          # Roteamento principal
│   └── main.jsx         # Ponto de entrada
└── ...
```

-----

## 🔐 Login de Acesso

Para testar as funcionalidades, você pode usar:

  * **Modo Convidado:** Clique em "Continuar sem login" na tela inicial.
  * **Criar Conta:** Cadastre um nome e e-mail fictício para ver a personalização.
  * **Admin (Hardcoded):**
      * *Email:* `admin@admin.com.br`
      * *Senha:* `admin1234`

-----

## 🤝 Contribuição

Contribuições são bem-vindas\! Se você tiver sugestões de melhorias:

1.  Faça um Fork do projeto.
2.  Crie uma Branch para sua Feature (`git checkout -b feature/NovaFeature`).
3.  Faça o Commit (`git commit -m 'Add some AmazingFeature'`).
4.  Faça o Push (`git push origin feature/NovaFeature`).
5.  Abra um Pull Request.

-----