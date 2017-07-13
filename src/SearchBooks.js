import React ,{Component}from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'


class SearchBooks extends  Component {

    state  = {
        query: '',
        searchResults: []
    }

    onSearch(value) {
        if (value !== '')
            this.setState({query:value},this.updateResults(value))
    }

    updateResults(value) {
        BooksAPI.search(value,999).then( books => {
                this.setState({searchResults:
                    books.map(bookResult =>{
                        let bookMatched = this.props.books.find( book => book.id===bookResult.id)
                        bookResult.shelf= bookMatched? bookMatched.shelf : 'none'
                        return bookResult
                    })
                })
        }).catch(_=> this.setState({searchResults: []}))
    }


    render() {
        let searchResults = this.state.searchResults
        if (this.state.searchResults !== undefined ) {
                    searchResults.map(bookResult => {
                        let bookMatched = this.props.books.find(book => book.id === bookResult.id)
                        bookResult.shelf = bookMatched ? bookMatched.shelf : 'none'
                        return bookResult;
                    }
            )
        }
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
                                   onUpdateShelf={(book,shelf)=>{this.props.onUpdateShelf(book,shelf)}}
                        />
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks




