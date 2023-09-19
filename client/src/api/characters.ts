import axios from './config/axios'

export const getCharacters = async (page: number) => {
  try {
        const result = await axios.get(`characters/${page}`)
        return result.data
  } catch(e){
        return e
  }
}

export const getFilms = (urls: string[])=>{

    const fetchfilm = async (URL: string) => {
      return axios
        .get(URL)
        .then(function(response) {
          return {
            success: true,
            data: response.data
          };
        })
        .catch(function(error) {
          return { success: false };
        });
    }

    try {
      return  Promise.all(urls.map(fetchfilm));
    } catch(e){
      return e
    }
}

