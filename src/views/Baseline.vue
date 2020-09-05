
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
          <template v-slot:activator="{}">
            <v-btn small color="primary" dark class="mb-2">Crear</v-btn>
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
                    <v-text-field v-model="editedItem.descripcion" label="Observacion"></v-text-field>
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
              <v-btn color="blue darken-1" text @click="crear">crear</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>

    <template v-slot:item.actions="{ item }">
      <input type="checkbox" />
    </template>
  </v-data-table>
</template>

<script>
import ItemService from "../services/item.service";
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
        { text: "Proyecto", value: "proyecto_nombre" },
        { text: "Seleccionar", value: "actions", sortable: false },
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
    };
  },

  methods: {
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

    crear() {
      //TODO Hacer metodo que haga el post para creacion de LB
    },
  },

  mounted() {
    this.getItems();
  },
};
</script>