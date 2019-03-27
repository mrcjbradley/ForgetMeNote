import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <section className="splash-hero">
        <div className="row">
            <div className="content-container clearfix">
                <div className="cta">
                    <h1>Feel organized without the effort</h1>
                    <p>Evernote helps you capture and prioritize ideas, projects, and to-do lists, so nothing falls through the cracks.</p>
                    <Link to='/signup' className="btn"> Sign Up for Free </Link>
                </div>
                <div className="image">
                    {/* <img src="../../../../app/assets/images/homepage-hero-desktop.png" alt=""/> */}
                    <figure></figure>
                </div>
            </div>
       </div>
    </section>
)

