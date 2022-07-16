<template>
  <div class="min-vh-100">
    <Navbar />
    <h1 class="super-text">PASSIVE INCOME</h1>
    <h1 class="super-text">COURSE</h1>
    <br />
    <b-container>
      <b-row cols="1" cols-sm="2" cols-md="4" cols-lg="6">
        <b-col>1 of 6</b-col>
        <b-col>2 of 6</b-col>
        <b-col>3 of 6</b-col>
        <b-col>4 of 6</b-col>
        <b-col>5 of 6</b-col>
        <b-col>6 of 6</b-col>
      </b-row>
    </b-container>
    <Foot />
  </div>
</template>

<script>
import Navbar from "@/components/nav.vue";
import Foot from "@/components/foot.vue";


export default {
  components: {
    Navbar,
    Foot,
  },
  name: "IndexPage",
  data() {
    return {

    };
  },
  fetch() { },
};
</script>
<style>
.super-text {
  font-size: 5rem;
  font-weight: bold;
  color: #919191;
  margin-left: 5rem;
}

@media (max-width: 341.98px) {
  .super-text {
    font-size: 1.5rem;
    margin-left: 3rem;
  }
}

@media (max-width: 575.98px) {
  .super-text {
    font-size: 2rem;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .super-text {
    font-size: 3rem;
  }
}
</style>
