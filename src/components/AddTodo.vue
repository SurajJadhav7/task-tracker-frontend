<template>
  <div>
    <h3>Tasks Tracker</h3>
    <div class="add">
      <form @submit="onSubmit">
        <input
          type="text"
          v-model="title"
          placeholder="What needs to be done?"
        />
        <input type="submit" value="Add" />
      </form>
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
    ...mapActions(["addTodo"]),
    onSubmit(e) {
      e.preventDefault();
      this.addTodo(this.title);
      this.title = "";
    },
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
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
  height: 30px;
}
input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}
</style>