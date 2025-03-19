## Como Usar

1. Clone o repositório.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute a aplicação:
   ```bash
   npm run start:dev
   ```

## Tecnologias

- NestJS
- GraphQL
- Apollo Server
- class-validator
- class-transformer

## Rotas RESTful

### 1. Listar todos os produtos

- **Método:** `GET`
- **Rota:** `/products`
- **Query Params:**
  - `sortBy`: Campo pelo qual os produtos devem ser ordenados.
  - `order`: Direção da ordenação (`asc` ou `desc`).
  - `limit`: Número máximo de produtos a serem retornados.
  - `skip`: Número de produtos a serem ignorados antes de começar a retornar.
  - `select`: Campos específicos a serem retornados.

**Exemplo de requisição:**

```http
GET /products?sortBy=price&order=desc&limit=10&skip=0&select=title,price
```

### 2. Buscar produtos por nome

- **Método:** `GET`
- **Rota:** `/products/search`
- **Query Params:**
  - `q`: nome de busca (obrigatório).

**Exemplo de requisição:**

```http
GET /products/search?q=notebook
```

### 3. Obter um produto por ID

- **Método:** `GET`
- **Rota:** `/products/:id`
- **Parâmetros:**
  - `id`: ID do produto.

**Exemplo de requisição:**

```http
GET /products/1
```

## Queries GraphQL

### 1. Listar todos os produtos

- **Query:** `products`
- **Retorno:** Lista de produtos.

**Exemplo de consulta:**

```graphql
query {
  products {
    id
    title
    price
    rating
    stock
    category
    thumbnail
  }
}
```

### 2. Obter um produto por ID

- **Query:** `product`
- **Argumentos:**
  - `id`: ID do produto.
- **Retorno:** Detalhes do produto.

**Exemplo de consulta:**

```graphql
query {
  product(id: 1) {
    id
    title
    price
    description
    rating
    stock
    category
    thumbnail
    reviews {
      rating
      comment
      reviewerName
    }
  }
}
```

### 3. Buscar produtos por nome

- **Query:** `searchProducts`
- **Argumentos:**
  - `query`: Nome de busca.
- **Retorno:** Lista de produtos que correspondem ao nome de busca.

**Exemplo de consulta:**

```graphql
query {
  searchProducts(query: "notebook") {
    id
    title
    price
    rating
    stock
    category
    thumbnail
  }
}
```
