import Vue from 'vue'

export default ({ app }, inject) => {
    inject('constants', Vue.observable({ apiPath: 'http://localhost:5000' }))
}
