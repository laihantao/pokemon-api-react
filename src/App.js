import React, { useEffect, useState } from 'react'
import Pokemondetails from './components/pokemons'
import pokemonmusic from "./pokemonmusic.mp3"


const App = () => {

   const [allPokemons, setAllPokemons] = useState([])
   const [loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=20')

   const [searchword, setSearchword] = useState("");

   //////////// Music play and pause ////////////
   const myAudio = new Audio(pokemonmusic)
   var isPlaying = false;

   function togglePlay() {
    if (isPlaying) {
      myAudio.pause()
    } else {
      myAudio.play();
    }
  };

    myAudio.onplaying = function() {
      isPlaying = true;
    };
    myAudio.onpause = function() {
      isPlaying = false;
    };

    //////////// Music play and pause ////////////

    //---------------------------------------------------------//

    //////////// Search function ////////////

   const filteredpokemon = allPokemons.filter((pokemonStats) =>{
    return pokemonStats.name.toLowerCase().includes(searchword.toLowerCase());

  });

    //////////// Search function ////////////

    //---------------------------------------------------------//


  const getAllPokemons = async () => { //means one simple thing: a function always returns a promise
    const res = await fetch(loadMore)
    const data = await res.json()
    
    var arrayLength = data.results.length;
    const testing = [];
    // var testres = [];

    for (var i = 0; i < arrayLength; i++) {
        // console.log('Hello world' + i)
        // console.log('This is ' + i + ' pokemon' + ', it is '+ data.results[i].name)
        // console.log('The url of its is '+ data.results[i].url)
        testing.push(data.results[i].name) // append data into 'testing' and loop the append 


    }

    // console.log('The second appended array here')
    // testres.push(testing)
    // console.log(testres)
    // console.log('The second appended array here')

    // console.log('The first data fetching below')
    // console.log(testing.length)
    // console.log('The first data fetching above')

    setLoadMore(data.next)

    var testinglength = testing.length;

    for (var a = 0; a < testinglength; a++){
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/`+ testing[a]) /* fetch the pokemon data by loading each of the current 20pokemon name into the pokemon.name */
      const data = await res.json()
      // console.log('The first data fetching below')
      // console.log(res)
      // console.log('The first data fetching above')
      setAllPokemons( currentList => [...currentList, data])
    }



    // await console.log(data.results)  //makes JavaScript wait until that promise settles and returns its result.
    // await console.log('Below is resjson')
    // // await console.log(pokemon.name)
    // await console.log('Below is allPokemons')
    // await console.log(allPokemons)
    // await console.log('End of results')
   
  }

 useEffect(() => {
  getAllPokemons()
 }, [])

 var m = 0, imgs = ["https://images2.alphacoders.com/208/thumb-1920-208492.jpg","https://images.hdqwalls.com/wallpapers/pokemon-mystery-dungeon-4k-xc.jpg"];

 function changeDivImage()
 {
     document.body.style.backgroundImage = "url(" + imgs[m] + ")";
     m = (m + 1) % imgs.length;
 }


 return (
  <div className='title-other'>
    
    <div className='start-pause'>

      <h1 className='title'>Pokédex</h1>

      <input type="text" className='searching' placeholder="Search for pokemon..." 
          onChange= {(event) => setSearchword(event.target.value)}>
      </input>
      
      <input type='image' className='myimage' loop src='https://icon-library.com/images/icon-music-note/icon-music-note-20.jpg' onClick={togglePlay}/>
      
      <input type="checkbox" className='togglebackground' onClick={changeDivImage} ></input>


      
    </div>

  <div className="app-container">


    <div className="pokemon-container">

      <div className="all-container">

        {filteredpokemon.map( (pokemonStats, index) => 
          <Pokemondetails
            key={index}
            id={pokemonStats.id}
            image={pokemonStats.sprites.other.dream_world.front_default}
            name={pokemonStats.name[0].toUpperCase()+pokemonStats.name.substring(1)}
            type={pokemonStats.types[0].type.name}
          />)}
        
      </div>

        <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>

    </div>
      <div className='projectname'>
          © Tao project 2022
      </div>
    </div>
  </div>
);
}



export default App;


{/* <h1>Pokédex</h1>
<button onClick={start} autoplay loop>Play</button>
<button onClick={pause} >Pause</button> */}

// return (
//   <div className="app-container">
//     <h1>Pokédex</h1>
//     <button onClick={start} autoplay loop>Play</button>
//     <button onClick={pause} >Pause</button>
//     <div className="pokemon-container">
//       <div className="all-container">
      
//         {allPokemons.map((pokemoninfo,index) => 
//           <Pokemondetails
//             indexNo={pokemoninfo.index}
//             id={pokemoninfo.id}
//             image={pokemoninfo.sprites.other.dream_world.front_default}
//             name={pokemoninfo.name}
//             type={pokemoninfo.types[0].type.name}
//           />)}

//       </div>
//         <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
//     </div>
//   </div>
// );