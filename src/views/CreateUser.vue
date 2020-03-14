<template>
  <div class="container">
    <!-- <header class="jumbotron"> -->
      <h3>Crear Usuario</h3>
    <!-- </header> -->
    <body>
       
<template>
  <v-form v-model="valid">
    <v-container>
        <v-row>
        <v-col cols="12" md="6">
            <v-text-field v-model="nombre" :rules="nameRules" 
            :counter="10" label="Nombre" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
            <v-text-field v-model="apellido" :rules="nameRules" 
            :counter="10" label="Apellido" required></v-text-field>
        </v-col>
         </v-row>
        <v-row>
            <v-col cols="12" md="6">
                <v-text-field v-model="email" :rules="emailRules" 
                label="E-mail" required></v-text-field>
            </v-col>
        </v-row>
       <v-row>
            <v-col cols="12" md="6">
                <v-text-field v-model="nombre_usuario" :rules="nameRules" 
                :counter="10" label="Nombre de Usuario" required></v-text-field>
            </v-col>
         </v-row>
       <v-row>
            <v-col cols="12" md="6">
               <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'" name="password"
                    label="Contraseña" hint="Al menos 8 caracteres" counter 
                    @click:append="show1 = !show1">
                </v-text-field>
            </v-col>
         </v-row>
         <v-row>
            <v-col cols="12" md="6" style="text-align: end;">
               <v-btn color="" class="primary" @click="resetValidation">
                    Crear
                </v-btn>
            </v-col>
         </v-row>
    </v-container>
  </v-form>
</template>
    </body>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'CreateUser',
  data() {
    return {
        content: '',
        show1: false,
        show2: true,
        show3: false,
        show4: false,
        password: '',
        rules: {
            required: value => !!value || 'Required.',
            min: v => v.length >= 8 || 'Min 8 characters',
            emailMatch: () => ('The email and password you entered don\'t match'),
        },
    };
  },
  mounted() {
    UserService.getPublicContent().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
  }
};
</script>

<style scoped>
    table{
        width: 100%;
    }
    td{
        width: 50%;
        padding: 50px;
    }
</style>
<!-- :rules="[rules.required, rules.min]"  reglas del pass--> 