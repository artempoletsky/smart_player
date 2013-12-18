module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: ['src/stub.js'
                    , 'src/html5.js'
                    , 'src/samsung.js'
                    , 'src/lg.js'
                ],
                dest: 'bin/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'bin/<%= pkg.name %>.js',
                dest: 'bin/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            scripts: {
                files: 'src/*.js',
                tasks: ['build'],
                options: {
                    debounceDelay: 250
                }
            }
        }
    });


    //grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('build', ['concat', 'uglify']);
    grunt.registerTask('default', ['build']);


};