<script>
export default {
  data: () => ({
    drawer: true,
    name: "Live Store Story",
    value: 1,
    items: [
      {
        title: "Home",
        icon: "mdi-home",
        to: "/",
      },
      {
        title: "Item Management",
        icon: "mdi-star",
        to: "/inventory",
      },
    ],
  }),
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
  },
};
</script>
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" v-if="!$vuetify.display.mobile" permanent>
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="navigateTo(item.to)"
          :prepend-icon="item.icon"
          :title="item.title"
        />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="warning" prominent elevation="0">
      <v-app-bar-nav-icon
        v-if="!$vuetify.display.mobile"
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>{{ name }}</v-app-bar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
    <v-bottom-navigation v-model="value" color="warning" grow  v-if="$vuetify.display.mobile">
      <v-btn
        v-for="navigation in items"
        :key="navigation.title"
        @click="navigateTo(navigation.to)"
      >
        <v-icon :icon="navigation.icon" />
        {{ navigation.title }}
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
