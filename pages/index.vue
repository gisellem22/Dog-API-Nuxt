<template>
  <div>
    <v-container fluid>
      <div class="d-flex flex-column align-center w-100">
        <h1 class="dog-title text-center pt-6 text-capitalize">
          Dog Breeds Library
        </h1>
        <div class="px-0 pt-6 w-100 dogs-selects">
          <v-select
            v-model="breedSelected"
            :items="breedsList"
            item-text="breed"
            label="Breed"
            prepend-icon="mdi-dog"
            return-object
            solo-inverted
            rounded
            filled
          ></v-select>
          <v-select
            v-model="subBreedSelected"
            :items="subBreedList"
            label="Types"
            :prepend-icon="
              subBreedList.length === 0 ? 'mdi-dog-side-off' : 'mdi-dog-side'
            "
            :disabled="subBreedList.length === 0"
            small-chips
            multiple
            solo-inverted
            filled
            rounded
            :menu-props="{ top: false, offsetY: true }"
          ></v-select>
        </div>
        <div class="logo pt-10 pt-sm-0" v-if="filteredImageList.length === 0">
          <Logo></Logo>
        </div>
        <v-row class="pa-0 ma-0">
          <v-col
            v-for="(breeds, index) in filteredImageList.slice().reverse()"
            :key="`list${index}`"
          >
            <v-alert
              style="width: 100%; min-width: 300px"
              border="top"
              colored-border
              color="orange"
              elevation="2"
              class="w-100 d-flex flex-wrap justify-center"
            >
              <v-row class="ma-0 pa-0">
                <v-col cols="12">
                  <h1 class="dog-title text-center py-3 text-capitalize">
                    {{ breeds.breedName }}
                  </h1>
                </v-col>
                <v-col cols="12" class="d-flex flex-wrap justify-center">
                  <img
                    v-for="(image, i) in breeds.list"
                    :key="`item${i}`"
                    :src="image"
                    class="mb-3 mr-3 small-img"
                  />
                </v-col>
              </v-row>
            </v-alert>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";

export default {
  components: { Logo },
  data: () => ({
    breedName: "",
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
      this.breedName = this.breed;
      this.subBreedList = val.subBreed;
      this.getImages();
      this.subBreedSelected = null;
    },
    subBreedSelected(val) {
      if (val) {
        const res = val.map((el) => `${this.breed}-${el}`);
        this.filteredImageList = res.map((subBreed) => {
          const list = this.imagelist.filter(
            (image) => image.indexOf(subBreed) === 30
          );
          return {
            breedName: subBreed.replace("-", " "),
            list: list.length >= 20 ? list.splice(0, 20) : list,
          };
        });
      }
    },
    imagelist() {
      this.filteredImageList =
        this.subBreedList.length === 0
          ? [
              {
                breedName: this.breedName,
                list: this.imagelist,
              },
            ]
          : [];
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
  color: #ffb347;
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
.small-img {
  width: 100px;
  height: 100px;
  border-radius: 1rem;
}
</style>
