export const galleryData = {
  state: () => ({
    galleryImages: [],
    boolWin: false,
  }),
  getters: {
    getGallery: (state) => {
      return state.galleryImages;
    },
  },
  mutations: {
    set(state, { type, value }) {
      return (state[type] = value);
    },
    
  },
  actions: {
   

    async fetchImages({ state, commit },url) {
     
      try {
        let response = await fetch(url);
        let dataResponse = await response.json(); 

        let newArray = state.galleryImages 
        for (let i = 0; i < dataResponse.galleryImages.length; i++) {  
          let item = dataResponse.galleryImages[i]
          let newData = {
            "url" : item.url,
            "name" : String(item.url.split('/').slice(-1)),
            "id": Date.now() + Math.trunc( Math.floor(Math.random() * 10000))+ Math.trunc( Math.floor(Math.random() * 10000))
          }
          newArray.push(newData) 
        } 

        commit('set',{type:'galleryImages', value:newArray} ); 
      } catch (e) {
        console.error(e);
      }
  },

     
  },
  namespaced: true,
};
