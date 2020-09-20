
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
          <v-toolbar-title>Lista de ítems</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
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
                      <v-text-field v-model="editedItem.version" label="Version"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.observacion" label="Observación"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-select
                        v-model="editedItem.prioridad_id"
                        :items="priorities"
                        label="Prioridad"
                        item-text="descripcion"
                        item-value="id"
                        hide-details
                        single-line
                      ></v-select>
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
        <template v-if="item.pertenece_a_lb == null">
          <template v-if="item.estado !=='Finalizado'">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          </template>
        </template>
      </template>
      <template v-slot:item.finalizar="{item}">
        <v-btn
          v-if="item.estado == 'Iniciado'"
          small
          color="primary"
          @click="changeStateFinalize(item)"
        >Finalizar</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ItemService from "../services/item.service";
import OtherServices from "../services/other.services";
import Project from "../services/project.service";
import Item from "../models/item";
export default {
  data() {
    return {
      dialog: false,
      item: new Item(),
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
        { text: "Observación", value: "observacion" },
        { text: "Proyecto", value: "proyecto_nombre" },
        { text: "Acciones", value: "actions", sortable: false },
        { text: "", value: "finalizar", sortable: false },
      ],
      tareas: [],
      states: [],
      priorities: [],
      projects: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        version: "",
        prioridad_id: "",
        estado_id: "",
        descripcion: "",
        observacion: "",
        proyecto_id: "",
        id_tarea_padre: "",
        es_padre: false,
      },
      defaultItem: {
        id: "",
        version: "",
        prioridad_id: "",
        estado_id: "",
        descripcion: "",
        observacion: "",
        proyecto_id: "",
        id_tarea_padre: "",
        es_padre: false,
      },
      showAlertError: false,
      showAlertSuccess: false,
      alertMsg: "",
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo ítem" : "Editar ítem";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.tareas.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.tareas.indexOf(item);
      confirm("¿Seguro que desea borrar este ítem?") &&
        this.tareas.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    getItems() {
      ItemService.listItems().then(
        (response) => {
          this.tareas = response.data;
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

    getPriorities() {
      OtherServices.listPriorities().then(
        (response) => {
          this.priorities = response.data;
        },
        (error) => {
          this.priorities =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.alertMsg = error.response.data.message;
          this.showAlertError = true;
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
          this.alertMsg = error.response.data.message;
          this.showAlertError = true;
        }
      );
    },
    guardar() {
      if (this.editedIndex > -1) {
        ItemService.updateItem(this.editedItem).then(
          (response) => {
            this.alertMsg = "Edición Exitosa";
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
      } else {
        ItemService.createItem(this.editedItem).then(
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
      }
      this.close();
    },

    changeStateFinalize(item) {
      ItemService.updateItemState(item.id);
    },
  },

  mounted() {
    this.getItems();
    this.getPriorities();
    this.getProjects();
  },
};
</script>