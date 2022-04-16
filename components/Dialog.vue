<template>
  <v-dialog v-model="dialog" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <img :src="image" class="mb-3 mr-3 small-img" v-bind="attrs" v-on="on" />
    </template>

    <v-card colored-border color="orange" class="ma-0 pa-0">
      <img :src="image" class="dialog-img" v-bind="attrs" v-on="on" />
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
  }),
  props: {
    image: String,
  },
};
</script>

<style lang="scss" scoped>
.small-img {
  width: 100px;
  height: 100px;
  border-radius: 1rem;
}
.dialog-img {
  width: 100%;
  height: 100%;
}
</style>
