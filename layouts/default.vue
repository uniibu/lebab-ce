<template>
  <div>
    <app-navbar/>
    <nuxt/>
    <app-footer/>
  </div>
</template>
<script>
import AppNavbar from '~/components/AppNavbar.vue';
import AppFooter from '~/components/AppFooter.vue';
export default {
  components: {
    AppNavbar,
    AppFooter
  }
};
</script>