<template>
  <div>
    <app-navbar/>
    <a href="https://github.com/uniibu/lebab-ce">
      <img 
        style="position: absolute; top: 0; right: 0; border: 0;z-index: 9999;" 
        src="https://camo.githubusercontent.com/a6677b08c955af8400f44c6298f40e7d19cc5b2d/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f677261795f3664366436642e706e67"
        alt="Fork me on GitHub" 
        data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png">
    </a>
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
<style lang="inline">
.footer {
  border-top: 1px solid #e8e8e8;
    padding: 30px 0;
    text-align: center;
}
.navbar {
border-bottom: 2px solid #f5da55;
}
.navbar-default {
  background-color:#323330;
}

.navbar-default .navbar-nav .nav-link{
  color: #f5da55 !important;
  font-size: 18px;
  text-transform: uppercase;
}

.logo {
  background: url('~/assets/images/lebab-logogold.png') no-repeat center;
  background-size: auto 46px;
  width: 60px;
  height: 50px;
}

.logo.navbar-brand {
  font: 0/0 a;
  color: transparent;
  text-shadow: none;
  background-color: transparent;
  border: 0;
}

.navbar-brand {
  float: left;
  padding: 15px 15px;
  font-size: 18px;
  line-height: 20px;
  height: 50px;
}

.navbar-brand:focus,
.navbar-brand:hover {
  text-decoration: none;
}

.navbar-brand > img {
  display: block;
}

@media (min-width: 992px) {
  .navbar > .container .navbar-brand,
  .navbar > .container-fluid .navbar-brand {
    margin-left: -15px;
  }
}
</style>