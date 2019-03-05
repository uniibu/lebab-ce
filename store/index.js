const defaultCode = `'use strict';
var _ = require('lodash');

function Person(cfg) {
  this.names = [cfg.fname, cfg.lname];
}
Person.prototype.greet = function(title) {
  title = title || "Mr";
  var fullName = this.names
    .map(function(n) {
      n = n || ''
      return _.upperFirst(n);
    })
    .join(" ");

  console.log("Hello " + title + " " + fullName + "!");
};
Person.prototype.greetWithAllTitles = function() {
  for (var i = 0; i < arguments.length; i++) {
    var title = arguments[i];
    this.greet(title);
  }
};

module.exports = Person;`;
export const strict = false;
export const state = () => ({
  codemirrorOpts: {
    tabSize: 4,
    foldGutter: true,
    lineNumbers: true,
    theme: 'panda-syntax',
    lineWrapping: true,
    mode: 'text/javascript',
    matchBrackets: false,
    readOnly: true,
    keyMap: 'default'
  },
  defaultCode,
  lebabDefaultOpts: [
    'arrow',
    'arrow-return',
    'for-of',
    'for-each',
    'arg-rest',
    'obj-method',
    'obj-shorthand',
    'no-strict',
    'exponent',
    'multi-var',
    'let',
    'class',
    'commonjs',
    'template',
    'default-param',
    'destruct-param',
    'includes'
  ]
})
