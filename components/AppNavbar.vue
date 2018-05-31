<template>
<b-navbar class="navbar-default" toggleable="md" type="light" fixed="top">
  <b-container>
  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand class="logo" href="#"></b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">
    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item to="/dashboard">Try it live</b-nav-item>
      <b-nav-item target="_blank" href="//github.com/uniibu/lebab-ce">Lebab</b-nav-item>
      <b-nav-item target="_blank" href="//github.com/uniibu/lebab-ce/issues">Issues</b-nav-item>
    </b-navbar-nav>
  </b-collapse>
</b-container>
</b-navbar>
</template>
<style>
.navbar {
	border-bottom: 2px solid #323330;
}
.navbar-default {
	background-color: #f5da55;
}

.navbar-default .navbar-nav .nav-link {
	color: #323330;
	font-weight: 700;
}

.logo {
	background: url('~/static/lebab-logo.png') no-repeat center;
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
