module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON("package.json"),
    banner: "/*!\n"
      + " * <%= pkg.title %> - v<%= pkg.version %>\n"
      + " *\n"
      + " * Copyright (c) <%= grunt.template.today('yyyy') %> <%= pkg.author.name %> <<%= pkg.author.url %>>\n"
      + " * Released under the <%= pkg.license %> license\n"
      + " *\n"
      + " * Date: <%= grunt.template.today('yyyy-mm-dd') %>\n"
      + " */\n\n",
    // Task configuration.
    concat: {
      options: {
        separator: "\n\n",
        stripBanners: true
      },
      dist: {
        options: { banner: "<%= banner %>" },
        src: [
          "src/intro.js",
          "src/utils.js",
          "src/callbacks.js",
          "src/listener.js",
          "src/reporter.js",
          "src/rules.js",
          "src/modules.js",
          "src/inspector.js",
          "src/modules/**/*.js",
          "src/rules/**/*.js",
          "src/outro.js"
        ],
        dest: "dist/<%= pkg.name %>.js"
      },
      spec: {
        src: [
          "spec/src/helpers.js",
          "spec/src/inspector-spec.js",
          "spec/src/callbacks-spec.js",
          "spec/src/listener-spec.js",
          "spec/src/reporter-spec.js",
          "spec/src/modules-intro.js",
          "spec/src/modules/*.js",
          "spec/src/modules-outro.js",
          "spec/src/rules-intro.js",
          "spec/src/rules/*.js",
          "spec/src/rules-outro.js"
        ],
        dest: "spec/<%= pkg.name %>-spec.js"
      },
      core: {
        src: [
          "src/intro.js",
          "src/utils.js",
          "src/callbacks.js",
          "src/listener.js",
          "src/reporter.js",
          "src/rules.js",
          "src/modules.js",
          "src/inspector.js",
          "src/modules/**/*.js",
          "src/outro.js"
        ],
        dest: "dist/<%= pkg.name %>.core.js"
      },
      validation: {
        src: "src/rules/validation/*.js",
        dest: "dist/<%= pkg.name %>.validation.js"
      },
      convention: {
        src: "src/rules/convention/*.js",
        dest: "dist/<%= pkg.name %>.convention.js"
      },
      "best-practices": {
        src: "src/rules/best-practices/*.js",
        dest: "dist/<%= pkg.name %>.best-practices.js"
      }
    },
    jshint: {
      options: grunt.file.readJSON(".jshintrc"),
      dist: {
        src: "<%= concat.dist.dest %>"
      },
      spec: {
        src: "<%= concat.spec.dest %>"
      }
    },
    watch: {
      scripts: {
        files: ["src/**/*.js"],
        tasks: ["concat:dist", "jshint:dist"]
      },
      spec: {
        files: ["spec/src/**/*.js"],
        tasks: ["concat:spec", "jshint:spec"]
      },
      gruntfile: {
        files: ["Gruntfile.js"],
        tasks: ["default"]
      }
    },
    jasmine: {
      options: {
        // vendor: grunt.file.readJSON(".bowerrc").directory + "/jquery/jquery.js",
        specs: "spec/html-inspector-spec.js",
        styles: "spec/html-inspector-spec.css",
        outfile: "spec-runner.html",
        keepRunner: true
      },
      src: ["dist/html-inspector.js"]
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task.
  grunt.registerTask("default", ["concat", "jshint"]);

  grunt.registerTask("test", ["concat", "jshint", "jasmine"]);

};
