// Registry de templates importados
// Cada template deve ser adicionado aqui manualmente após importação
import rustic_store_nextjs from './rustic-store-nextjs/src/app/page';

const templates = {};

// Função para registrar um template
export function registerTemplate(name, component) {
  templates[name] = component;
}

// Função para obter um template
export function getTemplate(name) {
  return templates[name] || null;
}

// Função para obter todos os templates
export function getAllTemplates() {
  return templates;
}


// Register rustic-store-nextjs
registerTemplate('rustic-store-nextjs', rustic_store_nextjs);
export default templates;
