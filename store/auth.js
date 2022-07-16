const state = () => ({
    user: null
});

const mutations = {
    login(state, User) {
        state.user = User;
    },
    logout(state) {
        state.user = null;
    }
};

const actions = {}

const getters = {
    isLoggedIn: state => state,
    isAdmin: state => state.user && state.user.isAdmin
}

export default { state, mutations, actions, getters };










