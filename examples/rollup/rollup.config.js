import babel from 'rollup-plugin-babel'

export default {
  moduleName: 'ReopTools',
  moduleId: 'repo-tools',
  plugins: [
    babel({
      babelrc: false,
      presets: [['es2015', { "modules": false }]], // note the nested arrays
      exclude: 'node_modules/**'
    })
  ]
}
