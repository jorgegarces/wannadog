import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import DogResult from '../DogResult'

export default withRouter(function ({ dogs, history }) {

    return <>
        <section className="navi">
            <Link className="navi__logo" to="/profile"><i className="fas fa-paw"></i></Link>
            <input className="navi__search" onClick={event => {
                event.preventDefault()
                history.push('/search')
            }}
                type="text" placeholder="Find your dog ..."></input>
        </section>
        <section className="noresults">
            {!dogs.length && <> <i className="noresults__sign fas fa-exclamation-triangle"></i>
                <h3 className="noresults__text">No dogs found</h3></>}
        </section>

        <section className="results">
            <ul className="results__ul">
                {dogs.map(dog => <li className="results__li"><DogResult dog={dog} /></li>)}
            </ul>
        </section>
    </>
})