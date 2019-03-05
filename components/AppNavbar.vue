<template>
  <b-navbar
    class="navbar-default"
    toggleable="md"
    type="light"
    fixed="top">
    <b-container>
      <b-navbar-toggle target="nav_collapse"/>

      <b-navbar-brand
        class="logo"
        to="/"/>

      <b-collapse
        id="nav_collapse"
        is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item
            to="/editor">Try It Live</b-nav-item>
          <b-nav-item
            target="_blank"
            href="//github.com/lebab/lebab">Lebab</b-nav-item>
          <b-nav-item
            target="_blank"
            href="//github.com/lebab/lebab/issues">Issues</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
