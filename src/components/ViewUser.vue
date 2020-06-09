<template>
  <div id="view-user">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>{{ name }}</h4>
      </li>
      <li class="collection-item">Username: {{ username }}</li>
      <li class="collection-item">Branch: {{ branch }}</li>
      <li class="collection-item">Email: {{ email }}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button @click="deleteUser" class="btn red">Delete</button>

    <div class="fixed-action-btn">
      <router-link
        v-bind:to="{ name: 'edit-user', params: { username: username } }"
        class="btn-floating btn-large green"
      >
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "view-user",
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
    deleteUser() {
      if (confirm("Are you sure?")) {
        db.collection("users")
          .where("username", "==", this.$route.params.username)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              doc.ref.delete();
              this.$router.push("/");
            });
          });
      }
    },
  },
};
</script>
