<template>
  <div>
    <NavBar></NavBar>
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
