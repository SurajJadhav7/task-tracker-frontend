<template>
  <div>
    <!-- <h3>Search Todos</h3> -->
    <div class="add">
      <input
        type="text"
        v-model="title"
        placeholder="Search Todo"
        @input="searchTodos($event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddTodo",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    ...mapActions(["searchTodos"]),
  },
};
</script>

<style scoped>
h3 {
  text-align: center;
}
form {
  display: flex;
}
input {
  flex: 1;
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
  margin-top: 2rem;
}
</style>