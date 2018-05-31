<template>
    <b-row>
        <b-col md="6">
            <div class="cm-topbar">
                <div class="cm-topone"></div>
                <div class="cm-toptwo"></div>
                <div class="cm-topthree"></div>
            </div>
            <no-ssr placeholder="Codemirror Loading...">
                <codemirror v-model="code"
                      :options="cmOption"
                      @cursorActivity="onCmCursorActivity"
                      @ready="onCmReady"
                      @focus="onCmFocus"
                      @blur="onCmBlur"
                      @input="onCmChange">
                </codemirror>
            </no-ssr>
        </b-col>
        <b-col md="6">
            <div class="cm-topbar">
                <div class="cm-topone"></div>
                <div class="cm-toptwo"></div>
                <div class="cm-topthree"></div>
            </div>
            <no-ssr placeholder="Codemirror Loading...">
             <codemirror v-model="newcode" 
                      :options="cmOption2">
             </codemirror>
             </no-ssr>
        </b-col>
    </b-row>
</template>
<script>
import lebab from 'lebab';
export default {
  data () {
    let code = `var Employee = function Employee() {
  this.alive = true;
};

Employee.prototype.setSkills = function(skills) {
  skills = skills || [];
  var defaultSkills = ['JavaScript'];
  this.skills = skills.concat(defaultSkills);
};

Employee.prototype.sayHello = function() {
  window.setTimeout(function() {
    console.log('Hello World!');
  }, 2000);
};

Object.defineProperty(Employee.prototype, 'name', {
  get: function() {
    return this.firstName + ' ' + this.lastName;
  }
});`;
let newcode = ''
    let lebabOptions = ['let', 'arrow'];
    return {
      code,
      newcode,
      lebabOptions,
      cmOption: {
        tabSize: 4,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        matchBrackets: true,
        mode: 'text/javascript',
        theme: 'panda-syntax',
        extraKeys: {
          F11 (cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },
          Esc (cm) {
            if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);
          }
        }
      },
      cmOption2: {
        tabSize: 4,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        matchBrackets: true,
        mode: 'text/javascript',
        theme: 'panda-syntax',
        readOnly: true,
        extraKeys: {
          F11 (cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },
          Esc (cm) {
            if (cm.getOption('fullScreen')) cm.setOption('fullScreen', false);
          }
        }
      }
    };
  },
  methods: {
    lebabTransform (oldcode) {
      try {
        const { code, warnings } = lebab.transform(oldcode, this.lebabOptions);
        this.newcode = code;
      } catch (err) {
        console.log('SyntaxError', err.message);
      }
    },
    onCmCursorActivity (codemirror) {
      console.log('onCmCursorActivity', codemirror);
    },
    onCmReady (codemirror) {
      console.log('onCmReady', codemirror);
      this.lebabTransform(this.code);
    },
    onCmFocus (codemirror) {
      console.log('onCmFocus', codemirror);
    },
    onCmBlur (codemirror) {
      console.log('onCmBlur', codemirror);
    },
    onCmChange (newCode) {
      console.log('onCmChange');
      this.lebabTransform(newCode);
    }
  }
};

</script>
