<template>
  <div>
    <app-navbar />
    <a href="https://github.com/uniibu/lebab-ce">
      <img
        class="fork-me"
        src="~/assets/images/forkme_right_gray_6d6d6d.png"
        alt="Fork me on GitHub"
        width="149"
        height="149">
    </a>
    <nuxt />
    <app-footer />
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
