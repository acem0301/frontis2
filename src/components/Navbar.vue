<template>
  <nav>
    <v-toolbar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn class="error" href @click.prevent="logOut">Salir</v-btn>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" class="dark">
      <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        :to="item.route"
        v-model="item.active"
        :prepend-icon="item.action"
        
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.items"
          :key="subItem.title"
          :to="subItem.route"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
    </v-navigation-drawer>
     <router-view />
  </nav>
</template>


<script>
  export default {
    name: "NavBar",
    data () {
      return {
        drawer: false,
        items: [
          {
            action: 'mdi-home',
            title: 'Dashboard',
            route: '/home',
            items: [

            ],
          },
          {
            action: 'mdi-account',
            title: 'Administración',
            route: '',
            active: true,
            items: [
              { title: 'Usuarios', route: '/listUsers' },
              { title: 'Roles', route: '/listRoles' },
            ],
          },
          {
            action: 'las la-battery-three-quarters',
            title: 'Configuración',
            route: '',
            items: [
              {},
            ],
          },
          {
            action: 'mdi-clipboard-account',
            title: 'Desarrollo',
            route: '',
            items: [
              {},
            ],
          },
        ],
      }
    },
  }
</script>
<style scoped>
  .v-list-item__title, .v-icon, .v-icon.v-icon:after, .v-icon.v-icon::before{
    color: black !important;
  }

  .mdi-account::before, .mdi-account::after{
    color: black !important;
  }
</style>