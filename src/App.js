import React from 'react'
import {Route, Link} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then( books =>{
        this.setState({books})
    })
  }

  render() {
    return (
      <div className="app">
          <Route path="/search" component={SearchBooks} />
          <Route exact path="/" render={()=> (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf shelfName="Currently Reading"
                        books={this.state.books.filter( b => b.shelf ==="currentlyReading" )}
                    />
                    <BookShelf shelfName="Want To Read"
                        books={this.state.books.filter( b => b.shelf ==="wantToRead" )}
                    />
                    <BookShelf shelfName="Read"
                        books={this.state.books.filter( b => b.shelf ==="read" )}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            )}
          />
      </div>
    )
  }
}

export default BooksApp
