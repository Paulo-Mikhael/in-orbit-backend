# in.orbit back-end
![rotas da aplicação documentadas visualmente pelo swagger](public/server-docs.png)

## Sobre ✏️
### Este é o servidor de uma aplicação chamada [in.orbit](https://github.com/Paulo-Mikhael/in-orbit-frontend?tab=readme-ov-file#readme), responsável por guardar e gerenciar as metas do usuário, elas são armazenadas em um banco de dados postgresql por um container docker e gerenciadas pelo framework back-end fastify. Além do mais, as rotas da aplicação podem ser acessadas visualmente por uma documentação swagger.

## Tecnologias 💻
<div>
  <abbr title="Node.js - Runtime Javascript">
    <img src="https://img.shields.io/badge/Node.js-5FA04E.svg?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="badge do Node.js" />
  </abbr>
  <abbr title="Typescript - Linguagem fortemente tipada">
    <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="badge da linguagem Typescript" />
  </abbr>
  <abbr title="Fastify - Framework back-end" >
    <img src="https://img.shields.io/badge/Fastify-000000.svg?style=for-the-badge&logo=Fastify&logoColor=white" alt="badge do framework Fastify" />
  </abbr>
  <abbr title="Docker - Serviço de containers" >
    <img src="https://img.shields.io/badge/Docker-2496ED.svg?style=for-the-badge&logo=Docker&logoColor=white" alt="badge do aplicativo Docker" />
  </abbr>
  <abbr title="Postgres - Banco de dados relacional" >
    <img src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white" alt="badge do banco de dados Postgres" />
  </abbr>
</div>

## Bibliotecas 📚
<div>
  <abbr title="Drizzle - ORM (Object-Relational Mapping), para manipular dados do banco" >
    <img src="https://img.shields.io/badge/Drizzle-C5F74F.svg?style=for-the-badge&logo=Drizzle&logoColor=black" alt="badge da biblioteca e ORM Drizzle" />
  </abbr>
  <abbr title="ZOD - Validação de dados" >
    <img src="https://img.shields.io/badge/Zod-3E67B1.svg?style=for-the-badge&logo=Zod&logoColor=white" alt="badge da biblioteca zod" />
  </abbr>
  <abbr title="Biome - Formatação de código automática">
    <img src="https://img.shields.io/badge/Biome-60A5FA.svg?style=for-the-badge&logo=Biome&logoColor=white" alt="badge da biblioteca zod" />
  </abbr>
</div>

## Estrutura principal do Projeto 🗃️
```plaintext
src
├── db/
│   ├── index.ts
│   ├── schema.ts
│   └── seed.ts
├── functions/
│   └── ...
├── http/
│   ├── routes/
│   │   └── ...
│   └── server.ts
└── env.ts
```
### Descrição:
- src - Contém todos os componentes da aplicação;
- db - Contém os arquivos que conectam a aplicação ao banco de dados, em index.ts fica a conexão ao banco, em schema.ts, as tabelas, e em seed.ts, uma função que insere alguns dados inicias no banco;
- functions - as funções que inserem e retornam dados ao banco;
- http - dentro de routes, ficam os arquivos responsáveis por cada rota individual, e são agrupadas dentro de server.ts;
- env.ts - fica as variáveis que pegam seus valores do arquivo .env da raíz do projeto, com ajuda da biblioteca ZOD;

## Rodando Localmente (Prompt) 📟
### Caso não tenha, instale o [docker desktop](https://www.docker.com/products/docker-desktop/), e deixe-o aberto/segundo plano (importante)
### Clone o projeto
```bash
  git clone https://github.com/Paulo-Mikhael/in-orbit-backend
```
### Entre no diretório do projeto
```bash
  cd in-orbit-backend
```
### Instale as dependências
```bash
  npm install
```
### Execute o container docker (caso não funcione, certifique-se de estar no diretório do projeto e de estar seguindo o passo 1)
```bash
  docker compose up
```
### Insira alguns dados iniciais (opcional)
```bash
  npm run seed
```
### Inicie o servidor
```bash
  npm run dev
```

## Rotas 🗺️
### Caso tenha seguido todos os passos de "[Rodando Localmente](#rodando-localmente-prompt-)", a documentação swagger estará disponível na url [http://localhost:8301](http://localhost:8301)
### Criar meta:
```bash
  POST "/goals"
  Content-Type: application.json
  body: {
    title: string,
    desiredWeeklyFrequency: number,
  }
```
### Completar meta:
```bash
  POST "/completions"
  Content-Type: application.json
  body: {
    goalId: string
  }
```
### Retornar metas pendentes da semana:
```bash
  GET "/pending-goals"
  // retorna:
  {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    completionCount: number;
  }[]
```
### Retornar sumário da semana:
```bash
  GET "/week"
  // retorna:
  {
    completed: number;
    total: number;
    goalsPerDay: Record<string, {
        id: string;
        title: string;
        completedAt: string;
    }[]>;
  }
```

## Talvez você queira ver 💡
  ### [Portifólio](https://portifolio-react-three.vercel.app/)
  ### [Currículo](https://docs.google.com/document/d/1xhimUtV6EM7c1GtwBwAHsIonX1HjoLSi/edit)

## Confira meus outros projetos 🛠️
  - [in.orbit (front-end) - Aplicação de metas pessoais](https://github.com/Paulo-Mikhael/in-orbit-frontend?tab=readme-ov-file#readme)
  - [Blog PHLOX - Blog de uma empresa de tecnologia](https://github.com/Paulo-Mikhael/phlox-blog?tab=readme-ov-file#readme)
  - [Fastask - Gerenciador de Tarefas](https://github.com/Paulo-Mikhael/fastask?tab=readme-ov-file#readme)
  - [Landing Page para uma academia](https://github.com/Paulo-Mikhael/academia-landing-page?tab=readme-ov-file#readme)
  - [Landing Page para um e-commerce de tech](https://github.com/Paulo-Mikhael/phlox?tab=readme-ov-file#readme)
  - [Landing Page para um e-commerce de plantas](https://github.com/Paulo-Mikhael/casa-verde?tab=readme-ov-file#readme)

## Contatos 📞
  [![Gmail Badge](https://img.shields.io/badge/Gmail-EA4335.svg?style=for-the-badge&logo=Gmail&logoColor=white)](https://portifolio-react-three.vercel.app/contacts)
  [![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0A66C2.svg?style=for-the-badge&logo=LinkedIn&logoColor=white)](https://www.linkedin.com/in/paulo-miguel-4b706022b/)
  [![Instagram Badge](https://img.shields.io/badge/Instagram-E4405F.svg?style=for-the-badge&logo=Instagram&logoColor=white)](https://www.instagram.com/pa__miguel?igsh=MWxoYzdqNGluZWcyaA%3D%3D)
  [![Whatsapp Badge](https://img.shields.io/badge/WhatsApp-25D366.svg?style=for-the-badge&logo=WhatsApp&logoColor=white)](https://api.whatsapp.com/send/?phone=5592992813253&text=Ol%C3%A1%21+Gostaria+de+fazer+uma+oferta...&type=phone_number&app_absent=0)
