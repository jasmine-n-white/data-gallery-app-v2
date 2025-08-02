import React, { useState, useEffect } from 'react'
import './Home.css'

const slideshowImages = [
 'https://www.gamespot.com/a/uploads/original/1578/15787979/3257787-4892572735-C4oVA.jpg',
 'https://nintendosoup.com/wp-content/uploads/2018/12/guardian-zeldabreathofthewild-dec292018.jpg',
 'https://miro.medium.com/v2/resize:fit:3120/1*G3Di-m1JW4QZ662rY8bd-g.jpeg',
 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/zelda-breath-of-the-wild-korok-seed.jpg'
];

function Home() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const fadeTimeout = setTimeout(() => setFade(false), 4000);
    const slideTimeout = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % slideshowImages.length);
      setFade(true);
    }, 5000);
    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(slideTimeout);
    };
  }, [current]);

  return (
    <>
      <div className="slideshow-container">
        {slideshowImages.map((img, idx) => (
          <img
            key={img}
            src={img}
            alt="Breath of the Wild screenshot"
            className={`slideshow-image${idx === current ? ' active' : ''}${fade && idx === current ? ' fade' : ''}`}
            style={{ display: idx === current ? 'block' : 'none' }}
          />
        ))}
      </div>
      <div className="home-intro">
        <h1>Welcome to the Breath of the Wild Data Gallery!</h1>
        <p>
          Explore the vast world of Hyrule through a beautifully organized collection of monsters, treasures, materials, and wildlife. Search, browse, and discover detailed information and images for every entry, all inspired by The Legend of Zelda: Breath of the Wild. Whether you’re a dedicated adventurer or a curious newcomer, this gallery is your ultimate companion for exploring the wonders and secrets of the game.
        </p>
      </div>
    </>
  )
}

export default Home