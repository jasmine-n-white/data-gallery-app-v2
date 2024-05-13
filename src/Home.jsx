import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function Home() {
    const [creatures, setCreatures] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/creatures");

                const data = await response.json();
                 setCreatures(data?.data);
                console.log(creatures);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setErrorMessage("Error! Could not fetch data.");
            }
        };
        fetchData();
    }, []);

      
     const searchCreatures = (searchValue) => {
        setSearch(searchValue);
        if (search) {
            const filteredCreatures = creatures.filter(
                (creature) => {
                     return creature.name.toLowerCase().includes(search.toLowerCase());
                 })
            setFilteredData(filteredCreatures);      
        } else {
            setFilteredData(creatures);
        }
     } 
    
     const clearSearch = (event) => {
        setSearch("");
     }

    if (isLoading) {
        return (
            <>
            <div className="loadingKorok">
                <img src="https://media4.giphy.com/media/HELXpLO4oti6xOWFAB/giphy.gif?cid=6c09b952xr5h7f57w4un5yc1hod1slxc6vc90qz2hqe5741b&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"/>
                <p>Loading...</p>
            </div>
            
            </>
        )
    } else {
   let row = creatures?.map((creature)=> (
    <Link key={creature.id} to={`entry/${creature.id}`} className="link">
        <div className="cell">
        <img src={creature.image} alt=""/>
        <h3>{creature.name.toUpperCase()}</h3>
        </div>
    </Link>
   ))
    return (
        <>
        <p>{errorMessage}</p>
        <div className="mainPage">
            <h1>WILDLIFE</h1>
            <p>Step into the captivating world of Breath of the Wild, where the vast landscapes of Hyrule are alive with a stunning array of wildlife waiting to be discovered. Our data gallery offers a comprehensive exploration of the diverse ecosystems that thrive within this iconic realm. From the serene beauty of the Great Plateau to the untamed wilderness of the Gerudo Desert, each region is home to its own unique inhabitants. Whether you're a seasoned adventurer seeking to catalog every species or simply a curious observer fascinated by the wonders of nature, our data gallery provides an immersive experience that celebrates the rich biodiversity of Breath of the Wild's world. </p>
        </div>
        <div className ="searchBar" >
            <input type="text" placeholder="Search by Name..." onChange={(e) => searchCreatures(e.target.value)} value={search}/>
            <button type="submit" onClick={clearSearch}>Clear</button>
        </div>
        {search.length > 0 ? (
            filteredData.map((creature) => {
                return (
                    <div className="filteredGallery">
                        <Link key={creature.id} to={`entry/${creature.id}`} className="link">
                            <div className="cell">
                            <img src={creature.image} alt=""/>
                            <h3>{creature.name.toUpperCase()}</h3>
                            </div>
                        </Link>
                    </div>
                    
                )
        })
    ) : (
        <div className="dataGallery">{row}</div>
    )}
    </>
);
}
}
export default Home;