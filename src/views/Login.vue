<template>
  <mdb-container>
    <div class="centered-container h-100">
      <md-content class="md-elevation-3">
        <div class="title">
          <div class="md-title">INICIAR SESIÓN</div>
        </div>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('username')">
                  <label for="username">Usuario</label>
                  <md-input
                    name="username"
                    id="username"
                    autocomplete="given-name"
                    v-model="user.username"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.user.username.required">Ingrese Usuario</span>
                  <span class="md-error" v-else-if="!$v.user.username.minlength">Invalid first name</span>
                </md-field>
              </div>

              <div class="md-layout-item md-small-size-100">
                <md-field md-has-password :class="getValidationClass('password')">
                  <label for="password">Contraseña</label>
                  <md-input
                    name="password"
                    id="password"
                    autocomplete="family-name"
                    v-model="user.password"
                    type="password"
                    :disabled="sending"
                  />
                  <span class="md-error" v-if="!$v.user.password.required">Ingrese contraseña</span>
                  <span class="md-error" v-else-if="!$v.user.password.minlength">Invalid last name</span>
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-progress-bar md-mode="indeterminate" v-if="sending" />
          <div class="actions md-layout md-alignment-center">
            <md-button type="submit" class="md-raised md-primary" :disabled="sending">INGRESAR</md-button>
          </div>
        </form>
        <div class="loading-overlay" v-if="loading">
          <md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
        </div>
      </md-content>
    </div>
  </mdb-container>
</template>

<script>
import { mdbContainer } from "mdbvue";
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mixins: [validationMixin],
  data() {
    return {
      user: {
        username: null,
        password: null
      },
      userSaved: false,
      sending: false,
      lastUser: null,
      loading: false,
      message: ""
    };
  },
  validations: {
    user: {
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(3)
      }
    }
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
    getValidationClass(fieldName) {
      const field = this.$v.user[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.user.username = null;
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.handleLogin();
      }
    },
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
