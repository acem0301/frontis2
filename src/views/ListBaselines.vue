
<template>
  <div>
    <v-row>
      <v-col>
          <NavBar></NavBar>
      </v-col>
    </v-row>
    <v-expansion-panels focusable v-for="item in baselines" :key="item.id">
      <v-expansion-panel>
        <v-expansion-panel-header>{{item.nombre_lb}}</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-simple-table>
                <template v-slot:default>
                <thead>
                    <tr>
                    <th class="text-left">Prioridad</th>
                    <th class="text-left">Estado</th>
                    <th class="text-left">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{{ item.prioridad }}</td>
                    <td>{{ item.estado }}</td>
                    <td>{{ item.descripcion }}</td>
                    </tr>
                </tbody>
                </template>
            </v-simple-table>
          </v-expansion-panel-content>
      </v-expansion-panel>
  </v-expansion-panels>
  </div>
</template>

<script>
import LineaBaseService from "../services/baseline.service";
import Baseline from "../models/baseline";
  export default {
    data() {
      return {
        baselines: []
      };
  },
  methods: {
    getBaselines() {
      LineaBaseService.listBaselines().then(
        response => {
          this.baselines = response.data;
        },
        error => {
          this.baselines =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  },

  mounted() {
    this.getBaselines();
  }
  }
</script>
 <style scoped>
    .v-data-table
      /deep/
      tbody
      /deep/
      tr:hover:not(.v-data-table__expanded__content) {
      background: #ffffff !important;
    }
</style>

