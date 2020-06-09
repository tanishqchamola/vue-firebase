<template>
  <div id="new-user">
    <h3>New User</h3>
    <div class="row">
      <form @submit.prevent="saveEmployee" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="username" required />
            <label>Username</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label>Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="branch" required />
            <label>Branch</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="email" required />
            <label>Email</label>
          </div>
        </div>
        <button type="submit" class="btn">Submit</button>
        <router-link to="/" class="btn grey">Cancel</router-link>
      </form>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "new-user",
  data() {
    return {
      username: null,
      name: null,
      branch: null,
      email: null,
    };
  },
  methods: {
    saveEmployee() {
      db.collection("users")
        .add({
          username: this.username,
          name: this.name,
          branch: this.branch,
          email: this.email,
        })
        .then(() => this.$router.push("/"));
    },
  },
};
</script>
