var path = require('path');
var cordovaCLI = require('cordova');

module.exports = function() {

      function _createProject(cb, cwd, pkgName, appName, appFolder){
          try {
              process.chdir(cwd + '/' + appFolder);
              cordovaCLI.create(process.cwd(), pkgName, appName, cb);
          } catch (err) {
              console.error('Failed to create cordova project: ' + err);
              process.exit(1);
          }

      }

      function _addPlataforms(cb, cwd, envs, chalk, log){
           if (typeof envs === 'undefined') {
              return;
          }
          try{

            for (var i = 0; i < envs.length; i++) {
              var env=envs[i];
              log(chalk.magenta('==> Add platforms \n'+envs[i]));
              cordovaCLI.platform('add', envs[i], cb);
            }
          } catch (err) {
              console.error('Failed to add platform : ' + err);
              process.exit(1);
          }
          
        }

        function _addPlugins(cb, cwd, plugins, chalk, log){
           if (typeof plugins === 'undefined') {
              return;
          }

          try{

            for (var i = 0; i < plugins.length; i++) {
              log(chalk.magenta('==> Add plugins '+plugins[i]));
              cordovaCLI.plugins('add', plugins[i], cb);
            }
          } catch (err) {
              console.error('Failed to add plugin : ' + err);
              process.exit(1);
          }
          
        }

	return{
		createProject: _createProject,
            addPlataforms: _addPlataforms,
            addPlugins: _addPlugins
	}

}