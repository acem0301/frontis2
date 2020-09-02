<template>
  <nav>
    <v-toolbar color="#00B6C2">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon href @click.prevent="logOut">mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer app v-model="drawer" class="dark">
      <v-list v-if ="role == 'ADMINISTRADOR'">
        <v-list-item :to="homeRoute">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
        <v-list-group
          v-for="item in adminItems"
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

          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.route">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-list v-else-if ="role == 'DESARROLLADOR'">
        <v-list-item :to="homeRoute">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
        <v-list-group
          v-for="item in desaItems"
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

          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.route">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-list v-else-if ="role == 'LIDER'">
        <v-list-item :to="homeRoute">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
        <v-list-group
          v-for="item in desaItems"
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

          <v-list-item v-for="subItem in item.items" :key="subItem.title" :to="subItem.route">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
      <v-list v-else>
        <v-list-item :to="homeRoute">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </nav>
</template>


<script>
export default {
  name: "NavBar",
  data() {
    return {
      role: this.userRole(),
      homeRoute: "/home",
      drawer: false,
      adminItems: [
        {
          action: "mdi-account",
          title: "Administración",
          route: "",
          items: [
            { title: "Usuarios", route: "/listUsers" },
            { title: "Roles", route: "/listRoles" }
          ]
        },
        {
          action: "mdi-cog-outline",
          title: "Configuración",
          route: "",
          items: [
            {title:"Crear linea base", route:"/listTarea"},
            {title:"Listado de líneas base", route:"/listBaselines"}
          ]
        },
        {
          action: "mdi-clipboard-account",
          title: "Desarrollo",
          route: "",
          items: [
            { title: "Ítems", route: "/listItems" },
            { title: "Proyectos", route: "/listProjects" }
          ]
        }
      ],
          desaItems: [
        {
          action: "mdi-clipboard-account",
          title: "Desarrollo",
          route: "",
          items: [
            { title: "Ítems", route: "/listItems" }
          ]
        }
      ],
         liderItems: [
        {
          action: "mdi-clipboard-account",
          title: "Desarrollo",
          route: "",
          items: [
            { title: "Ítems", route: "/listItems" },
            { title: "Proyectos", route: "/listProjects" }
          ]
        }
      ]
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminNavBar() {
      console.log(this.currentUser.user_rol);
      if (this.currentUser && this.currentUser.user_rol) {
        if (this.currentUser.nombre_rol.toUpperCase() == "ADMINISTRADOR") {
          return true;
        }
      }
      return false;
    }

  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    userRole(){
      let user = this.$store.state.auth.user;
      console.log(user.nombre_rol.toUpperCase());
      return user.nombre_rol.toUpperCase();
    }
  }
};
</script>
<style scoped>
.v-list-item__title,
.v-icon,
.v-icon.v-icon:after,
.v-icon.v-icon::before {
  color: black !important;
}

.mdi-account::before,
.mdi-account::after {
  color: black !important;
}

.v-list-item__icon .v-list-group__header__append-icon {
  display: none;
}
</style>