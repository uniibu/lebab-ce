importScripts('https://unpkg.com/babel-standalone@6.25.0/babel.min.js', 'https://unpkg.com/babili-standalone@0.0.10/babili.min.js');
self.addEventListener('message', e => {
  var data = e.data;
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
  var code = lebab.transform(code, opts);
  code = lebab.transform(code.code, opts);
  if (browser) {
    code.code = transpile(code.code);
  }
  if (min) {
    code.code = minify(code.code);
  }
  return code.code;
}
function transpile(inp) {
  return Babel.transform(inp, { presets: ['es2015'] }).code;
}
function minify(inp) {
  return Babili.transform(inp).code;
}
function loadLebab(cb) {
  var myReq = new Request('https://umdfied.herokuapp.com/umdfied/lebab/latest');
  fetch(myReq)
    .then(response => {
      var rsp = response.json();
      rsp.then(data => {
        if (data.success === true) {
          cb(data.message.semver);
          importScripts(data.message.url);
        }
      });
    });
}
function defaultCode() {
  var defaultCode = `
'use strict';

// Let/const
var name = 'Bob', time = 'yesterday';
time = 'today';

// Template string
console.log('Hello ' + name + ', how are you ' + time + '?');

var bob = {
  // Object shorthand
  name: name,
  // Object method
  sayMyName: function () {
    console.log(this.name);
  }
};

// Classes
var SkinnedMesh = function SkinnedMesh() {
};

SkinnedMesh.prototype.update = function (camera) {
  camera = camera || createCamera();
  this.camera = camera;
};

Object.defineProperty(SkinnedMesh.prototype, 'name', {
  set: function (geometry) {
    this.geometry = geometry;
  },
  get: function () {
    return this.geometry;
  }
});

// Commonjs
var lebab = require('lebab');
module.exports = SkinnedMesh;

// Arrow functions
var render = function () {
  // ...
  requestAnimationFrame(render);
};

// Arrow async functions
var renderAsync = async function () {
  // ...
  await requestAnimationFrame(render);
};
    `;
  return defaultCode;
}
