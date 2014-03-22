'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var exec = require('child_process').exec;
var cordovaCLI = require('cordova');

var prompts = require('./modules/af.prompt');
var afUtil = require('./modules/af.util');
var afCordova = require('./modules/af.cordova');

var folders={
  appName:'mobile'
}

var AfGenerator = yeoman.generators.Base.extend({
  init: function() {
    this.pkg = require('../package.json');

    this.on('end', function() {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function() {

    this.cwd = process.cwd();

    var done = this.async();

    this.log(chalk.magenta(afUtil.call(this).tlantic));

    this.prompt(prompts.call(this).mainPrompts, function(props) {

      this.gitData = {};

      this.appName      = props.appName;
      this.pkgName      = props.pkgName;
      this.author       = props.author;
      this.envs         = props.envs;
      this.hasRepo      = props.hasRepo;
      this.plugins      = props.plugins;

      if (props.hasRepo) {
        this.prompt(prompts.call(this).gitPrompts, function(props) {
          this.gitData.username = props.gitUser;
          this.gitData.password = props.gitPass;
          this.gitData.repo     = props.gitRepo;
           console.log(this.gitData);
         done(); 
        }.bind(this));
      } else
        done();

    }.bind(this));

  },

  getSeedProject: function(){
    console.log('DOWNLOAD');
  },


  app: function() {

    process.chdir(this.cwd);
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');

    this.mkdir(folders.appName);
    process.chdir(this.cwd + '/' +folders.appName);
  },

  createProject: function(){
    var cb = this.async();
    afCordova.call(this).createProject(cb, this.cwd, this.pkgName, this.appName, folders.appName);
  },

  addPlataforms: function(){
    var cb = this.async();
    afCordova.call(this).addPlataforms(cb, this.cwd, this.envs, chalk, this.log);
  },

  addPlugins: function(){
    var cb = this.async();
    afCordova.call(this).addPlugins(cb, this.cwd, this.plugins, chalk, this.log);
  }


  /*addPlugins: function(){
    var done = this.async();
    for (var i = 0; i < this.plugins.length; i++) {
      this.log(chalk.magenta('==> Add plugin '+this.plugins[i]));
      var child = exec('cd '+this.appName+'; sudo cordova plugin add '+this.plugins[i],
      function (error) {
        if (error !== null) {
          console.log(error);
        }
        
      }.bind(this));
    };
    
    done();
  }*/



  /*projectfiles: function() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
  },*/


 /* downloadServerSeed: function(){
    console.log("*****************");
    var done = this.async();
    this.log(chalk.magenta('Download Server Seed'));
    var child = exec('git clone https://github.com/andrepinto/MobileReadings.git MobileReadings',
      function (error) {
        if (error !== null) {
          console.log(error);
        }
        done();
      }.bind(this));
  }*/
});

module.exports = AfGenerator;