<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Users</h4>
      </li>
      <li v-for="user in users" :key="user.id" class="collection-item">
        <div class="chip">
          {{ user.branch }}
        </div>
        {{ user.username }}:{{ user.name }}

        <router-link
          class="secondary-content"
          v-bind:to="{ name: 'view-user', params: { username: user.username } }"
        >
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>

    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from "./firebaseInit";
export default {
  name: "dashboard",
  data() {
    return {
      users: [],
    };
  },
  created() {
    db.collection("users")
      .orderBy("name") //for sorting
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const data = {
            id: doc.id, //firestore unique _id
            username: doc.data().username,
            name: doc.data().name,
            branch: doc.data().branch,
            email: doc.data().email,
          };
          this.users.push(data);
        });
      });
  },
};
</script>
