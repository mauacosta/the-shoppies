import React from 'react'

export default function Nominee({movie}){

    function refreshPage() {
        window.location.reload(false);
      }

    const unnominate = () => {
        let nominees = JSON.parse(localStorage.getItem("nominees"))
        let i = 0
        let found = false
        while (nominees.length > i && !found){
            if(nominees[i].imdbID === movie.imdbID){
                found = true
                nominees.splice(i,1)
                localStorage.setItem('nominees', JSON.stringify(nominees))
                refreshPage()
            }
            i++;
        }
        console.log("Problem")
    }

    return(
        <div className="nomineeMovie"> 
            <img src={(!movie.Poster || movie.Poster === "N/A") ? '/img/noImage.png' :  movie.Poster} alt={`${movie.Title} poster`}/>
            <div className="info">
                <h5>{movie.Title}</h5>
                <p>{movie.Year}</p>
                <button onClick = {unnominate}>Unnominate</button>
            </div>
        </div>
    )
}