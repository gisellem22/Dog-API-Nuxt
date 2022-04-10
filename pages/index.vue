<template>
  <div>
    <v-container fluid>
      <div class="d-flex flex-column align-center w-100">
        <h1 class="text-center pt-6">{{breedName||'Dogs API Project'}}</h1>
        <div class="px-2 pt-6 w-100 dogs-card">
          <v-select
            v-model="breedSelected"
            :items="breedsList"
            item-text="breed"
            label="Razas"
            prepend-icon="mdi-dog"
            return-object
            dense
            filled
            rounded
          ></v-select>
          <v-select
            v-model="subBreedSelected"
            :items="subBreedList"
            label="Sub-raza"
            :prepend-icon="
              subBreedList.length === 0 ? 'mdi-dog-side-off' : 'mdi-dog-side'
            "
            :disabled="subBreedList.length === 0"
            dense
            filled
            rounded
          ></v-select>
        </div>
        <v-row class="pa-0 ma-0">
          <v-col
            v-for="(image, index) in filteredImageList"
            :key="`item${index}`"
          >
            <v-card class="mx-auto" max-width="374">
              <v-img height="250" :src="image"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "IndexPage",
  components: {},
  data: () => ({
    breedName:"",
    breed: "",
    breedsList: [],
    breedSelected: null,
    subBreedList: [],
    subBreedSelected: null,
    imagelist: [],
    filteredImageList: [],
  }),
  //
  watch: {
    breedSelected(val) {
      this.breed = val.breed;
      this.breedName= this.breed;
      this.subBreedList = val.subBreed;
      this.getImages();
    },
    subBreedSelected(val) {
      const subBreed = `${this.breed}-${val}`;
      this.breedName = subBreed;
      this.filteredImageList = this.imagelist.filter(
        (image) => image.indexOf(subBreed) === 30
      );
    },
    imagelist(val) {
      this.filteredImageList = this.subBreedList.length === 0 ? this.imagelist : [];
    },
    filteredImageList(val) {
    },
  },
  methods: {
    async getDogs() {
      const res = await this.$getDogs();
      if (!res.error) {
        this.setBreedList(res);
      }
    },
    async getImages() {
      const res = await this.$getImages(this.breed);
      if (!res.error) {
        this.imagelist = res;
      }
    },
    setBreedList(dogs) {
      this.breedsList = Object.keys(dogs).map((key) => {
        return { breed: key, subBreed: dogs[key] };
      });
    },
  },
  mounted() {
    this.getDogs();
  },
};
</script>

<style lang="scss" scoped>
// styles
.w-100 {
  width: 100% !important;
}
.dogs-card {
  max-width: 400px;
}
</style>
