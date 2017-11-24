($ => {
  const o = {
    lb_usercode: $('#lb-usercode'),
    lb_code: $('#lb-code').get(0),
    browser: false,
    minified: false,
    lb_usrtxt: null,
    lb_txt: null,
    worker: null
  };
  const f = {
    fallback() {
      const sc = document.createElement('script');
      sc.src = 'assets/js/main-fallback.js';
      document.body.appendChild(sc);
    },
    prepare() {
      o.worker.postMessage({ cmd: 'prepare', msg: '' });
    },
    start() {
      o.worker.postMessage({ cmd: 'start', msg: '' });
    },
    getOpts() {
      const opts = [];
      $('.lb-optionsbox input:checked').each((i, v) => {
        opts.push($(v).siblings('.custom-control-description').text());
      });
      return opts;
    },
    transform(str) {
      const lb_toTransform = str || o.lb_usrtxt.getValue();
      const opts = this.getOpts();
      o.worker.postMessage({
        cmd: 'transform',
        msg: { code: lb_toTransform, opts: opts, browser: o.browser, minified: o.minified }
      });
    },
    workerStart() {
      o.worker.addEventListener(
        'message',
        e => {
          const data = e.data;
          switch (data.cmd) {
            case 'lebab':
              $('#lb-ver').prop('src', `https://img.shields.io/badge/lebab-${data.semver}-brightgreen.svg`);
              this.start();
              break;
            case 'defaultCode':
              this.initiate(data.code);
              this.transform();
              break;
            case 'transformed':
              o.lb_txt.setValue(data.code);
              break;
          }
        },
        false
      );
    },
    initiate(c) {
      const that = this;
      $('#loader').hide();
      o.lb_usercode.val(c.trim());
      o.lb_usrtxt = CodeMirror.fromTextArea(o.lb_usercode.get(0), {
        lineNumbers: true,
        theme: 'panda-syntax',
        lineWrapping: true,
        mode: 'javascript',
        showCursorWhenSelecting: true
      });
      o.lb_txt = CodeMirror.fromTextArea(o.lb_code, {
        lineNumbers: true,
        theme: 'panda-syntax',
        lineWrapping: true,
        mode: 'javascript',
        readOnly: true
      });
      $('.lb-optionsbox').on('click', ({ currentTarget, target }) => {
        const $target = $(currentTarget);
        $(target).blur();
        const inp = $target.find('input');
        inp.prop('checked', !inp.prop('checked'));
        that.transform();
        return false;
      });
      $('.cm-topminify').show();
      $('.cm-topminify-es2015').show();
      $('.lb-checkbox-es2015').on('click', function() {
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')) {
          o.browser = true;
        } else {
          o.browser = false;
        }
        that.transform();
      });
      $('.lb-checkbox').on('click', function() {
        $(this).toggleClass('checked');
        if ($(this).hasClass('checked')) {
          o.minified = true;
        } else {
          o.minified = false;
        }
        that.transform();
      });
      o.lb_usrtxt.on('change', ({ doc }) => {
        that.transform(doc.getValue());
      });
    }
  };

  if (typeof Worker !== 'undefined') {
    o.worker = new Worker('assets/js/worker.js');
    f.workerStart();
    f.prepare();
  } else {
    f.fallback();
  }
})(jQuery);
