<template>
  <v-app>
    <v-app-bar color="white" flat fixed app height="80px" class="pa-0">
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container class="pa-0 main-container">
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      title: "Chat bots 2.0"
    };
  }
};
</script>

<style lang="scss">
.v-toolbar__content {
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  @media (min-width: 960px) {
    max-width: 900px;
  }
  @media (min-width: 1264px) {
    max-width: 1185px;
  }
  @media (min-width: 1904px) {
    max-width: 1785px;
  }
}
main {
  background-color: #586670;
  .v-main__wrap {
    padding-top: 20px;
    padding-bottom: 50px;
  }
  .main-container {
    height: 100%;
  }
}
</style>
