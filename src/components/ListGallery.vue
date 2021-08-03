<template>
  <div class="gallery">
    <div
      @drop.prevent="addNew"
      @dragenter.prevent="enterTrue"
      @dragleave.prevent="enterFalse"
      class="gallery__container container"
      :class="{ arear_drop: dragInput }"
      
    >
      <transition-group class="gallery__container container" name="list">
        <div
          v-for="item in getGallery"
          :key="item.id"
          class="gallery__card list-item"
          :class="{ interlayer: dragInput }"
          
        >
          <div class="del-gallery" @click.prevent="delElem(item)">
            <img src="@/assets/img/del11.png" alt="" />
          </div>
          <div class="text-gallery">
            <div class="text__content-gallery">
              {{ item.name }}
            </div>
          </div>

          <div class="placeholder"  :class="{ disNoneMe: viewPlace[item.id] }">
            <div class="animated-background"></div>
          </div>
          <img  
            loading="lazy"
            :src="item.url"
            alt=""
            @load="onImgLoad(item)"
            class="card-gallery__img"
          />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  document.body.addEventListener(eventName, preventDefaults, false);
});

import { mapMutations, mapGetters} from "vuex";
export default {
  name: "ListGallery",
  data() {
    return {
      dragInput: false, 
      newgallery: this.getGallery,
      falseElem:true,
      viewPlace:[],
      letope1:'block', 
    };
  },
  methods: {
    ...mapMutations({
      setData: "galleryData/set",
    }),

    onImgLoad(item){ 
      this.viewPlace[item.id]  = true   
      this.$forceUpdate(); 
     
    },
    // Вкл/Выкл класса области drag & drop
    enterTrue() {
      this.dragInput = true;
    },
    enterFalse() {
      this.dragInput = false;
    },

    // Добавление нового изображения
    addNew(event) {
      this.dragInput = false;

      let dt = event.dataTransfer;
      let files = dt.files;
      let newArray = this.getGallery;
      let newFiles = Array.from(files);
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          if (ev.target.result.split("/")[0] == "data:image") {
            let newData = {
              url: ev.target.result,
              name: file.name,
              id:
                Date.now() +
                Math.trunc(Math.floor(Math.random() * 10000)) +
                Math.trunc(Math.floor(Math.random() * 10000)),
            };

            newArray.push(newData);
          }
        };
        reader.readAsDataURL(file);
      });
    },

    // Удаление изображения
    delElem(elem) { 
      let newArray = this.getGallery;
      newArray = newArray.filter((item) => item.id != elem.id);

      this.setData({ type: "galleryImages", value: newArray });
    },
  },

  computed: {
    ...mapGetters({
      getGallery: "galleryData/getGallery",
    }),
 
     showResults: function () {
      //  let newArray =  
      let ths = this;
      return function(elem){ 

        if( ths.getGallery.includes(elem)){
          return false
        }else{
          return true
        }
 
      }
      
     },

     myplaceHold:function(){
       return function(item){
         return this.viewPlace[item.id]
       }
     }
 
  },
};
</script>

<style scoped lang="scss">
.placeholder {
  margin: 0 auto;
  width: 200px;
  height: 100px;
  min-height: 100%;
  background-color: #eee;
  position: relative;
  background-image: none;
}

.disNoneMe{
  display: none;
}
 

.animated-background {
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: darkgray;
  background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);
  background-size: 800px 104px;
  height: 100px;
  position: relative;
}

.animated-background {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
}

@keyframes placeHolderShimmer {
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
}

* {
  margin: 0;
  padding: 0;
  font-family: "Ubuntu";
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active {
  transition: all 0.2s;
}
.list-leave-active {
  transition: all 0.2s;
}
.list-enter {
  opacity: 0;
  transform: translateY(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.card {
  transition: all 0.5s;
}
.card-enter {
  opacity: 0;
  transform: scale(0);
}
.card-leave-to {
  opacity: 0;
  transform: scale(0);
}
.card-enter-to {
  opacity: 1;
  transform: scale(1);
}
.card-move {
  opacity: 1;
  transition: all 0.5s;
}
.container {
  max-width: 860px;
  margin: 0 auto;
}
.gallery__container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-height: 50px;
}
.card-gallery__img {
  object-fit: cover;
  width: 200px;
  max-height: 250px;
  min-height: 100%;
}
.interlayer {
  pointer-events: none;
}
.gallery__card {
  margin: 5px;
  float: left;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    .del-gallery {
      opacity: 1;
    }
    .text-gallery {
      opacity: 1;
    }
  }
}
.del-gallery {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 20px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;
  img {
    background-color: rgba(255, 255, 255, 0.87);
    border-radius: 5px;
    max-width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: cover;
  }
}
.text-gallery {
  position: absolute;
  bottom: 0px;
  color: rgba(255, 255, 255, 0.808);
  background-color: rgba(0, 0, 0, 0.288);
  padding: 5px;
  width: 100%;
  opacity: 0;
}
.text__content-gallery {
  max-width: 90%;
  text-overflow: ellipsis;
  overflow: hidden;
  margin: 0 auto;
  font-size: 14px;
}
.arear_drop {
  quotes: "<" 2321 ">";
  outline: 3px dotted;
  z-index: 100;
  position: relative;
  background: #008cff15;
  z-index: 10;
  &:before {
    position: absolute;
    color: white;
    background-color: rgb(90, 90, 90);
    border-radius: 5px;
    padding: 30px;
    content: "Перетащите изображение";
    z-index: 2;
    top: 50%;
    transform: translateY(-50%);
  }
}
@media (max-width: 770px) {
  .del-gallery {
    opacity: 1;
  }
  .text-gallery {
    opacity: 1;
  }
}
@media (max-width: 500px) {
  .card-gallery__img {
    max-width: 270px;
  }
}
</style>
