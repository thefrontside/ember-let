/*
  Transforms inline {{let}} declarations to their equivalent block form.
  For example,

  ```hbs
  {{let "activeMembers" (filter-by members 'active')}}

  <ul>
    {{#each activeMembers as |member|}}
      <li>
        {{let name (format-member-name member)}}
        <div>Name: {{name}}</div>

        {{let address (format-address member.address)}}
        <div>Address: {{address}}</div>
      </li>
    {{/each}}
  <ul>
  ```

  will be transformed to

  ```hbs
  {{#let (filter-by members 'active') as |activeMembers|}}
    <ul>
      {{#each activeMembers as |member|}}
        <li>
          {{#let (format-member-name member) as |name|}}
            <div>Name: {{name}}</div>

            {{#let (format-address member.address) as |address|}}
              <div>Address: {{address}}</div>
            {{/let}}
          {{/let}}
        </li>
      {{/each}}
    <ul>
  {{/let}}
  ```
*/

function InlineLetTransform() {
  this.syntax = null;
}

InlineLetTransform.prototype.transform = function(ast) {
  var b = this.syntax.builders;

  this.syntax.traverse(ast, {
    ElementNode: function(node) {
      blockify(node.children);
    },
    Program: function(node) {
      blockify(node.body);
    }
  });

  function blockify(statements) {
    if (statements) {
      for (var i = 0; i < statements.length; i++) {
        var statement = statements[i];

        if (isInlineLet(statement)) {
          var bindings = extractBindings(statement);
          var trailingStatements = statements.splice(i + 1, statements.length - (i + 1));

          statements[i] = b.block('let', bindings.values, null,
            b.program(trailingStatements, bindings.locals)
          );

          break;
        }
      }
    }
  }

  function isInlineLet(statement) {
    return statement.type === 'MustacheStatement' && statement.path.original === 'let';
  }

  function extractBindings(statement) {
    var bindings = { locals: [], values: [] };

    var params = statement.params;
    if (params) {
      for (var i = 0; i < params.length; i += 2) {
        bindings.locals.push(params[i].original);
        bindings.values.push(params[i+1]);
      }
    }

    return bindings;
  }

  return ast;
};

module.exports = InlineLetTransform;
