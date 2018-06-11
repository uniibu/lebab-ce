<template>
  <div>
    <app-navbar/>
    <no-ssr>
      <app-loading slot="placeholder" />
    </no-ssr>
    <nuxt/>
    <app-footer/>
  </div>
</template>
<script>
import AppNavbar from '~/components/AppNavbar.vue';
import AppFooter from '~/components/AppFooter.vue';
import AppLoading from '~/components/AppLoading.vue'
export default {
  components: {
    AppNavbar,
    AppFooter,
    AppLoading
  }
};
</script>
<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>