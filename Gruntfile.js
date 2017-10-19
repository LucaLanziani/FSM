module.exports = function(grunt) {
  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> v<%= pkg.version %> by <%= pkg.author.name %> <<%= pkg.author.email %>> (<%= pkg.author.url %>) */\n',
        mangle: false
      },
      build: {
        src: 'src/fsm.js',
        dest: 'src/fsm.min.js'
      }
    },
    jasmine: {
      build: {
        src: ['src/fsm.js'],
        options: {
          specs: 'spec/fsm-spec.js',
          helpers: 'spec/spec-helper.js'
        }
      }
    }
  });
  // Plug-ins
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Tasks
  grunt.registerTask('build', ['uglify:build']);
};
