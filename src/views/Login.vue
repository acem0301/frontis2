<template>
  <mdb-container>
    <div class="centered-container h-100">
      <md-content class="md-elevation-3">
        <div class="title">
          <div class="md-title">INICIAR SESIÓN</div>
        </div>
        <div class="form-group">
          <md-field>
            <label>Usurio</label>
            <md-input v-model="user.username" autofocus></md-input>
          </md-field>
          <md-field md-has-password>
            <label>Clave</label>
            <md-input v-model="user.password" type="password"></md-input>
          </md-field>
        </div>
        <div class="actions md-layout md-alignment-center">
          <md-button class="md-raised md-primary" @click="handleLogin">INGRESAR</md-button>
        </div>
        <div class="loading-overlay" v-if="loading">
          <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
        </div>
      </md-content>
    </div>
  </mdb-container>
</template>

<script>
import User from "../models/user";
import { mdbContainer } from "mdbvue";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      loading: false,
      message: ""
    };
  },
  components: {
    mdbContainer
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/home");
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.$validator.validateAll().then(isValid => {
        if (!isValid) {
          this.loading = false;
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/home");
            },
            error => {
              this.loading = false;
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
            }
          );
        }
      });
    }
  }
};
</script>

<style>
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100%;
  margin-top: 40px;
}
.centered-container .title {
  text-align: center;
  margin-bottom: 30px;
}
.centered-container .title img {
  margin-bottom: 16px;
  max-width: 80px;
}
.centered-container .actions .md-button {
  margin: 0;
}
.centered-container .form {
  margin-bottom: 60px;
}
.h-100 {
  height: 100%;
}
.centered-container .md-content {
  z-index: 1;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  position: relative;
  border-radius: 10px;
}
.centered-container .loading-overlay {
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
}
.md-elevation-3 {
  box-shadow: 0 0 10px !important;
  color: #006446 !important;
}
</style>
