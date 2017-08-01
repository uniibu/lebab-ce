importScripts('https://unpkg.com/babel-standalone@6.25.0/babel.min.js', 'https://unpkg.com/babili-standalone@0.0.10/babili.min.js');
self.addEventListener('message', e => {
  const data = e.data;
  switch (data.cmd) {
    case 'prepare':
      loadLebab(ver => {
        self.postMessage({cmd: 'lebab', semver: ver});
      });
      break;
    case 'start':
      var code = defaultCode();
      self.postMessage({cmd: 'defaultCode', code});
      break;
    case 'transform':
      var code = transform(data.msg.code, data.msg.opts, data.msg.browser, data.msg.minified);
      self.postMessage({cmd: 'transformed', code});
      break;
  }
}, false);

function transform(code, opts, browser, min) {
  try {
    var code = lebab.transform(code, opts);
    code = lebab.transform(code.code, opts);
    if (browser) {
      code.code = transpile(code.code);
    }
    if (min) {
      code.code = minify(code.code);
    }
    return code.code;
  } catch (err) {
    console.log('[Debug]', err);
  }
}
function transpile(inp) {
  return Babel.transform(inp, { presets: ['es2015'] }).code;
}
function minify(inp) {
  return Babili.transform(inp).code;
}
function loadLebab(cb) {
  const myReq = new Request('https://umdfied.herokuapp.com/umdfied/lebab/latest');
  fetch(myReq)
    .then(response => {
      const rsp = response.json();
      rsp.then(({success, message}) => {
        if (success === true) {
          cb(message.semver);
          importScripts(message.url);
        }
      });
    });
}
function defaultCode() {
  const defaultCode = `
'use strict';
var _ = require('lodash');

function Person(cfg) {
  this.names = [cfg.fname, cfg.lname];
}
Person.prototype.greet = function(title) {
  title = title || "Mr";
  var fullName = this.names
    .map(function(n) {
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
  return defaultCode;
}
