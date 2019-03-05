<template>
  <div v-html="$md.render(model)"/>
</template>
<script>
export default {
  data(){
    return {
      model: ''
    };
  },
  created(){
    this.$axios.$get('https://raw.githubusercontent.com/lebab/lebab/master/README.md')
      .then((res) => {
        res = res.replace(/http:/g, 'https:');
        this.model = res;
      });
  }
};
</script>