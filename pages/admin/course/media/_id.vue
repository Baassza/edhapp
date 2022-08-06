<template>
  <div>
    <AdminNavbar />
    <div ref="wrapper"></div>

  </div>
</template>

<script>
import AdminNavbar from "@/components/adminnav.vue";
import Foot from "@/components/foot.vue";
import { Grid, html } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
export default {
  components: {
    AdminNavbar,
    Foot,
  },
  async fetch() {
    let { data } = await this.$axios.get(`${this.$constants.apiPath}/course/${this.$route.params.id}`)
    this.media = data.list
    console.log(this.media);
  },
  methods: {

  },

  data() {
    return {
      media: null
    }
  }

}
</script>

<style>
</style>