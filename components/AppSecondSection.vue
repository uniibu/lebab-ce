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
            <div class="cm-topone"/>
            <div class="cm-toptwo"/>
            <div class="cm-topthree"/>
          </div>                  
          <codemirror 
            v-model="defaultCode" 
            :options="cmOption"
            class="a"/>               
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
    data() {
        return {
            defaultCode: this.$store.state.defaultCode,
            cmOption: this.$store.state.codemirrorOpts
        };
    }
};
</script>


