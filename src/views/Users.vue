<template>
  <div>
    <NavBar></NavBar>
    <v-row>
      <v-col>
        <v-alert v-if="showAlert" dense outlined type="error">
          {{alertMsg}}
        </v-alert>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="items"
      :hola="desserts"
      sort-by="desserts.id"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de Usuarios</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn small color="primary" dark class="mb-2" v-on="on">Agregar</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre" label="Nombre"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.apellido" label="Apellido"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="5">
                      <v-text-field v-model="editedItem.username" label="Nombre de Usuario"></v-text-field>
                    </v-col>
                    <div v-if="editedIndex === -1">
                      <v-col cols="12" sm="6" md="8">
                        <v-text-field
                          v-model="editedItem.password"
                          type="password"
                          label="Contraseña"
                        ></v-text-field>
                      </v-col>
                    </div>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.rol_id"
                        :items="roles"
                        label="Rol"
                        item-text="descripcion"
                        item-value="id"
                        hide-details
                        single-line
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.proyecto_id"
                        :items="proyecto"
                        label="Proyecto"
                        item-text="nombre"
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
                <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="updateUsuario(item)">mdi-pencil</v-icon>
        <v-icon small @click="eliminar(item)">mdi-delete</v-icon>
      </template>
      <template v-slot:no-data>
      </template>
    </v-data-table>
  </div>
</template>


  <script>
import UserService from "../services/user.service";
import RolService from "../services/rol.service";
import ProjectService from "../services/project.service";
import User from "../models/user";
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
        { text: "Proyecto", value: "proyecto_nombre"},
        { text: "Acciones", value: "actions", sortable: false }
      ],
      desserts: [],
      items: [],
      roles: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        nombre: "",
        apellido: "",
        email: "",
        username: "",
        password: "",
        rol_id: "",
        proyecto_id: ""
      },
      defaultItem: {
        nombre: "",
        apellido: "",
        email: "",
        username: "",
        password: "",
        rol_id: "",
        proyecto_id: ""
      },
      showAlert: false,
      alertMsg: ''
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo ítem" : "Editar ítem";
    }
  },

  methods: {
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
          this.items = response.data;
        },
        error => {
          this.items =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            this.alertMsg = error.response.data.message;  
            this.showAlert = true;
        }
      );
    },
    getRoles() {
      RolService.listRoles().then(
        response => {
          this.roles = response.data;
        },
        error => {
          this.items =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            this.alertMsg = error.response.data.message;  
            this.showAlert = true;
        }
      );
    },
     getProyecto() {
      ProjectService.listProjects().then(
        response => {
          this.proyecto = response.data;
        },
        error => {
          this.items =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            this.alertMsg = error.response.data.message;  
            this.showAlert = true;
        }
      );
    },
    guardar() {
      if (this.editedIndex > -1) {
        UserService.updateUser(this.editedItem);
      } else {
        UserService.createUser(this.editedItem);
      }
      this.close();
    },

    updateUsuario(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    eliminar(item) {
      if (confirm("¿Seguro que quiere eliminar este ítem?")) {
        this.editedIndex = this.items.indexOf(item);
        this.editedItem = Object.assign({}, item);
        UserService.deleteUser(this.editedItem.id);
      } 
    }
  },
  mounted() {
    this.getRoles();
    this.getUsuarios();
    this.getProyecto();
  }
};
</script>