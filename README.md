# ember-let

[![npm version](https://badge.fury.io/js/ember-let.svg)](https://badge.fury.io/js/ember-let)
[![Ember Observer Score](https://emberobserver.com/badges/ember-let.svg)](https://emberobserver.com/addons/ember-let)
[![Build Status](https://travis-ci.org/thefrontside/ember-let.svg?branch=master)](https://travis-ci.org/thefrontside/ember-let)


`ember-let` is an addon for binding variables to template contexts in Ember. It behaves much like the `with` helper, but lets you bind an arbitrary number of variables, including standalone values, hashes, and class instances. However, unlike `with`, the `let` helper will yield its block even if the bound values are `undefined`, `null`, or `[]`. This has the benefit of allowing the user to treat the block values as true variable bindings rather than simply aliases to existing values.

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
{{#let (hash first="first" second="second") "third" as |hash standalone|}}
  <li>{{hash.first}}</li>
  <li>{{hash.second}}</li>
  <li>{{standalone}}</li>
{{/let}}
```

**Bind a class instance returned from a helper**
```hbs
{{#let (boolean) as |bool|}}
  {{bool.value}} - <button onClick={{action bool.toggle}}>toggle</button>
{{/let}}
```

**Inline use**
Note: requires Ember 2.0+ (ie. does not support 1.13)

```hbs
{{let greeting (concat "hello " to)}}
{{greeting}} - <button {{action (action (mut to) "world")}}>Greet the world!</button>  
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

## Code of Conduct
Please note that this project is released with a Contributor Code of
Conduct. By participating in this project you agree to abide by its
terms, which can be found in the `CODE_OF_CONDUCT.md` file in this
repository.
