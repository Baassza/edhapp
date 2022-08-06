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
    name: "AdminPage",
    components: {
        AdminNavbar,
        Foot,
    },
    data() {
        return {
            columns: ["No", "image", "name", "price", "description", "courseMedie", "trainerName", "status"],
        }
    },
    methods: {

    },
    fetch() {

    },
    mounted() {
        new Grid({
            columns: this.columns,
            server: {
                url: `${this.$constants.apiPath}/course`,
                then: data => data.map(item => {
                    item[1] = html(`<img src='${item[1]}' width=200/>`)
                    item[5] = html(`<a href="course/media/${item[5]}">detail</a>`)
                    return item;
                })
            },
            sort: true,
            search: {
                enabled: true
            },
            pagination: {
                enabled: true,
                limit: 10,
                summary: false,
                buttonsCount: false
            },
        }).render(this.$refs.wrapper);
    }
}

</script>

<style>
</style>