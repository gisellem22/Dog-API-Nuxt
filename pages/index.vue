<template>
  <div>
    <v-container fluid>
      <div class="d-flex flex-column align-center w-100">
        <h1 class="dog-title text-center pt-6">{{breedName||'Dogs API Project'}}</h1>
        <div class="px-0 pt-6 w-100 dogs-selects">
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
        <div class="logo pt-10 pt-sm-0" v-if="filteredImageList.length ===0">
          <Logo></Logo>
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
import Logo from "../components/Logo.vue";

export default {
  name: "IndexPage",
  components: {Logo},
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
.dog-title {
  color: #FFB347
}
.w-100 {
  width: 100% !important;
}
.dogs-selects {
  max-width: 400px;
    position: relative;
    z-index: 3;

}

.logo {
  margin-top: 8rem;
  position: absolute;
    z-index: 2;
}
</style>
