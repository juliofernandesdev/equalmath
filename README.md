# EqualMath 🧮

A calculadora desenvolvida com React Native e Expo SDK 54.

## Funcionalidades

### Calculadora Básica
- Operações fundamentais (soma, subtração, multiplicação, divisão)
- Porcentagem
- Troca de sinal
- Histórico de cálculos
- Interface intuitiva e responsiva

### Calculadora Científica
- **Trigonometria**: sin, cos, tan, sinh, cosh, tanh
- **Funções inversas**: arcsin, arccos, arctan
- **Logaritmos**: log, ln, log₂
- **Potências**: x², x³, xʸ, 10ˣ, eˣ, 2ˣ
- **Raízes**: √, ∛
- **Outras funções**: fatorial, valor absoluto, arredondamento
- **Constantes**: π, e, φ (razão áurea), √2
- **Unidades angulares**: graus, radianos, grados

### Modo Programador
- Conversão entre bases: Binário, Octal, Decimal, Hexadecimal
- Tamanhos de bits: 8, 16, 32, 64 bits
- Operações bitwise: AND, OR, XOR, NOT
- Shift de bits: LSH, RSH

### Conversor de Unidades (12 categorias, 100+ unidades)
- **Comprimento**: km, m, cm, mm, milha, jarda, pé, polegada
- **Massa**: tonelada, kg, g, mg, libra, onça
- **Temperatura**: Celsius, Fahrenheit, Kelvin
- **Volume**: m³, litro, galão, xícara
- **Área**: km², m², hectare, acre
- **Velocidade**: m/s, km/h, mph, nó, Mach
- **Tempo**: ano, mês, semana, dia, hora, minuto, segundo
- **Dados**: TB, GB, MB, KB, bytes, bits
- **Energia**: Joule, caloria, kWh
- **Pressão**: Pascal, bar, atm, PSI
- **Ângulo**: grau, radiano, grado
- **Moeda**: BRL, USD, EUR, GBP, JPY

### Calculadora Financeira
- **Empréstimos**: cálculo de parcelas, juros totais
- **Juros compostos**: montante final, rendimento
- **Gorjeta**: cálculo com divisão entre pessoas
- **Desconto**: preço final e economia
- **Margem**: lucro, margem e markup

### Calculadora de Datas
- Diferença entre datas (dias, semanas, meses, anos)
- Adicionar/subtrair dias, semanas, meses ou anos

### Histórico
- Últimos 100 cálculos salvos
- Acesso rápido a resultados anteriores
- Persistência de dados

### Memória
- MC (Memory Clear) - Limpar memória
- MR (Memory Recall) - Recuperar valor
- M+ (Memory Add) - Adicionar à memória
- M- (Memory Subtract) - Subtrair da memória
- MS (Memory Store) - Armazenar valor

## Design

### Temas
- **Modo Claro**: Branco com alto contraste
- **Modo Escuro**: Preto com alto contraste
- **Automático**: Segue configuração do sistema

### Interface
- Design moderno e minimalista
- Animações suaves
- Feedback tátil (haptics)
- Gestos de swipe para navegar entre modos

## Tecnologias

- **React Native** - Framework mobile
- **Expo SDK 54** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **Math.js** - Biblioteca de cálculos avançados
- **AsyncStorage** - Persistência de dados
- **Expo Haptics** - Feedback tátil

## Instalação

### Pré-requisitos
- Node.js 20+
- npm ou yarn
- Expo CLI
- Expo Go app (para testes)

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/juliofernandesdev/equalmath.git
cd equalmath
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o projeto:
```bash
npm start
```

4. Escaneie o QR code com o app Expo Go

## 📦 Scripts

```bash
npm start              # Inicia o servidor de desenvolvimento
npm run android        # Abre no emulador Android
npm run ios            # Abre no simulador iOS
npm run web            # Abre no navegador
```

## 📁 Estrutura do Projeto

```
src/
├── components/                # Componentes reutilizáveis
│   ├── CalcButton.tsx              # Botão da calculadora
│   ├── Display.tsx                 # Display principal
│   ├── BasicKeypad.tsx             # Teclado básico
│   ├── ScientificKeypad.tsx
│   └── ProgrammerKeypad.tsx
├── contexts/                       # Contextos React
│   ├── ThemeContext.tsx            # Gerenciamento de tema
│   └── CalculatorContext.tsx
├── screens/                   # Telas do app
│   ├── MainScreen.tsx
│   ├── ConverterScreen.tsx
│   ├── FinancialScreen.tsx
│   ├── DateScreen.tsx
│   ├── HistoryScreen.tsx
│   └── SettingsScreen.tsx
├── themes/                    # Definições de tema
├── types/                     # Tipos TypeScript
└── utils/                     # Funções utilitárias
    ├── calculator.ts
    └── conversions.ts
```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está sob a licença MIT.

---

Feito com ❤️ para você




