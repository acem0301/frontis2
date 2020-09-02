<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <header class="jumbotron"></header>
    </div>
  </div>
</template>

<script>
import UserService from "../services/user.service";

export default {
  name: "Home",
  data() {
    return {
      content: "",
    };
  },
};
</script>
