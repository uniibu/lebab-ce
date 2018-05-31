<template>
  <b-jumbotron class="lb-container">
    <b-container fluid class="lb-cointainer-fluid">
        <lebab-editor/>
        <h1>About page with jQuery and Roboto font</h1>
    </b-container>
  </b-jumbotron>
</template>

<script>
import LebabEditor from '~/components/LebabEditor.vue';
export default {
  components: {
    LebabEditor
  },
  head: {
    script: [
      { src: 'https://unpkg.com/babel-standalone@6.25.0/babel.min.js' },
      { src: 'https://unpkg.com/babili-standalone@0.0.10/babili.min.js' }
    ]
  }
};
</script>
