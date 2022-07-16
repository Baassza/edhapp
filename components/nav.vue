<template>
  <nav class="navbar navbar-expand navbar-light bg-white" style="height: 90px">
    <div class="container-fluid">
      <h3 class="navbar-brand">Edhapp</h3>
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Course</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Content</a>
        </li>
      </ul>
      <ul class="d-flex navbar-nav mb-2 mb-lg-0">
        <li class="nav-item">
          <button class="nav-link active button-link" @click="logout">Log out</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  name: "Navbar",
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          this.$swal("Error", error, "error");
        });
    },
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
