import Ember from 'ember';

let utils;

if ('ember-metal/streams/utils' in Ember.__loader.registry) {
  utils = Ember.__loader.require('ember-metal/streams/utils');
} else {
  utils = Ember.__loader.require('ember-htmlbars/streams/utils');
}

export default utils.isStream;