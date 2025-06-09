# PDF Manager

## Descrição

PDF Manager é uma aplicação web desenvolvida em Angular para gerenciar arquivos PDF. A aplicação permite fazer upload, visualizar, baixar e excluir arquivos PDF de forma simples e intuitiva.

## Funcionalidades

- **Upload de PDFs**: Arraste e solte ou selecione arquivos PDF (máximo 10 arquivos, 7MB cada)
- **Listagem de PDFs**: Visualize todos os seus PDFs com informações detalhadas
- **Visualização de PDFs**: Abra os PDFs diretamente no navegador
- **Download de PDFs**: Baixe os PDFs para o seu dispositivo
- **Exclusão de PDFs**: Remova PDFs que não são mais necessários
- **Geração de miniaturas**: Visualize miniaturas dos seus PDFs

## Tecnologias Utilizadas

- **Frontend**: Angular 19
- **Backend**: API REST (Node.js/Express)
- **Estilização**: CSS puro
- **HTTP**: Angular HttpClient

## Estrutura do Projeto

```
src/
├── app/                      # Componente principal
├── components/               # Componentes reutilizáveis
│   ├── file-upload/          # Componente de upload de arquivos
│   └── pdf-list/             # Componente de listagem de PDFs
├── models/                   # Interfaces e tipos
│   └── pdf.model.ts          # Modelos para PDFs e respostas da API
├── services/                 # Serviços
│   └── pdf.service.ts        # Serviço para comunicação com a API de PDFs
└── global_styles.css         # Estilos globais
```

## Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
```

2. Instale as dependências:
```bash
cd api-pdf-angular
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

4. Acesse a aplicação em `http://localhost:4200`

## API Backend

A aplicação se comunica com uma API REST que deve estar rodando em `http://localhost:3000/pdf`.

Endpoints utilizados:
- `GET /pdf`: Listar todos os PDFs
- `POST /pdf/upload`: Upload de PDFs
- `GET /pdf/:id`: Obter um PDF específico
- `DELETE /pdf/:id`: Excluir um PDF
- `GET /pdf/thumbnail/:id`: Obter a miniatura de um PDF
- `POST /pdf/thumbnail/:id/generate`: Gerar miniatura para um PDF que não possui miniatura

## Licença

Este projeto está licenciado sob a licença MIT.
