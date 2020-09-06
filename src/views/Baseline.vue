
<template>
  <v-data-table
    :headers="headers"
    :items="tareas"
    :states="states"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <NavBar></NavBar>
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
                  <div v-if="editedIndex === -1">
                    <v-col cols="12" sm="6" md="7">
                      <v-select
                        v-model="editedItem.proyecto_id"
                        :items="projects"
                        label="Proyecto"
                        item-text="nombre"
                        item-value="id"
                        hide-details
                        single-line
                      ></v-select>
                    </v-col>
                  </div>
                  <v-col cols="13" sm="6" md="4">
                    <v-select
                      v-model="editedItem.estado_id"
                      :items="estados"
                      label="Estado"
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
              <v-btn color="blue darken-1" text @click="crear">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-container fluid>
        <v-checkbox v-model="checked" @change="check($event, checked, item)"></v-checkbox>
      </v-container>
    </template>
  </v-data-table>
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
      selected: [],
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
    };
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
      if (checked) {
        this.editedItem.items_id.push(item.id);
      } else {
        this.deleteItemArray(this.editedItem.items_id, item);
      }
      console.log(this.editedItem.items_id);
      console.log(this.checkedCategories, e);
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
        }
      );
    },

    getProjects() {
      Project.listProjects().then(
        (response) => {
          this.projects = response.data;
        },
        (error) => {
          this.projects =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
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
        }
      );
    },
    crear() {
      Baseline.createbaseline(this.editedItem);
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