# Como o Elementor monta layouts hoje (modelo novo)

Desde a versão Elementor 3.12+, o editor ganhou o sistema chamado:

⭐ **Container-Based Layout (Flexbox)**

Isso substitui:
- Sections (Seções)
- Inner Sections (Seções internas)
- Columns (Colunas)

Agora tudo é baseado em:
**Container > Items (widgets ou outros containers)**

## 2. A lista atual de containers (estrutura moderna)

### 📦 Container (principal)

É o bloco estrutural base. Funciona como:
- Flexbox container (padrão)

Um container pode conter:
- widgets (texto, imagem, botões)
- outros containers (para layouts avançados)

## 3. Tipos de organização dentro de um Container

### A) Flexbox Container
É o modo padrão.

Controle:
- **Direction** → Row (linha) ou Column (coluna)
- **Wrap** → Se os itens quebram linha
- **Align Items** → Alinhamento vertical
- **Justify Content** → Alinhamento horizontal
- **Gap** → Espaço entre itens
- **Order** → Ordem de cada widget
- **Grow / Shrink / Basis** → Controle de tamanho dos itens (tipo CSS flex-grow)

**Usado para:**
Sidebars, cabeçalhos, seções horizontais ou verticais, separação de blocos.

### B) Grid Container (Em Breve)
*Nota: Funcionalidade planejada. No momento, foque no uso do Flexbox para atingir seus layouts.*

## 3. Comportamento de Drag & Drop (Novo)

Para resolver a ambiguidade de arrastar elementos para dentro ou ao lado de containers, o sistema adota zonas explícitas:

### 1. Aninhar (Colocar Dentro)
- **Container Vazio**: Arraste para o **CENTRO** (onde há o ícone `+`). O item será aninhado.
- **Container com Itens**: Arraste para a **BARRA DE ADIÇÃO** (Append Zone) que aparece no final da lista de itens (abaixo ou à direita). O item será adicionado ao final da lista interna.

### 2. Posicionar ao Lado (Sibling)
- Arraste para as **BORDAS** ou **LATERAIS** do container (fora das zonas de adição).
- O item será posicionado como **irmão** do container (lado a lado ou acima/abaixo, dependendo do pai).

Isso garante precisão total ao construir layouts complexos.

## 4. E onde entram os “itens”?

**Itens** = Cada widget dentro de um container.

Exemplo:
```
Container (Flex)
    ├─ Heading
    ├─ Text Editor
    ├─ Button
```

Ou:
```
Container (Grid)
    ├─ Image
    ├─ Image
    ├─ Image
    ├─ Image
```

Cada item tem controles próprios:
- Width / Height
- Order
- Align self
- Grow / Shrink
- Padding / Margin
- Responsive visibility

## 5. Diferença do sistema antigo para o novo

### ❌ Antigo (legacy)
`Section > Column > Widget`

### ✔️ Novo
`Container > Widget`

Ou:
`Container > Container > Widget`

Menos camadas, mais leve e mais rápido.
