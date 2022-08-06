<template>
    <div>
        <AdminNavbar />
        <div ref="wrapper"></div>

    </div>
</template>


<script>
import AdminNavbar from "@/components/adminnav.vue";
import Foot from "@/components/foot.vue";
import { Grid } from "gridjs";
import "gridjs/dist/theme/mermaid.css";



export default {
    name: "AdminPage",
    components: {
        AdminNavbar,
        Foot,
    },
    data() {
        return {
            columns: ["No", "bill", "course","pay date", "user", "status"],
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
                url: `${this.$constants.apiPath}/payment`,
                then: data => data
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