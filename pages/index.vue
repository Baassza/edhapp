<template>
    <div class="min-vh-100">
      <Navbar />
      <h1 class="super-text">PASSIVE INCOME</h1>
      <h1 class="super-text">COURSE</h1>
      <br />
      <div class="container">
        <div class="row" v-for="i in 10" :key="i">
          <div class="col-sm-4 col-lg-2" v-for="j in 5" :key="j">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      isUser: false,
    };
  },
  fetch() { },
 
};
</script>
<style>
html{
  overflow: scroll;
}
.super-text {
  font-size: 5rem;
  font-weight: bold;
  color: #919191;
  margin-left: 5rem;
}
.container{
  margin-top: 2rem;
  margin-bottom: 2rem;
  min-width: 95vw;

}
.row{
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.col-sm-4 , .col-lg-2{
  margin:0.5rem,0.5rem,2rem,0.5rem;
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
