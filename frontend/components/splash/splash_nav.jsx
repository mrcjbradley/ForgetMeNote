import React from 'react';
import { Link } from 'react-router-dom';
export default () => (
    <nav class="splash-nav top-level-nav">
        
        <ul class="">
            <li><Link to="#">PLAN</Link></li>
            <li><Link to='#'>FEATURES</Link></li>
            <li><Link to='#'>HELP & LEARNING</Link></li>
            <li><Link to='#'>ABOUT US</Link></li>
        </ul>
    </nav>
);