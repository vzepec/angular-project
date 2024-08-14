module.exports = function (config) {
  config.set({
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),  // Asegúrate de tener karma-coverage
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    reporters: ['progress', 'coverage'],  // 'coverage' agrega el reporte de cobertura
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'), // Directorio donde se guardará el reporte
      subdir: '.',
      reporters: [
        { type: 'html' },  // Genera un reporte en HTML
        { type: 'text-summary' }  // Muestra un resumen en la consola
      ]
    },
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};