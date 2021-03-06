<template>
  <div>
    <NavBar></NavBar>
    <v-row justify="center">
      <v-col cols="11" >
        <v-alert v-if="showAlertError" dense outlined type="error">
          {{alertMsg}}
        </v-alert>
        <v-alert v-if="showAlertSuccess" dense outlined type="success">
          {{alertMsg}}
        </v-alert>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="proyectos"
      :estados="estados"
      sort-by
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de proyectos</v-toolbar-title>
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
                      <v-text-field v-model="editedItem.descripcion" label="Descripción"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
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
                <v-btn color="blue darken-1" text @click="guardar">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <template v-if="item.estado !=='Finalizado'">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          </template>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Resetear</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import ProjectService from "../services/project.service";
import OthersServices from "../services/other.services";

export default {
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: "Id proyecto",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "Nombre", value: "nombre" },
        { text: "Descripción", value: "descripcion" },
        { text: "Fecha inicio", value: "fecha_inicio" },
        { text: "Fecha fin", value: "fecha_fin" },
        { text: "Estado", value: "estado" },
        { text: "Acciones", value: "actions", sortable: false }
      ],
      proyectos: [],
      estados: [],
      editedIndex: -1,
      editedItem: {
        nombre: "",
        descripcion: "",
        estado_id: ""
      },
      defaultItem: {
        nombre: "",
        descripcion: "",
        estado_id: []
      },
      showAlertError: false,
      showAlertSuccess: false,
      alertMsg: ''
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo proyecto" : "Editar proyecto";
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
      this.editedIndex = this.proyectos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    eliminar(item) {
      if (confirm("Are you sure you want to delete this item?")) {
        this.editedIndex = this.proyectos.indexOf(item);
        this.editedItem = Object.assign({}, item);
        ProjectService.deleteProject(this.editedItem.id);
      }
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
        Object.assign(this.proyectos[this.editedIndex], this.editedItem);
      } else {
        this.proyectos.push(this.editedItem);
      }
      this.close();
    },
    guardar() {
      if (this.editedIndex > -1) {
        ProjectService.updateProject(this.editedItem).then(
          response => {
            this.alertMsg = "Edición Exitosa"; 
            this.showAlertSuccess = true;
            this.getProyectos();
            setTimeout(() => {
              this.showAlertSuccess = false;
            }, 5000);
          },
          error => {
            this.alertMsg = error.response.data.message;  
            this.showAlertError = true;
        }
        )
      } else {
        ProjectService.createProject(this.editedItem).then(
          response => {
            this.alertMsg = "Creación Exitosa";  
            this.showAlertSuccess = true;
            this.getProyectos();
            setTimeout(() => {
              this.showAlertSuccess = false;
            }, 5000);
          },
          error => {
            this.alertMsg = error.response.data.message;  
            this.showAlertError = true;
        }
        )
      }
      this.close();
    },

    getProyectos() {
      let showProjectFinalized = true;
      ProjectService.listProjects(showProjectFinalized).then(
        response => {
          this.proyectos = response.data;
        },
        error => {
          this.proyectos =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            this.alertMsg = error.response.data.message;  
            this.showAlertError = true;
        }
      );
    },

    getEstados() {
      let table_name = "Proyecto";
      OthersServices.listStates(table_name).then(
        response => {
          this.estados = response.data;
        },
        error => {
          this.estados =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
            this.alertMsg = error.response.data.message;  
            this.showAlertError = true;
        }
      );
    }
  },
  mounted() {
    this.getProyectos();
    this.getEstados();
  }
};
</script>