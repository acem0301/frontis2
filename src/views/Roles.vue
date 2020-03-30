<template>
  <v-data-table :headers="headers" :items="roles" sort-by="calories" class="elevation-1">
    <template v-slot:top>
      <NavBar></NavBar>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Roles</v-toolbar-title>
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
                    <v-text-field v-model="editedItem.descripcion" label="Descripción"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.permisos"
                      :items="items"
                      :menu-props="{ maxHeight: '400' }"
                      label="Permisos"
                      persistent-hint
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
      <v-icon small class="mr-2" @click="updateRol(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteRol(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import RolService from "../services/rol.service";
import Rol from "../models/rol";
export default {
  name: "ListRoles",
  data() {
    return {
      dialog: false,
      rol: new Rol(),
      headers: [
        {
          text: "Rol",
          align: "start",
          sortable: false,
          value: "descripcion"
        },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      roles: [],
      editedIndex: -1,
      editedItem: {
        descripcion: "",
        permisos: []
      },
      defaultItem: {
        descripcion: "",
        permisos: []
      },
      items: [
        "Crear usuario",
        "Editar usuario",
        "Eliminar usuario",
        "Crear rol",
        "Editar rol",
        "Eliminar rol"
      ]
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo Rol" : "Editar Rol";
    }
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
      this.editedIndex = this.roles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.roles.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.roles.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    guardar() {
      if (this.editedIndex > -1) {
        RolService.updateRol(this.editedItem);
      } else {
        RolService.createRol(this.editedItem);
      }
      this.close();
    },
    updateRol(item) {
      this.editedIndex = this.roles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteRol(item) {
      if (confirm("Are you sure you want to delete this item?")) {
        this.editedIndex = this.roles.indexOf(item);
        this.editedItem = Object.assign({}, item);
        RolService.deleteRol(this.editedItem.id);
      }
    }
  },
  mounted() {
    let vue = this;
    RolService.listRoles().then(
      response => {
        vue.roles = response.data;
      },
      error => {
        this.desserts =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    );
    this.crearRol();
  }
};
</script>