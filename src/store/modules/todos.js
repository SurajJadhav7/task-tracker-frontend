import axios from 'axios';

const state = {
    todos: [],
    filter: 200,
    query: ""
}

const getters = {
    allTodos: state => state.todos,
}

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('http://localhost:3000/api/v1/todos');
        commit('setTodos', response.data);
    },
    async searchTodos({ commit }, query) {
        console.log(query);
        commit('setQuery', query);
        const response = await axios.get(`http://localhost:3000/api/v1/todos?q=${query}&_limit=${state.filter}`);
        commit('setTodos', response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post('http://localhost:3000/api/v1/todos', {
            title,
            completed: false
        });
        commit('newTodo', response.data);
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`http://localhost:3000/api/v1/todos/${id}`);
        commit('removeTodo', id);
    },
    async filterTodos({ commit }, filter) {
        commit('setFilter', filter);
        const response = await axios.get(`http://localhost:3000/api/v1/todos?q=${state.query}&_limit=${filter}`)
        commit('setFilterTodos', response.data);
    },
    async toggleTodo({ commit }, todo) {
        const updatedTodo = {
            userId: todo.userId,
            id: todo.id,
            title: todo.title,
            completed: !todo.completed
        }
        await axios.put(`http://localhost:3000/api/v1/todos/${todo.id}`, updatedTodo);
        commit('updateTodo', updatedTodo);
    },
}

const mutations = {
    setTodos(state, todos) {
        state.todos = todos;
    },
    newTodo(state, todo) {
        state.todos.unshift(todo);
    },
    removeTodo(state, id) {
        state.todos = state.todos.filter(t => t.id !== id);
    },
    setFilterTodos(state, todos) {
        state.todos = todos;
    },
    updateTodo(state, todo) {
        const index = state.todos.findIndex(t => t.id == todo.id);
        state.todos.splice(index, 1, todo);
    },
    setFilter(state, filter) {
        state.filter = filter;
    },
    setQuery(state, query) {
        state.query = query;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}