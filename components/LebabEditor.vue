<template>
  <b-row>
    <b-col md="6">
      <div class="cm-topbar">
        <div class="cm-topone"/>
        <div class="cm-toptwo"/>
        <div class="cm-topthree"/>
        <div class="cm-topminify">
          <b-form-checkbox 
            id="checkboxminify" 
            v-model="minified"
            @input="toNewCode">
            Minify(babili)
          </b-form-checkbox>
        </div>
        <div class="cm-topminify-es2015">
          <b-form-checkbox 
            id="checkboxtranspile" 
            v-model="transpiled" 
            @input="toNewCode">
            Transpile(babel)
          </b-form-checkbox>
        </div>
        <div class="dropdown lb-drop">
          <a 
            href="https://github.com/lebab/lebab" 
            target="_blank">
            <b-img :src="lebabSemver" />
          </a>
          <b-dropdown 
            id="ddown-buttons" 
            size="sm" 
            class="mx-1 my-1" 
            text="Options" 
            right>
            <b-dropdown-header>Safe Transforms</b-dropdown-header>
            <b-form-group class="lb-optionsbox">
              <b-form-checkbox-group 
                id="safeCheckbox" 
                v-model="lebabOptions" 
                :options="OptionsSafe" 
                class="lb-optionsbox" 
                stacked 
                name="Optionssafe" 
                @input="toNewCode"/>
            </b-form-group>
            <b-dropdown-header>Unsafe Transforms</b-dropdown-header>
            <b-form-group class="lb-optionsbox">
              <b-form-checkbox-group 
                id="unsafeCheckbox" 
                v-model="lebabOptions" 
                :options="OptionsUnsafe" 
                class="lb-optionsbox" 
                stacked 
                name="Optionsunsafe" 
                @input="toNewCode"/>
            </b-form-group>
          </b-dropdown>
        </div>
      </div>
      <codemirror 
        v-model="code" 
        :options="cmOption" 
        class="mb-4"
        @ready="toNewCode" 
        @input="toNewCode"/>
    </b-col>
    <b-col md="6">
      <div class="cm-topbar">
        <div class="cm-topone"/>
        <div class="cm-toptwo"/>
        <div class="cm-topthree"/>
      </div>
     
      <codemirror 
        v-model="newcode" 
        :options="cmOption2" 
        class="mb-4"/>
     
    </b-col>
  </b-row>
</template>
<script>
export default {
  data() {
    let code = this.$store.state.defaultCode;
    let newcode = '';
    return {
      lebabSemver: `https://img.shields.io/badge/lebab-${process.env.lebab}-brightgreen.svg`,
      code,
      newcode,
      minified: false,
      transpiled: false,
      lebabOptions: this.$store.state.lebabDefaultOpts,
      OptionsSafe: this.generateOptions([
        'arrow', 'arrow-return', 'for-of', 'for-each', 'arg-rest', 'obj-method', 'obj-shorthand', 'no-strict', 'exponent', 'multi-var'
      ]),    
      OptionsUnsafe: this.generateOptions([
        'let', 'class', 'commonjs', 'template', 'default-param', 'destruct-param', 'includes'
      ]),
      cmOption: this.generateCmOptions({ keyMap: 'sublime', matchBrackets: true, readOnly: false }),
      cmOption2: this.generateCmOptions({ matchBrackets: true })
    };
  },
  methods: {
    generateCmOptions(opts){
      const cmOpts = this.$store.state.codemirrorOpts;
      for(const [ key, value ] of Object.entries(opts)){
        cmOpts[key] = value;
      }
      return cmOpts;
    },
    generateOptions(opts){
      return opts.map(o => ({ text: o, value: o }));
    },
    transpileCode(code) {
      if (this.transpiled || this.minified) {
        return window.babelStandalone.transform(code, {
          presets: this.transpiled ? [ 'es2015' ]: null,
          minified: this.minified
        }).code;
      }      
    },
    lebabTransform(oldcode) {
      try {
        let { code } = window.lebab.transform(oldcode, this.lebabOptions);
        return this.transpileCode(code) || code;
      } catch (err) {
        console.log('SyntaxError', err.message);
        return this.newcode;
      }
    },
    toNewCode(){
      this.newcode = this.lebabTransform(this.code);
    }
  }
};
</script>
