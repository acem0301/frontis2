
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
        <v-toolbar-title>Lista de ítems</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="700px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Nuevo Item</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.descripcion" label="Descripción"></v-text-field>
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
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.estado_id"
                      :items="states"
                      label="Estado"
                      item-text="descripcion"
                      item-value="id"
                      hide-details
                      single-line
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                      v-model="editedItem.fase_id"
                      :items="phases"
                      label="Fase"
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
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetear</v-btn>
    </template>-->
  </v-data-table>
</template>

<script>
import ItemService from "../services/item.service";
import OtherServices from "../services/other.services";
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
          value: "id"
        },
        { text: "Prioridad", value: "nombre_prioridad" },
        { text: "Estado", value: "estado" },
        { text: "Descripción", value: "descripcion" },
        { text: "Observación", value: "observacion" },
        { text: "Fase", value: "fase_nombre" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      tareas: [],
      states: [],
      priorities: [],
      phases: [],
      editedIndex: -1,
      editedItem: {
        id: "",
        version: "",
        prioridad_id: "",
        estado_id: "",
        descripcion: "",
        observacion: "",
        fase_id: "",
        id_tarea_padre: "",
        es_padre: false
      },
      defaultItem: {
        id: "",
        version: "",
        prioridad_id: "",
        estado_id: "",
        descripcion: "",
        observacion: "",
        fase_id: "",
        id_tarea_padre: "",
        es_padre: false
      }
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo ítem" : "Editar ítem";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
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
        response => {
          this.tareas = response.data;
        },
        error => {
          this.tareas =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },

    getStates() {
      let table_name = "Item";
      OtherServices.listStates(table_name).then(
        response => {
          this.states = response.data;
          console.log(this.states);
        },
        error => {
          this.states =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },

    getPriorities() {
      OtherServices.listPriorities().then(
        response => {
          this.priorities = response.data;
        },
        error => {
          this.priorities =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },

    getPhases() {
      OtherServices.listPhases().then(
        response => {
          this.phases = response.data;
        },
        error => {
          this.phases =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    },
    guardar() {
      if (this.editedIndex > -1) {
        ItemService.updateItem(this.editedItem);
      } else {
        console.log(this.editedItem);
        ItemService.createItem(this.editedItem);
      }
      this.close();
    }
  },

  mounted() {
    this.getItems();
    this.getStates();
    this.getPriorities();
    this.getPhases();
  }
};
</script>