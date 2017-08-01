var lb_usercode = $('#lb-usercode');
var lb_code = document.getElementById('lb-code');
var browser = false;
var minified = false;
var lb_usrtxt;
var lb_txt;
if (typeof (Worker) !== 'undefined') {
  if (typeof (worker) === 'undefined') {
    var worker = new Worker('assets/js/worker.js');
  }
  worker.addEventListener('message', e => {
    var data = e.data;
    switch (data.cmd) {
      case 'lebab':
        $('#lb-ver').prop('src', `https://img.shields.io/badge/lebab-${data.semver}-brightgreen.svg`);
        start();
        break;
      case 'defaultCode':
        initiate(data.code);
        transform();
        break;
      case 'transformed':
        lb_txt.setValue(data.code);
        break;
    }
  }, false);
} else {
  var sc = document.createElement('script');
  sc.src = 'assets/js/main-fallback.js';
  document.body.appendChild(sc);
}
function prepare() {
  worker.postMessage({'cmd': 'prepare', 'msg': ''});
}
function start() {
  worker.postMessage({'cmd': 'start', 'msg': ''});
}
function getOpts() {
  var opts = [];
  $('.lb-optionsbox input:checked').each((i, v) => {
    opts.push($(v).siblings('.custom-control-description').text());
  });
  return opts;
}
function transform(str) {
  var lb_toTransform = str || lb_usrtxt.getValue();
  var opts = getOpts();
  worker.postMessage({'cmd': 'transform', 'msg': {'code': lb_toTransform, 'opts': opts, browser, minified}});
}
function initiate(c) {
  lb_usercode.val(c.trim());
  lb_usrtxt = CodeMirror.fromTextArea(lb_usercode.get(0), {
    lineNumbers: true,
    theme: 'panda-syntax',
    lineWrapping: true,
    mode: 'javascript',
    showCursorWhenSelecting: true

  });
  lb_txt = CodeMirror.fromTextArea(lb_code, {
    lineNumbers: true,
    theme: 'panda-syntax',
    lineWrapping: true,
    mode: 'javascript',
    readOnly: true
  });
  $('.lb-optionsbox').on('click', e => {
    var $target = $(e.currentTarget);
    $(e.target).blur();
    var inp = $target.find('input');
    inp.prop('checked', !inp.prop('checked'));
    transform();
    return false;
  });
  $('.cm-topminify').show();
  $('.cm-topminify-es2015').show();
  $('.lb-checkbox-es2015').on('click', function() {
    $(this).toggleClass('checked');
    if ($(this).hasClass('checked')) {
      browser = true;
    } else {
      browser = false;
    }
    transform();
  });
  $('.lb-checkbox').on('click', function() {
    $(this).toggleClass('checked');
    if ($(this).hasClass('checked')) {
      minified = true;
    } else {
      minified = false;
    }
    transform();
  });
  lb_usrtxt.on('change', object => {
    transform(object.doc.getValue());
  });
}
prepare();
