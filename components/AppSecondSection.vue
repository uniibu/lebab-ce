<template>
    <div class="body_section py-5">
        <b-container>
            <b-row>
                <b-col md="6">
                    <h1>Still coding like this?</h1>
                    <p>This code is fine. There's nothing wrong with it. It's clean and understandable. But it's just a little old :/</p>
                </b-col>
                <b-col md="6">
                    <div class="cm-topbar">
                            <div class="cm-topone"></div>
                            <div class="cm-toptwo"></div>
                            <div class="cm-topthree"></div>
                        </div>
                    <no-ssr placeholder="Codemirror Loading...">
                    <codemirror v-model="defaultCode" 
                        :options="cmOption">
                    </codemirror>
                </no-ssr>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<script>
export default {
    data() {
        const defaultCode = `var Employee = function Employee() {
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
        return {
            defaultCode,
            cmOption: {
                tabSize: 4,
                foldGutter: true,
                styleActiveLine: true,
                lineNumbers: true,
                theme: 'panda-syntax',
                lineWrapping: true,
                mode: 'text/javascript',
                showCursorWhenSelecting: true,
                readOnly: true
            }
        };
    }
};
</script>
