<template>
  <v-app>
    <header>
      <v-app-bar color="#FFA500" app dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>FoodManagement</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" fixed temporary>
        <v-list nav dense>
          <v-list-item-group>
            <router-link to="/">
              <v-list-item>
                <v-list-item-title> Home</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link to="/graph">
              <v-list-item>
                <v-list-item-title>Graph</v-list-item-title>
              </v-list-item></router-link
            >
            <router-link to="/calendar">
              <v-list-item>
                <v-list-item-title>Calendar</v-list-item-title>
              </v-list-item></router-link
            >
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </header>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  drawer = false;
}
</script>
