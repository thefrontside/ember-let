/* jshint node: true */
'use strict';

var VersionChecker = require('ember-cli-version-checker');

module.exports = {
  name: 'ember-let',

  setupPreprocessorRegistry: function(type, registry) {
    let emberDep = new VersionChecker(this).forEmber();

    // Inline let is only supported in Ember 2.0 and up.
    if (emberDep.lt('2.0.0')) {
      return;
    }

    registry.add('htmlbars-ast-plugin', {
      name: 'inline-let',
      plugin: require('./lib/inline-let-transform'),
      baseDir: function() {
        return __dirname;
      }
    });
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    let emberDep = new VersionChecker(this).forEmber();

    let version;
    if (emberDep.lt('2.10.0')) {
      version = 'ember-lt-2-10';
    } else if (emberDep.lt('2.13.0')) {
      version = 'ember-lt-2-13';
    } else if (emberDep.lt('2.15.0-alpha.1')) {
      version = 'ember-lt-2-15';
    } else if (emberDep.gte('2.15.0-alpha.1')) {
      version = 'current';
    }

    app.import(`vendor/ember-let/${version}/register.js`);
  },

  treeForVendor: function(rawVendorTree) {
    let babelAddon = this.addons.find((addon) => addon.name === 'ember-cli-babel');

    let transpiledVendorTree = babelAddon.transpileTree(rawVendorTree, {
      'ember-cli-babel': {
        compileModules: false
      }
    });

    return transpiledVendorTree;
  }
};
