<template>
  <div>
    <AdminNavbar />
    <button @click="popup()" class="btn btn-success m-3">add media</button>
    <div ref="wrapper"></div>

  </div>
</template>

<script>
import AdminNavbar from "@/components/adminnav.vue";
import Foot from "@/components/foot.vue";
import { Grid, h } from "gridjs";
import "gridjs/dist/theme/mermaid.css";
import Swal from "sweetalert2";
export default {
  components: {
    AdminNavbar,
    Foot,
  },
  mounted() {
    new Grid({
      columns: ["No", "courseName", "courseSRC", {
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
        url: `${this.$constants.apiPath}/course/${this.$route.params.id}`,
        then: (data) => data
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
    console.log(this.rows);
  },
  methods: {
    edit(i) {
      this.popup('Edit', i);
    },
    delete(i) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          this.rows.courseName = this.rows.courseName.filter((e, index) => i !== index)
          this.rows.courseSRC = this.rows.courseSRC.filter((e, index) => i !== index)
          this.$axios.patch(`${this.$constants.apiPath}/course/${this.$route.params.id}/media`, {
            headers: { "Content-Type": "application/json" },
            body: this.rows,
            params: {
              id: this.$route.params.id
            }
          }).then(res => {
            Swal.fire({
              title: 'Success',
              text: `Successfully Deleted`,
              icon: 'success',
              timer: 3000
            }).then(() => {
              window.location.reload()
            })
          })
        }
      })
    },
    popup(action = 'Add', i = null) {
      Swal.fire({
        title: `${action} Form`,
        html: `courseName <input type="text" id="courseName" class="swal2-input" placeholder="courseName" value='${action === "Edit" ? this.rows.courseName[i] : ''}'>
               courseSRC <input type="text" id="courseSRC" class="swal2-input" placeholder="courseSRC" value='${action === "Edit" ? this.rows.courseSRC[i] : ''}'>`,
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
  async fetch() {
    const { data } = await this.$axios.get(`${this.$constants.apiPath}/course/${this.$route.params.id}`);
    let courseName = []
    let courseSRC = []
    data.forEach(e => {
      courseName.push(e[1])
      courseSRC.push(e[2])
    })
    this.rows = {
      courseName,
      courseSRC
    }
  },

  data() {
    return {
      rows: {}
    }
  }

}
</script>

<style>
</style>