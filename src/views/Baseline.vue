<template>
  <div>
    <NavBar></NavBar>
    <v-row justify="center">
      <v-col cols="11">
        <v-alert v-if="showAlertError" dense outlined type="error">{{alertMsg}}</v-alert>
        <v-alert v-if="showAlertSuccess" dense outlined type="success">{{alertMsg}}</v-alert>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="tareas"
      :states="states"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de Ítems</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on }">
              <v-btn small color="primary" dark class="mb-2" v-on="on">Crear</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.nombre" label="Nombre de línea base"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="crear">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-container fluid>
          <v-checkbox :checked="checked" @change="check($event, checked, item)"></v-checkbox>
        </v-container>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ItemService from "../services/item.service";
import Project from "../services/project.service";
import OthersServices from "../services/other.services";
import Baseline from "../services/baseline.service";

export default {
  data() {
    return {
      dialog: false,
      checked: false,
      headers: [
        {
          text: "Id ítem",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Prioridad", value: "nombre_prioridad" },
        { text: "Estado", value: "estado" },
        { text: "Descripción", value: "descripcion" },
        { text: "Proyecto", value: "proyecto_nombre" },
        { text: "Seleccionar", value: "actions", sortable: false },
      ],
      tareas: [],
      states: [],
      projects: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        nombre: "",
        proyecto_id: "",
        estado_id: "",
        items_id: [],
      },
      defaultItem: {
        id: "",
        nombre: "",
        proyecto_id: "",
        estado_id: "",
        items_id: [],
      },
      showAlertError: false,
      showAlertSuccess: false,
      alertMsg: "",
    };
  },

  computed: {
    formTitle() {
      return "Nueva Línea Base";
    },
  },

  methods: {
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    check: function (e, checked, item) {
      console.log(item);
      if (e) {
        this.editedItem.items_id.push(item);
      } else {
        this.deleteItemArray(this.editedItem.items_id, item);
      }
      console.log(this.editedItem.items_id);
    },

    deleteItemArray(arr, item) {
      let i = arr.indexOf(item);

      if (i !== -1) {
        arr.splice(i, 1);
      }
    },

    getItems() {
      ItemService.listItems().then(
        (response) => {
          this.tareas = response.data.filter(
            (value) => value.pertenece_a_lb == null
          );
        },
        (error) => {
          this.tareas =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.alertMsg = error.response.data.message;
          this.showAlertError = true;
        }
      );
    },

    getProjects() {
      let showProjectFinalized = true;
      Project.listProjects(showProjectFinalized).then(
        (response) => {
          this.projects = response.data;
        },
        (error) => {
          this.projects =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.alertMsg = error.response.data.message;
          this.showAlertError = true;
        }
      );
    },
    getEstados() {
      let table_name = "Linea Base";
      OthersServices.listStates(table_name).then(
        (response) => {
          this.estados = response.data;
        },
        (error) => {
          this.estados =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.alertMsg = error.response.data.message;
          this.showAlertError = true;
        }
      );
    },
    crear() {
      Baseline.createbaseline(this.editedItem).then(
        (response) => {
          this.alertMsg = "Creación Exitosa";
          this.showAlertSuccess = true;
          this.getItems();
          setTimeout(() => {
            this.showAlertSuccess = false;
          }, 5000);
        },
        (error) => {
          this.alertMsg = error.response.data.message;
          this.showAlertError = true;
        }
      );
      this.close();
    },
  },

  mounted() {
    this.getItems();
    this.getProjects();
    this.getEstados();
  },
};
</script>