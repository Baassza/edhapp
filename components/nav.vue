<template>
  <nav class="navbar navbar-expand navbar-light bg-white" style="height: 90px">
    <div class="container-fluid">
      <h3 class="navbar-brand">Edhapp</h3>
      <ul class="navbar-nav">
        <li class="nav-item">
          <nuxt-link class="nav-link" aria-current="page" to="/">Course</nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link class="nav-link" to="#">Content</nuxt-link>
        </li>
      </ul>
      <ul class="d-flex navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <button class="nav-link active button-link" >Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  name: "Navbar",
  methods: {
   
  },
};
</script>

<style>
.button-link {
  background: transparent;
  text-decoration: none;
  border: none;
}
</style>
