<template>
  <div v-html="$md.render(model)" />
</template>
<script>
export default {
  data(){
    return {
      model: ''
    };
  },
  created(){
    fetch('https://cdn.staticaly.com/gh/lebab/lebab/master/README.md')
      .then(r => r.text())
      .then((res) => {
        res = res.replace(/http:/g, 'https:');
        this.model = res;
      });
  }
};
</script>
