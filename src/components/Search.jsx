import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Movie from './Movie'

function Search(){
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [loading, isLoading] = useState(false)
    const [message, setMessage] = useState('Search for a movie!')
    const [placeholder, setPlaceholder] = useState('')

    var cancel = ''
    
    const randomMovie = () => {
        const movieArr = ['Star Wars', 'Harry Potter', 'Spider-Man', 'Ready Player One', 'Rocky', 'Jojo Rabbit', 'Avengers', 'Star Trek', 'Lord of the Rings', 'The Matrix', 'The Hobbit', 'Toy Story']
        return  movieArr[Math.floor(Math.random() * movieArr.length)]
    }

    const fetchMovies = (query) => {
        if(!query){
            let placeholderTemp = (localStorage.getItem('lastSearch') && localStorage.getItem('lastSearch').length !== 1) ? localStorage.getItem('lastSearch') : randomMovie()
            setPlaceholder(placeholderTemp)
            query = placeholderTemp
            localStorage.setItem('lastSearch', '')
        }else{
            localStorage.setItem('lastSearch', query)
        }
        const searchUrl  = `https://www.omdbapi.com/?i=tt3896198&apikey=7769270d&s=${query}&type=movie`
        if(cancel){
            cancel.cancel()
        }
        cancel = axios.CancelToken.source();

        axios.get(searchUrl, {cancelToken: cancel.token}).then(res => {
            setMessage( res.data.Response === "True" ? "Search a movie!" : "Didn't found any movies. Search again!")
            setResults(res.data.Search)
            isLoading(false)
        }).catch(err => {if(axios.isCancel(err) || err){isLoading(false); setMessage('Failed to fetch')}})
    }

    useEffect(() => {
        fetchMovies(query)
     }, [query]);


    function handleChange(event){
        const input = event.target.value
        isLoading(true)
        setMessage('')
        setQuery(input)
    }


    
    return(
        <div className="container">
            
            <div className="searchContainer">
                <i className="fa fa-search icon"> </i> 
                <input 
                    type="text"
                    value={query}
                    id="searchBar"
                    placeholder={placeholder}
                    onChange = {handleChange}
                />
            </div>
            <div className="movies">
                {loading ? <object type="image/svg+xml" data={process.env.PUBLIC_URL + "/load.svg"} className="loading">Loading...</object> : ""}
                {!results ? <p className="message">{message}</p> : results.map(movie => (
                   <Movie movie={movie} key={movie.imdbID} />
                ))}
            </div>
        </div>
    )
}

export default Search;