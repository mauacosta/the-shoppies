import React, { useState, useEffect } from 'react'
import Nominee from './Nominee'

export default function Nominees(){

    const [movies, setMovies] = useState([])

    useEffect(() => {
        setMovies(JSON.parse(localStorage.getItem("nominees")))
     }, []);

    return(
        <div className="nominees">
            <h2>My nominees ({ movies ? movies.length : "0"}/5)</h2>
            {movies ? movies.map(movie => (
                <Nominee movie={movie} key={movie.imdbID} />)
            ) : ""}
        </div>
        
    )
}