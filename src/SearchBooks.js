import React ,{Component}from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


class SearchBooks extends  Component {
    state  = {
        query: '',
        books: []
    }

    onSearch(value) {
        this.setState({query:value})
        this.updateResults()
    }

    updateResults() {
        BooksAPI.search(this.state.query,999).then( books =>{
            this.setState({books:books})
        })

    }

    render() {
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            value={this.state.query} onChange={event => this.onSearch(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        <BookShelf books={this.state.books}/>
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks




