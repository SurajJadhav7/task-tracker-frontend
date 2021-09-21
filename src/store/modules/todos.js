import axios from 'axios';

const state = {
    todos: []
}

const getters = {
    allTodos: state => state.todos,
}

const actions = {
    async fetchTodos({ commit }) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
        commit('setTodos', response.data);
    },
    async addTodo({ commit }, title) {
        const response = await axios.post('https://jsonplaceholder.typicode.com/todos', {
            title,
            completed: false
        });
        commit('newTodo', response.data);
    },
    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
        commit('removeTodo', id);
    },
    async filterTodos({ commit }, filter) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${filter}`)
        commit('setFilterTodos', response.data);
    },
    async toggleTodo({ commit }, todo) {
        const updatedTodo = {
            userId: todo.userId,
            id: todo.id,
            title: todo.title,
            completed: !todo.completed
        }
        await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, updatedTodo);
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
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}