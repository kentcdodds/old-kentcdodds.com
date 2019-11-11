module.exports = {
  '*.js': ['eslint', 'jest --findRelatedTests'],
  '*.+(js|jsx|json|yml|yaml|css|less|scss|ts|tsx|md|graphql|mdx)': [
    'prettier --write',
    'git add',
  ],
  '*.+(md|mdx)': ['prettier --parser mdx --write', 'git add'],
}
