<template>
  <div @drop.prevent="addNew" class="form__images">
    <div class="container">
      <form
        action="#"
        @dragenter.prevent="enterTrue"
        @dragleave.prevent="enterFalse"
        class="add_image"
        :class="{ arear_drop: dragInput }"
      >
        <input
          type="text"
          v-model="inputImage"
          class="input_img"
          placeholder="Введите URL картинки"
          :class="{ interlayer: dragInput }"
        />
        <button
          @click.prevent="addImage"
          class="btn__add-img"
          :class="{ interlayer: dragInput }"
        >
          ЗАГРУЗИТЬ
        </button>
      </form>
    </div>
  </div>
</template>

<script>
function preventDefaults(e) {
  e.stopPropagation();
  e.preventDefault();
}

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  document.body.addEventListener(eventName, preventDefaults, false);
});

import { mapActions, mapMutations, mapGetters, mapState } from "vuex";

export default {
  name: "InputGallery",
  data() {
    return {
      inputImage: "",
      dragInput: false,
    };
  },
  methods: {
    ...mapActions({
      fetchImages: "galleryData/fetchImages",
    }),
    ...mapMutations({
      setData: "galleryData/set",
    }),

    // Вкл/Выкл класса области drag & drop
    enterTrue() {
      this.dragInput = true;
    },
    enterFalse() {
      this.dragInput = false;
    },

    // Добавление нового изображения (на drop по области)
    addNew(event) {
      this.dragInput = false;

      // здесь делать запрос fetch

      let dt = event.dataTransfer;
      let files = dt.files;
      let newArray = this.getGallery;
      let newFiles = Array.from(files);
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target.result.split(";")[0] == "data:application/json") {
            return fetch(`${ev.target.result}`)
              .then((response) => response.json())
              .then((json) => {
                for (let i = 0; i < json.galleryImages.length; i++) {
                  let item = json.galleryImages[i];

                  let newData = {
                    url: item.url,
                    name: String(item.url.split("/").slice(-1)),
                    id:
                      Date.now() +
                      Math.trunc(Math.floor(Math.random() * 10000)) +
                      Math.trunc(Math.floor(Math.random() * 10000)),
                  };

                  newArray.push(newData);
                }
              });
          }
        };
        reader.readAsDataURL(file);
      });
    },

    // Добавление нового изображения (по ссылке в input)
    addImage() {
      if (!this.inputImage) {
        return;
      }

      let newArray = this.getGallery;

      let newData = {
        url: this.inputImage,
        name: String(this.inputImage.split("/").slice(-1)),
        id:
          Date.now() +
          Math.trunc(Math.floor(Math.random() * 10000)) +
          Math.trunc(Math.floor(Math.random() * 10000)),
      };

      newArray.push(newData);
      this.inputImage = "";

      this.setData("set", { type: "galleryImages", value: newArray });
    },
  },
  computed: {
    ...mapGetters({
      getGallery: "galleryData/getGallery",
    }),
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: "Ubuntu";
}
.container {
  max-width: 860px;
  margin: 0 auto;
}
.gallery__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.add_image {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 25px;
}
.arear_drop {
  outline: 3px dotted;
  z-index: 100;
  position: relative;
  background: #008cff15;
  &:before {
    position: absolute;
    color: white;
    background-color: rgb(90, 90, 90);
    border-radius: 5px;
    padding: 30px;
    content: "Перетащите JSON файл";
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
  }
}
.input_img {
  padding: 15px;
  height: 100%;
  margin-right: 10px;
}
.interlayer {
  pointer-events: none;
}
.btn__add-img {
  margin: 10px 0px;
  background-color: #15f077;
  border: none;
  border-radius: 5px;
  padding: 15px;
  font-weight: 700;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  &:active {
    transform: translateY(5px);
  }
}

// -----------------------------------------
</style>
