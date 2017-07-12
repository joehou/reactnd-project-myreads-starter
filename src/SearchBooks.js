import React ,{Component}from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


class SearchBooks extends  Component {
    state  = {
        query: '',
        SearchResults: [],
    }

    onSearch(value) {
        if (value !== '')
            this.setState({query:value},this.updateResults(value))
    }

    updateResults(value) {
        BooksAPI.search(value,999).then( books => {
            if (books !== undefined && books.length > 0) {
                this.setState({
                    searchResults: books.map(book =>{
                        book.shelf = 'none'
                        return book
                    })
                })
            }
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
                        <BookShelf books={this.state.searchResults}
                                   onUpdateShelf={this.props.onUpdateShelf.bind(this)}
                        />
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks




