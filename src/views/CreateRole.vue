<template>
  <div>
    <NavBar></NavBar>
    <div class="container">
      <h3>Crear Rol</h3>
    <body>
      <template>
        <v-form v-model="valid">
          <v-container>
              <v-row>
                <v-col cols="12" md="6">
                    <v-text-field v-model="nombre" :rules="nameRules" 
                    :counter="10" label="Descripción" required></v-text-field>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="e6"
                    :items="items"
                    :menu-props="{ maxHeight: '400' }"
                    label="Seleccione permisos"
                    multiple
                    hint="Escoja los permisos a otorgar al rol"
                    persistent-hint
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                  <v-col cols="12" md="6">
                      <v-btn style="float: right;" color="" class="primary" @click="resetValidation">
                          Crear
                      </v-btn>
                      <v-btn color="" class="info" href='/home' style="float: left;">
                          Atrás
                      </v-btn>
                  </v-col>
              </v-row>
          </v-container>
        </v-form>
      </template>
    </body>
  </div>
  </div>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: 'CreateRole',
  data() {
    return {
        content: '',
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
<script>
  export default {
    data: () => ({
      e6: [],
      e7: [],
      items: ['Crear usuario', 'Editar usuario', 'Eliminar usuario',
              'Crear rol', 'Editar rol', 'Eliminar rol'
      ],
    }),
  }
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
