# ember-let (WIP)

`ember-let` is an addon for binding variables to template contexts in Ember. It behaves much the `with` helper, but lets you bind an arbitrary number variables, including standalone values, hashes, and class instances.

See examples below:

**Bind basic values**
```hbs
{{#let "abc" "123" as |first second|}}
  <li>{{first}}</li>
  <li>{{second}}</li>
{{/let}}
```

**Mix hashes and standalone values**
```hbs
<h3>Bind a hash and a standalone value</h3>
<ul class="with-hash">
  {{#let (hash first="first" second="second") "third" as |hash standalone|}}
    <li>{{hash.first}}</li>
    <li>{{hash.second}}</li>
    <li>{{standalone}}</li>
  {{/let}}
</ul>
```

**Bind a class instance returned from a helper**
```hbs
<h3>Bind an object returned from a helper</h3>
<div class="with-helper-object">
  {{#let (boolean) as |bool|}}
      {{bool.value}} - <button onClick={{action bool.toggle}}>toggle</button>
  {{/let}}
</div>
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
