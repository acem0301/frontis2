
<template>
  <div>
    <NavBar></NavBar>
    <v-row justify="center">
      <v-col cols="11">
        <v-alert v-if="showAlertError" dense outlined type="error">{{alertMsg}}</v-alert>
        <v-alert v-if="showAlertSuccess" dense outlined type="success">{{alertMsg}}</v-alert>
      </v-col>
    </v-row>
    <v-expansion-panels focusable v-for="item in baselines" :key="item.id">
      <v-expansion-panel>
        <v-expansion-panel-header>{{item[0].nombre_lb}} - {{item[0].nombre_proyecto}}</v-expansion-panel-header>
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
                <template v-for="subItem in item">
                  <tr>
                    <td>{{ subItem.prioridad }}</td>
                    <td>{{ subItem.estado }}</td>
                    <td>{{ subItem.descripcion }}</td>
                  </tr>
                </template>
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
export default {
  data() {
    return {
      baselines: [],
      showAlertError: false,
      showAlertSuccess: false,
      alertMsg: "",
    };
  },
  methods: {
    getBaselines() {
      LineaBaseService.listBaselines().then(
        (response) => {
          this.baselines = response.data;
        },
        (error) => {
          this.baselines =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.alertMsg = error.response.data.message;
          this.showAlertError = true;
        }
      );
    },
  },

  mounted() {
    this.getBaselines();
  },
};
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

