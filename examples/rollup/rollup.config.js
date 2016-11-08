import babel from 'rollup-plugin-babel'

export default {
  moduleName: 'ReopTools',
  moduleId: 'repo-tools',
  plugins: [
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      plugins: [
        'babel-plugin-external-helpers'
      ],
      presets: [
        [
          'es2015',
          {
            modules: false
          }
        ]
      ]
    })
  ]
}
