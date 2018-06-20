<template>
  <b-row>
    <b-col md="6">
      <div class="cm-topbar">
        <div class="cm-topone"></div>
        <div class="cm-toptwo"></div>
        <div class="cm-topthree"></div>
        <div class="cm-topminify">
          <b-form-checkbox id="checkboxminify" v-model="minified" @input="onMinify">
            Minify(babili)
          </b-form-checkbox>
        </div>
        <div class="cm-topminify-es2015">
          <b-form-checkbox id="checkboxtranspile" v-model="transpiled" @input="onTranspile">
            Transpile(babel)
          </b-form-checkbox>
        </div>
        <div class="dropdown lb-drop">
          <a href="https://github.com/lebab/lebab" target="_blank">
            <b-img :src="lebabSemver" />
          </a>
          <b-dropdown id="ddown-buttons" size="sm" class="mx-1 my-1" text="Options" right>
            <b-dropdown-header>Safe Transforms</b-dropdown-header>
            <b-form-group class="lb-optionsbox">
              <b-form-checkbox-group id="safeCheckbox" class="lb-optionsbox" stacked name="Optionssafe" v-model="lebabOptions" :options="OptionsSafe" @input="onOptChange">
              </b-form-checkbox-group>
            </b-form-group>
            <b-dropdown-header>Unsafe Transforms</b-dropdown-header>
            <b-form-group class="lb-optionsbox">
              <b-form-checkbox-group id="unsafeCheckbox" class="lb-optionsbox" stacked name="Optionsunsafe" v-model="lebabOptions" :options="OptionsUnsafe" @input="onOptChange">
              </b-form-checkbox-group>
            </b-form-group>
          </b-dropdown>
        </div>
      </div>
        <codemirror class="mb-4" v-model="code" :options="cmOption" @cursorActivity="onCmCursorActivity" @ready="onCmReady" @input="onCmChange">
        </codemirror>
    </b-col>
    <b-col md="6">
      <div class="cm-topbar">
        <div class="cm-topone"></div>
        <div class="cm-toptwo"></div>
        <div class="cm-topthree"></div>
      </div>
     
        <codemirror class="mb-4" v-model="newcode" :options="cmOption2">
        </codemirror>
     
    </b-col>
  </b-row>
</template>
<script>
export default {
  data() {
    let code = `'use strict';
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
    let newcode = '';
    return {
      lebabSemver: `https://img.shields.io/badge/lebab-${process.env.lebab}-brightgreen.svg`,
      code,
      newcode,
      minified: false,
      transpiled: false,
      lebabOptions: [
        'arrow',
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
      ],
      OptionsSafe: [
        {
          text: 'arrow',
          value: 'arrow'
        },
        {
          text: 'for-of',
          value: 'for-of'
        },
        {
          text: 'for-each',
          value: 'for-each'
        },
        {
          text: 'arg-rest',
          value: 'arg-rest'
        },
        {
          text: 'obj-method',
          value: 'obj-method'
        },
        {
          text: 'obj-shorthand',
          value: 'obj-shorthand'
        },
        {
          text: 'no-strict',
          value: 'no-strict'
        },
        {
          text: 'exponent',
          value: 'exponent'
        },
        {
          text: 'multi-var',
          value: 'multi-var'
        }
      ],
      OptionsUnsafe: [
        {
          text: 'let',
          value: 'let'
        },
        {
          text: 'class',
          value: 'class'
        },
        {
          text: 'commonjs',
          value: 'commonjs'
        },
        {
          text: 'template',
          value: 'template'
        },
        {
          text: 'default-param',
          value: 'default-param'
        },
        {
          text: 'destruct-param',
          value: 'destruct-param'
        },
        {
          text: 'includes',
          value: 'includes'
        }
      ],
      cmOption: {
        tabSize: 4,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        styleSelectedText: true,
        lineWrapping: true,
        mode: 'text/javascript',
        keyMap: 'sublime',
        matchBrackets: true,
        showCursorWhenSelecting: true,
        theme: 'panda-syntax',
        extraKeys: {
          Ctrl: 'autocomplete'
        },
        hintOptions: {
          completeSingle: false
        }
      },
      cmOption2: {
        tabSize: 4,
        lineNumbers: true,
        line: true,
        foldGutter: true,
        lineWrapping: true,
        matchBrackets: true,
        mode: 'text/javascript',
        theme: 'panda-syntax',
        readOnly: true
      }
    };
  },
  methods: {
    lebabTransform(oldcode) {
      try {
        const { code, warnings } = this.$lebab.transform(oldcode, this.lebabOptions);
        this.newcode = code;
      } catch (err) {
        console.log('SyntaxError', err.message);
      }
    },
    onCmReady(codemirror) {
      console.log(this.$Babel)
      this.lebabTransform(this.code);
    },
    onCmCursorActivity() {
      return this.code;
    },
    onCmChange(code) {
      this.lebabTransform(code);
      this.transpileCode(this.newcode);
      this.minifyCode(this.newcode);
    },
    onOptChange() {
      this.onCmChange(this.code);
    },
    minifyCode(code) {
      if (this.minified) {
        this.newcode = Babili.transform(code).code;
        return true;
      }
      return false;
    },
    onMinify(minified) {
      if (!this.minifyCode(this.newcode)) {
        this.lebabTransform(this.code);
      }
      if (this.minifyCode(this.newcode) && this.transpileCode(this.newcode)) {
        this.minifyCode(this.newcode);
      }
      if (!this.minifyCode(this.newcode) && this.transpileCode(this.newcode)) {
        this.lebabTransform(this.code);
        this.transpileCode(this.newcode);
      }
    },
    transpileCode(code) {
      if (this.transpiled) {
        this.newcode = Babel.transform(code, {
          presets: ['es2015']
        }).code;
        return true;
      }
      return false;
    },
    onTranspile(transpiled) {
      if (!this.transpileCode(this.newcode)) {
        this.lebabTransform(this.code);
      }
      if (this.minifyCode(this.newcode) && this.transpileCode(this.newcode)) {
        this.minifyCode(this.newcode);
      }
    },
    createWorker(){
      if (process.browser) {
          for(let i = 0, len = navigator.hardwareConcurrency || 1; i < len; i++) {
          this.Babel.push(this.$Babel.createWorker())
        }
      }
    }
  }
};
</script>
