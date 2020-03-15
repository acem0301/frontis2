<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <NavBar></NavBar>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de Usuarios</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on" href="/createUser">Crear usuario</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="Dessert name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.fat" label="Fat (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
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
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: 'ListUsers',
    data: () => ({
      dialog: false,
      headers: [
        {
          text: 'Usuario',
          align: 'start',
          sortable: false,
          value: 'nombreUsuario',
        },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellido', value: 'apellido' },
        { text: 'E-mail', value: 'email' },
        { text: 'Rol', value: 'rol' },
        { text: 'Activo', value: 'activo' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
        this.desserts = [
          {
            nombreUsuario: 'acem012',
            nombre: 'Adriana',
            apellido: 'Estigarribia',
            email: 'acem0301@gmail.com',
            rol: 'Administrador',
            activo: true,
          },
          
          {
            nombreUsuario: 'fierrofenix',
            nombre: 'César',
            apellido: 'Rolón',
            email: 'fierrofenix@gmail.com',
            rol: 'Administrador',
            activo: true,
          },
          
          {
            nombreUsuario: 'arias7',
            nombre: 'Arturo',
            apellido: 'Sosa',
            email: 'arturSosa@gmail.com',
            rol: 'Administrador',
            activo: true,
          },
          
          {
            nombreUsuario: 'ragv',
            nombre: 'Rodrigo',
            apellido: 'Ruiz',
            email: 'ragv@gmail.com',
            rol: 'Administrador',
            activo: true,
          },
          
          {
            nombreUsuario: 'peter98',
            nombre: 'Peter',
            apellido: 'Jhones',
            email: 'peterj@gmail.com',
            rol: 'Líder de Proyecto',
            activo: true,
          },
          
          {
            nombreUsuario: 'ark23',
            nombre: 'John',
            apellido: 'Terry',
            email: 'johnt@gmail.com',
            rol: 'Desarrollador',
            activo: true,
          },
          
          {
            nombreUsuario: 'fatima45',
            nombre: 'Fátima',
            apellido: 'Benítez',
            email: 'fabenitez@gmail.com',
            rol: 'Desarrollador',
            activo: true,
          },
        ]
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.desserts.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.desserts.splice(index, 1)
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
          Object.assign(this.desserts[this.editedIndex], this.editedItem)
        } else {
          this.desserts.push(this.editedItem)
        }
        this.close()
      },
    },
  }

  //import NavBar from "./components/Navbar";
</script>