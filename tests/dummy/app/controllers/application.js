import Controller from '@ember/controller';
import { A } from '@ember/array';

let falseyValues = {
  undef: undefined,
  nullThing: null,
  empty: A([])
};

export default Controller.extend({
  falseyValues: falseyValues
});
