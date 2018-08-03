import React from 'react';

import './NotFound.css';

const scooby = {
    name: 'Scooby-Doo',
    quote: 'Ruh Roh',
    cite: 'https://en.wikipedia.org/wiki/Scooby-Doo_(character)'
}

const shaggy = {
    name: 'Shaggy',
    quote: 'Zoinks',
    cite: 'http://scoobydoo.wikia.com/wiki/Shaggy_Rogers'
}

const velma = {
    name: 'Velma',
    quote: 'Jinkies',
    cite: 'https://en.wikipedia.org/wiki/Velma_Dinkley'
}

const daphne = {
    name: 'Daphne',
    quote: 'Jeepers',
    cite: 'https://en.wikipedia.org/wiki/Daphne_Blake'
}

const characters = [scooby, shaggy, velma, daphne];

const notFound = () => {

    const character = characters[Math.floor(Math.random()*characters.length)];

    return (
        <div className="NotFound-Root">
            <div className="NotFound-Error">404</div>
            <div className="NotFound-Quote">  
                <blockquote cite={character.cite}>  
                <p>{character.quote}</p>
                </blockquote>
            </div>
            
            <div className="NotFound-Attribution"> 
                <p className="NotFound-Author">  
                {character.name}
                </p>
                <cite>  
                <a href="https://en.wikipedia.org/wiki/Scooby-Doo">Scooby-Doo</a>
                </cite>
            </div>        
        </div>
    );

};

export default notFound;