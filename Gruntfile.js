module.exports = function(grunt) {


  var settings = grunt.file.readJSON('config/grunt_settings.json');

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    deployments: {
      options:{
        "backups_dir": "db",
        "replace_url": false
      },
      local:{
        "title": "Local",
        "database": settings.db.local.database,
        "user": settings.db.local.user,
        "pass": settings.db.local.pass,
        "host": settings.db.local.host,
        // note that the `local` target does not have an "ssh_host"
      },
      staging:{
        "title": "Staging",
        "database": settings.db.staging.database,
        "user": settings.db.staging.user,
        "pass": settings.db.staging.pass,
        "host": settings.db.staging.host,
        "ssh_host": "root@198.58.109.239 -p 24"
      },
      production:{
        "title": "Production",
        "database": "",
        "user": "",
        "pass": "",
        "host": "",
        "ssh_host": ""
      }
    },

    copy: {
      plugins: {
        files: [

          // Foundation
          {cwd: "public/bower_components/foundation/js", src: '**', dest: 'public/assets/scripts/vendor', expand: true, flatten: false},
          {cwd: "public/bower_components/foundation/scss/foundation", src: '**', dest: 'public/assets/styles/sass/foundation', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "public/bower_components/foundation/scss", src: 'foundation.scss', dest: 'public/assets/styles/sass/', expand: true, flatten: false},
          {isFile: true, rename: function(dest, src){ return dest + "_" + src; }, cwd: "public/bower_components/foundation/scss", src: 'normalize.scss', dest: 'public/assets/styles/sass/', expand: true, flatten: false},

          {expand: true, flatten: false, cwd: "public/bower_components/requirejs", src: 'require.js', dest: 'public/assets/scripts/vendor/', filter: 'isFile'},

        ]
      }
    },

    // -- Require.js Compiling
    requirejs: {
      compile: {
        options: {
          name: "main",
          baseUrl: "public/assets/scripts",
          mainConfigFile: "public/assest/scripts/main.js",
          out: "public/assets/scripts/main-built.js"
        }
      }
    },

    // -- Adding bower packages to require.js paths
    bower: {
      target: {
        rjsConfig: 'public/assets/scripts/main.js',
        options: {
          exclude: ['requirejs']
        }
      }
    }

  });

  // TASKS
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-deployments');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks("grunt-rsync");

  grunt.registerTask("copy-plugins", ["copy:plugins"]);
  grunt.registerTask("content_pull", ["rsync:production"]);
  grunt.registerTask("copy-bower", ["bower"]);

  //Default task(s).
  //grunt.registerTask('default', [""]);




};