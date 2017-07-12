import React,{Component} from 'react'

class BookShelf extends Component {



    render(){
        const { onUpdateShelf} = this.props;
        return(
            <div className="bookshelf">
                {this.props.shelfName &&(
                       <h2 className="bookshelf-title">
                           {this.props.shelfName}
                       </h2>
                    )
                }
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {(this.props.books !== undefined && this.props.books.length > 0) ? (this.props.books.map(b=>
                        <li key={b.id} >
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${b.imageLinks && b.imageLinks.thumbnail})`  }}></div>
                                    <div className="book-shelf-changer">
                                        <select value={b.shelf} onChange={ event => onUpdateShelf(b,event.target.value) }>
                                            <option value="none" disabled>Move to...</option>
                                            <option value="currentlyReading">Currently Reading</option>
                                            <option value="wantToRead">Want to Read</option>
                                            <option value="read">Read</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="book-title">{b.title} {b.id} {b.shelf}</div>
                                <div className="book-authors">{b.authors && b.authors[0]}</div>
                            </div>
                        </li>
                        )) : <h2>empty</h2>}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf