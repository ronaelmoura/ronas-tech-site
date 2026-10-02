import { ScrollProgress } from './effects'

// A home mantém apenas um indicador de leitura; a rolagem é nativa e
// nenhum conteúdo é escondido enquanto módulos são carregados.
function HomeMotion() {
  return <ScrollProgress />
}

export default HomeMotion
