/* global require */
(function() {

  /** start of babel output */
  var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
  /** end babel output */

  var Ember = require('ember').default;

  if (Ember.__loader.registry['ember-glimmer/syntax']) {
    var registerSyntax = Ember.__loader.require('ember-glimmer').registerSyntax;
    var StatementSyntax = Ember.__loader.require('glimmer-runtime').StatementSyntax;

    var LetSyntax = function (_StatementSyntax) {
      _inherits(LetSyntax, _StatementSyntax);

      _createClass(LetSyntax, null, [{
        key: 'create',
        value: function create(environment, args, templates) {
          return new this(args, templates);
        }
      }]);

      function LetSyntax(args, templates) {
        _classCallCheck(this, LetSyntax);

        var _this = _possibleConstructorReturn(this, (LetSyntax.__proto__ || Object.getPrototypeOf(LetSyntax)).call(this));

        _this.args = args;
        _this.templates = templates;
        return _this;
      }

      _createClass(LetSyntax, [{
        key: 'compile',
        value: function compile(dsl) {
          var args = this.args;
          var templates = this.templates;

          var params = { templates: templates, args: args };
          dsl.block(params, function (dsl) {
            dsl.evaluate('default');
          });
        }
      }]);

      return LetSyntax;
    }(StatementSyntax);

    registerSyntax('let', LetSyntax);
  } else if (Ember.__loader.registry['ember-htmlbars/helpers']) {
    var registerHelper = Ember.__loader.require('ember-htmlbars/helpers').registerHelper;

    registerHelper('let', function letHelper(params, hash, options) {
      var isBlock = !!options.template.yield;
      // when used as a block
      if (isBlock) {
        options.template.yield(params);
      }
    });
  }

})();

