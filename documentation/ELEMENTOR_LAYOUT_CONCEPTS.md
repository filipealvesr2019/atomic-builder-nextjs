# Como o Elementor monta layouts hoje (modelo novo)

Desde a versão Elementor 3.12+, o editor ganhou o sistema chamado:

⭐ **Container-Based Layout (Flexbox e Grid)**

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
- Grid container (opcional)

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

### B) Grid Container
Layout em grade, estilo CSS Grid.

Controle:
- **Columns** → Número de colunas
- **Rows** → Automático / Manual
- **Gap** → Espaços horizontais/verticais
- **Minmax** → Largura mínima e máxima das células
- **Auto-flow** → Como os itens são distribuídos
- **Item placement** → Cada widget pode ocupar 1×1, 1×2, 2×2, etc.

**Usado para:**
Galerias, cards, vitrines, listagens responsivas.

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
