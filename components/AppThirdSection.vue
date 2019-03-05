<template>
  <div class="body_section py-5">
    <b-container>
      <b-row>
        <b-col md="6">
          <div class="cm-topbar">
            <div class="cm-topone" />
            <div class="cm-toptwo" />
            <div class="cm-topthree" />
          </div>
          <codemirror
            v-model="lebabCode"
            :options="cmOption"
            class="a" />
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
    return {
      lebabCode: '',
      cmOption: this.$store.state.codemirrorOpts
    };
  },
  mounted(){
    var { code } = window.lebab.transform(this.$store.state.defaultCode, this.$store.state.lebabDefaultOpts);
    this.lebabCode = code;
  }
};
</script>
