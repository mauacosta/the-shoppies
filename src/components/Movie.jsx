import React, { useState, useEffect } from 'react';

export default function Movie({movie}){

    const [nominated, isNominated] = useState(false)

    function sendNotification(text){
        let page = document.getElementsByTagName("body")[0]
        let notification = document.createElement('p')
        notification.className = "notification"
        notification.innerHTML = text
        page.appendChild(notification)
        setTimeout( () => {page.removeChild(notification)}, 6000);
    }

    function refreshPage() {
        window.location.reload(false);
      }

    const nominate = () => {
        let nominees = JSON.parse(localStorage.getItem("nominees"))

        if(!nominees){
            localStorage.setItem('nominees', JSON.stringify([]))
            nominees = JSON.parse(localStorage.getItem("nominees"))
        }

        if(nominees.length >= 5){
            sendNotification('You can nominate only 5 movies.')

        }
        else if(nominated){
            sendNotification('You already nominated this film.')
        }
        else{
            nominees.push(movie)
            localStorage.setItem('nominees', JSON.stringify(nominees))
            refreshPage()
        }
    }


    useEffect (() =>{
        let nominees = JSON.parse(localStorage.getItem("nominees"))
        let i = 0
        let found = false
        while (nominees.length > i && !found){
            if(nominees[i].imdbID === movie.imdbID){
                found = true
                isNominated(true)
            }
            i++;
        }
        if(JSON.parse(localStorage.getItem("nominees")).length == 5){
            sendNotification('Great job! You nominated 5 movies.')
        }
    })

    return(
        <div className="movieCard">
            <img className={nominated ? "disabled" : "enabled"} src={(!movie.Poster || movie.Poster === "N/A") ? '/img/noImage.png' :  movie.Poster} alt={`${movie.Title} poster`}/>
            <h5>{movie.Title}</h5>
            <p>{movie.Year}</p>
            <button className={nominated ? "disabled" : "enabled"} onClick={nominate}> {nominated ? "Nominated" : "Nominate"}</button>
            <a href={`https://www.imdb.com/title/${movie.imdbID}/`} target="_blank" rel="noopener noreferrer">Check on IMDB</a>
        </div>
    )
}