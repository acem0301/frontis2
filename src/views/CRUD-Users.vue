<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :hola="desserts"
    sort-by="desserts.id"
    class="elevation-1"
  >
    <template v-slot:top>
      <NavBar></NavBar>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Usuarios</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo usuario</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="user.nombre" label="Nombre"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="user.apellido" label="Apellido"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="user.email" label="E-mail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="user.username" label="Nombre de Usuario"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="user.password" label="Contraseña"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="user.rol_id"
                      :items="items"
                      label="Rol"
                      item-text="descripcion"
                      item-value="id"
                      hide-details
                      single-line
                    ></v-select>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="crearUsuario">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>


  <script>
import UserService from "../services/user.service";
import RolService from "../services/rol.service";
import User from "../models/user";
import axios from "axios";
export default {
  name: "ListUsers",
  data() {
    return {
      dialog: false,
      user: new User(),
      headers: [
        {
          text: "Usuario",
          align: "start",
          sortable: false,
          value: "username"
        },
        { text: "Nombre", value: "nombre" },
        { text: "Apellido", value: "apellido" },
        { text: "E-mail", value: "email" },
        { text: "Rol", value: "descripcion" },
        { text: "Activo", value: "activo" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      desserts: [],
      items: [],
      editedIndex: -1,
      editedItem: {
        nombre: "",
        apellido: "",
        email: "",
        username: "",
        password: "",
        rol_id: ""
      },
      defaultItem: {
        nombre: "",
        apellido: "",
        email: "",
        username: "",
        password: "",
        rol: ""
      }
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.find(x => x.id == data.id);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.desserts.find(x => x.id == data.id);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },
    getUsuarios() {
      UserService.listUsers().then(
        response => {
          this.desserts = response.data;
        },
        error => {
          this.desserts =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    getRoles() {
      RolService.listRoles().then(
        response => {
          this.items = response.data;
        },
        error => {
          this.items =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    crearUsuario() {
      UserService.createUser(this.user);
    }
  },
  mounted() {
    this.getRoles();
    this.getUsuarios();
    this.crearUsuario();
  }
};
</script>