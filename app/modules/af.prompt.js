var path = require('path');

module.exports = function() {

    _mainPrompts = [{
        type: 'input',
        name: 'appName',
        message: 'App Name:',
        default: path.basename(process.cwd())
    }, {
        type: 'input',
        name: 'pkgName',
        message: 'Package Name (ex: com.tlantic.' + path.basename(process.cwd()) + '):',
        default: "com.tlantic." + path.basename(process.cwd())
    }, {
        type: 'input',
        name: 'author',
        message: 'Author:',
        default: ""
    }, {
        type: 'checkbox',
        name: 'envs',
        choices: [{
            name: 'android',
            value: 'android'
        }, {
            name: 'ios',
            value: 'ios'
        }, {
            name: 'wp8',
            value: 'wp8'
        }, {
            name: 'windows8',
            value: 'windows8'
        }],
        message: 'Platforms Support',
        validate: function(input) {
            return input instanceof Array && input.length > 0 ? true : " Please select an environment";
        }
    }, {
        type: 'checkbox',
        name: 'plugins',
        choices: JSON.parse(this.readFileAsString(path.join(__dirname, '../data/plugins.json'))),
        message: 'Plugins:'
    }, {
        type: 'confirm',
        name: 'hasRepo',
        message: 'Create Github Repository',
        default: false
    }];

    _gitPrompts = [
    {
        type: 'input',
        name: 'gitRepo',
        message: 'Git Repository?',
        default: null
    },
    {
        type: 'input',
        name: 'gitUser',
        message: 'Git Username?',
        default: null
    },
    {
        type: 'input',
        name: 'gitPass',
        message: 'Git Password?',
        default: null
    }];

    return {
        mainPrompts: _mainPrompts,
        gitPrompts: _gitPrompts
    }
};