<template>
  <v-data-table
    :headers="headers"
    :items="tareas"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de ítems</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
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
                    <v-text-field v-model="editedItem.name" label="Descripción"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Observación"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Estado"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Prioridad"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Resetear</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Id ítem',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Prioridad', value: 'priority' },
        { text: 'Estado', value: 'state' },
        { text: 'Descripción', value: 'description' },
        { text: 'Observación', value: 'observation' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      tareas: [],
      editedIndex: -1,
      editedItem: {
        Nombre: '',
        Apellido: '',
        Email: '',
        Contraseña: '',
      },
      defaultItem: {
        Nombre: '',
        Apellido: '',
        Email: '',
        Contraseña: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nuevo ítem' : 'Editar ítem'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.tareas = [
          {
            id: '1',
            priority: 'media',
            state: 'inicial',
            description: 'Creación de DER',
            observation: '',
            active: true
          },
          {
            id: '1',
            priority: 'media',
            state: 'inicial',
            description: 'Creación de DER',
            observation: '',
            active: true
          },
          
        ]
      },

      editItem (item) {
        this.editedIndex = this.tareas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.tareas.indexOf(item)
        confirm('¿Seguro que desea borrar esta tarea?') && this.tareas.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.tareas[this.editedIndex], this.editedItem)
        } else {
          this.tareas.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>