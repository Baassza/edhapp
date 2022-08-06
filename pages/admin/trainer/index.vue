<template>
    <div>
        <AdminNavbar />
        <button @click="popup()" class="btn btn-success m-3">add trainer</button>
        <div ref="wrapper"></div>

    </div>
</template>


<script>
import AdminNavbar from "@/components/adminnav.vue";
import Foot from "@/components/foot.vue";
import { Grid,h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Swal from "sweetalert2";



export default {
    name: "AdminPage",
    components: {
        AdminNavbar,
        Foot,
    },
    data() {
        return {

        }
    },
    methods: {
        edit(i){},
        delete(i){},
        popup(action = 'Add', i = null) {
      Swal.fire({
        title: `${action} Form`,
        html: `courseName <input type="text" id="courseName" class="swal2-input" placeholder="courseName" value='${action === "Edit" ? this.name[i] : ''}'>
               courseSRC <textarea type="text" id="courseSRC" class="swal2-input" placeholder="courseSRC" >${action === "Edit" ? this.history[i] : ''}</textarea>`,
        confirmButtonText: `${action}`,
        focusConfirm: false,
        preConfirm: () => {
          const courseName = Swal.getPopup().querySelector('#courseName').value
          const courseSRC = Swal.getPopup().querySelector('#courseSRC').value
          if (!courseName || !courseSRC) {
            Swal.showValidationMessage(`Please enter courseName and courseSRC`)
          }
          return {
            courseName,
            courseSRC
          }
        }
      }).then(e => {
        try {
          if (action === 'Edit') {
            this.rows.courseName[i] = e.value.courseName;
            this.rows.courseSRC[i] = e.value.courseSRC;
          } else if (action === 'Add') {
            this.rows.courseName.push(e.value.courseName);
            this.rows.courseSRC.push(e.value.courseSRC);
          }
          this.$axios.patch(`${this.$constants.apiPath}/course/${this.$route.params.id}/media`, {
            headers: { "Content-Type": "application/json" },
            body: this.rows,
            params: {
              id: this.$route.params.id
            }
          }).then(res => {
            Swal.fire({
              title: 'Success',
              text: `Successfully ${action}ed`,
              icon: 'success',
              timer: 3000
            }).then(() => {
              window.location.reload()
            })
          })
        } catch (error) {
          return
        }
      })

    }
    },
    fetch() {

    },
    mounted() {
        new Grid({
            columns: ["No","image", "trainerName", "history", {
                name: 'Actions',
                formatter: (cell, row) => {
                    return [
                        h('button', {
                            className: 'text-white btn btn-warning ',
                            onClick: () => this.edit((row.cells[0].data) - 1)
                        }, 'Edit'),
                        h('button', {
                            className: 'text-white btn btn-danger ml-2 ',
                            onClick: () => this.delete((row.cells[0].data) - 1)
                        }, 'Delete')
                    ]
                }
            }],
            server: {
                url: `${this.$constants.apiPath}/trainer`,
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