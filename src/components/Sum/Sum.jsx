const Sum = ({ attributes }) => {
  // Caso os atributos ainda não tenham sido carregados, retorna o level 1 padrão
  if (!attributes) return 1;

  // Soma todos os valores numéricos dos atributos atuais
  const totalAttributes = Object.values(attributes).reduce((acc, curr) => {
    return acc + (parseInt(curr, 10) || 0);
  }, 0);

  // No Elden Ring: 80 pontos totais (10 em cada) = Level 1
  // Portanto, a fórmula é: Total de pontos - 79
  const currentLevel = totalAttributes - 79;

  // Evita exibir níveis negativos se o usuário limpar algum input
  return currentLevel > 0 ? currentLevel : 1;
};

export default Sum;
