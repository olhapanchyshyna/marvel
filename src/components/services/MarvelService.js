class MarvelService{

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=f5cbf45f1000f39e41452ae6f7e61509';

    getData = async (url) =>{
        const res = await fetch(url);
    
        if(!res.ok){
            throw new Error(`Could not fetch ${url}, status ${res.status} `);
        }
        return await res.json();
    }

    getAllCharasters = async() => {
        const res = await this.getData(`${this._apiBase}characters?limit=9&offset=220&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharaster = async (id) => {
        const res = await this.getData(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        let descr = '';
    
        if(char.description.length > 1 && char.description.length < 200){
            descr = char.description;
        }else if(char.description.length === 0){
            descr = 'Data is empty';
        }else if(char.description.length > 200){
            descr = char.description.substring(0, 200) + '...';
        }
        
        return{
            name: char.name,
            descr: descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}
export default MarvelService;