<template>
    <div class="body_section py-5">
        <b-container>
            <b-row>
                <b-col md="6">
                    <div class="cm-topbar">
                            <div class="cm-topone"></div>
                            <div class="cm-toptwo"></div>
                            <div class="cm-topthree"></div>
                        </div>
                    <no-ssr placeholder="Codemirror Loading...">
                    <codemirror v-model="lebabCode" 
                                :options="cmOption">
                                </codemirror>
                    </no-ssr>
                </b-col>
                <b-col md="6">
                    <h1>Lebab it!</h1>
                    <p>Lebab transpiles your ES5 code to ES6/ES7. It does exactly the opposite of what Babel does.</p>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
  data() {
    const lebabCode = `class Employee {
  constructor() {
    this.alive = true;
  }

  setSkills(skills=[]) {
    const defaultSkills = ['JavaScript'];
    this.skills = skills.concat(defaultSkills);
  }

  sayHello() {
    window.setTimeout(() => {
      console.log('Hello World!');
    }, 2000);
  }

  get name() {
    return \`\${this.firstName} \${this.lastName}\`;
  }
}`;
    return {
      lebabCode,
      cmOption: {
        tabSize: 4,
        foldGutter: true,
        styleActiveLine: true,
        lineNumbers: true,
        theme: 'panda-syntax',
        lineWrapping: true,
        mode: 'javascript',
        showCursorWhenSelecting: true,
        readOnly: true
      }
    };
  }
};
</script>
