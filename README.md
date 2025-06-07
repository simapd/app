# SIMAPD App

## 📱 Sobre o Projeto

O **SIMAPD** (Sistema Integrado de Monitoramento e Alerta para Prevenção de Desastres) é um aplicativo desenvolvido em React Native com Expo, projetado para enfrentar uma das maiores vulnerabilidades socioambientais do Brasil: os desastres naturais causados por deslizamentos e inundações. O aplicativo oferece uma interface intuitiva para monitoramento em tempo real de áreas de risco, permitindo que cidadãos reportem situações perigosas e acompanhem alertas baseados em dados de sensores IoT e relatórios da comunidade.

Entre 1988 e 2022, o Brasil registrou 4.146 mortes por deslizamentos, com cerca de 3,9 milhões de pessoas vivendo em 13.297 áreas de risco mapeadas. O SIMAPD transforma a gestão de riscos de um modelo reativo para uma abordagem proativa e preventiva, utilizando tecnologia para salvar vidas e reduzir prejuízos econômicos.

## 🎬 Demonstração

**Link do vídeo:** [https://youtu.be/uqZ41_ldQD0](https://youtu.be/uqZ41_ldQD0)

## 👥 Equipe de Desenvolvimento

| Nome | RM | E-mail | GitHub | LinkedIn |
|------|-------|---------|---------|----------|
| Arthur Vieira Mariano | RM554742 | arthvm@proton.me | [@arthvm](https://github.com/arthvm) | [arthvm](https://linkedin.com/in/arthvm/) |
| Guilherme Henrique Maggiorini | RM554745 | guimaggiorini@gmail.com | [@guimaggiorini](https://github.com/guimaggiorini) | [guimaggiorini](https://linkedin.com/in/guimaggiorini/) |
| Ian Rossato Braga | RM554989 | ian007953@gmail.com | [@iannrb](https://github.com/iannrb) | [ianrossato](https://linkedin.com/in/ianrossato/) |

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm
- Expo CLI (`npm install -g @expo/cli`)
- Dispositivo móvel com Expo Go ou emulador Android/iOS

### Variáveis de Ambiente

Configure as seguintes variáveis de ambiente:
```env
EXPO_PUBLIC_JAVA_URL=<URL_DA_API_JAVA>
EXPO_PUBLIC_ASPNET_URL=<URL_DA_API_DOTNET>
```

### Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/simapd/app.git
   cd app
   ```

2. **Instale as dependências:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Inicie o projeto:**
   ```bash
   npx expo start
   ```

## 🏗️ Arquitetura e Tecnologias

### Stack Principal
- **React Native** 0.79.2
- **Expo** 53.0.9
- **TypeScript** 5.8.3
- **Expo Router** 5.0.6
- **NativeWind** 4.1.23
- **TailwindCSS** 3.4.17

### Gerenciamento de Estado e Dados
- **TanStack React Query** 5.79.2 (cache e sincronização)
- **AsyncStorage** 2.1.2 (persistência local)
- **React Hook Form** 7.56.3 (formulários)
- **Zod** 3.24.4 (validação de schemas)

### Interface e UX
- **Lucide React Native** 0.509.0 (ícones)
- **React Native Reanimated** 3.17.5 (animações)
- **Sonner Native** 0.19.1 (notificações)
- **Bottom Sheet** 5.1.4 (modais)
- **Victory Native** 41.17.3 (gráficos)

### Integração com APIs
- **Fetch API** (comunicação com backend)
- **JWT Decode** 4.0.0 (autenticação)
- **APIs Java e .NET** (backend integrado)

## 🎯 Principais Recursos

### Interface do Usuário
- **Tema Dinâmico:** Alternância entre claro/escuro/sistema
- **Design System:** Componentes customizados consistentes
- **Responsividade:** Interface adaptada para diferentes tamanhos de tela
- **Feedback Visual:** Loading states, toasts e animações

### Navegação
- **File-based Routing:** Expo Router para navegação intuitiva
- **Tab Navigation:** Navegação principal por abas
- **Stack Navigation:** Fluxos de autenticação e formulários
- **AuthGuard:** Proteção de rotas autenticadas

### Gerenciamento de Estado
- **Server State:** React Query para cache inteligente
- **Form State:** React Hook Form para formulários performáticos
- **Auth State:** Context API para autenticação global
- **Persistent State:** AsyncStorage para preferências

## 📱 Funcionalidades do App

### Autenticação
- **Login:** Acesso seguro com email e senha
- **Cadastro:** Registro de novos usuários por área de risco
- **Recuperação:** Validação JWT e gestão de sessão

### Dashboard Principal (Home)
- **Informações da Área:** Dados da região de risco do usuário
- **Alertas de Risco:** Sistema de alertas baseado em severidade
- **Estatísticas:** Gráficos de medições e relatórios recentes
- **Relatórios Recentes:** Lista dos últimos reports da comunidade

### Sistema de Relatórios
- **Criar Relatório:** Formulário para reportar riscos observados
- **Histórico:** Visualização de relatórios anteriores

### Configurações
- **Edição de Perfil:** Alteração de dados pessoais
- **Seleção de Tema:** Escolha entre claro, escuro ou sistema
- **Gerenciar Conta:** Opções de logout e exclusão de conta

## 🌍 Impacto Social

O SIMAPD visa transformar a gestão de riscos ambientais no Brasil, oferecendo:
- **Prevenção:** Alertas antecipados para evacuação
- **Participação Cidadã:** Engajamento da comunidade no monitoramento
- **Redução de Prejuízos:** Minimização de perdas humanas e econômicas

## 📄 Licença

Este projeto foi desenvolvido para fins acadêmicos como parte do Global Solution da FIAP - MOBILE APPLICATION DEVELOPMENT.