<template>
  <div id="edit-user">
    <h3>Edit User</h3>
    <div class="row">
      <form @submit.prevent="updateUser" class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input disabled type="text" v-model="username" required />
            <label class="active">Username</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="name" required />
            <label class="active">Name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="branch" required />
            <label class="active">Branch</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input type="text" v-model="email" required />
            <label class="active">Email</label>
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
  name: "edit-user",
  data() {
    return {
      username: null,
      name: null,
      branch: null,
      email: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    db.collection("users")
      .where("username", "==", to.params.username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          next((vm) => {
            (vm.username = doc.data().username),
              (vm.name = doc.data().name),
              (vm.branch = doc.data().branch),
              (vm.email = doc.data().email);
          });
        });
      });
  },
  watch: {
    $route: "fetchData",
  },
  methods: {
    fetchData() {
      db.collection("users")
        .where("username", "==", this.$route.params.username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.username = doc.data().username;
            this.name = doc.data().name;
            this.branch = doc.data().branch;
            this.email = doc.data().email;
          });
        });
    },
    updateUser() {
      db.collection("users")
        .where("username", "==", this.$route.params.username)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .update({
                username: this.username,
                name: this.name,
                branch: this.branch,
                email: this.email,
              })
              .then(() => {
                this.$router.push({
                  name: "view-user",
                  params: { username: this.username },
                });
              });
          });
        });
    },
  },
};
</script>
