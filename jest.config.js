module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom:["src/**/*.{js,vue}"],
  transformIgnorePatterns: ["node_modules/(?!axios)&(?!vee-validate/dist/rules)"],
  transform: {
    'vee-validate/dist/rules': 'babel-jest',
  },
}
/*

module.exports ={
  preset:'@vue/cli-plugin-unit-jest',
  transform: {
        'vee-validate/dist/rules': 'babel-jest',
},
transformIgnorePatterns: ['<rootDir>/node_modules/(?!vee-validate/dist/rules)',
],
}*/
