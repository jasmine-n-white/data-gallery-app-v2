import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function TreasurePage() {
    const [treasures, setTreasures] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/treasure");
                const data = await response.json();
                setTreasures(data?.data);
                console.log(treasures);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setErrorMessage("Error! Could not fetch data.");
            }
        };
        fetchData();
    }, []);

    const searchTreasures = (searchValue) => {
        setSearch(searchValue);
        if (search) {
            const filteredTreasures = treasures.filter(
                (treasure) => {
                    return treasure.name.toLowerCase().includes(search.toLowerCase());
                })
            setFilteredData(filteredTreasures);
        } else {
            setFilteredData(treasures);
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
        let row = treasures?.map((treasure) => (
        <Link key={treasure.id} to={`/treasures/entry${treasure.id}`} className="link">
            <div className="cell">
                <img src={treasure.image} alt=""/>
                <h3>{treasure.name.toUpperCase()}</h3>
            </div>
        </Link>
        ))
        return (
            <>
            <p>{errorMessage}</p>
            <div className="mainPage">
                <h1>TREASURES</h1>
            </div>
            <div className="searchBar">
                <input type="text" placeholder="Search by Name..." onChange={(e) => searchTreasures(e.target.value)} value={search}/>
                <button type="submit" onClick={clearSearch}>Clear</button>
            </div>       
            {search.length > 0 ? (
                filteredData.map((treasure) => {
                    return (
                        <div className="filteredGallery">
                            <Link key={treasure.id} to={`/treasures/entry/${treasure.id}`} className="link">
                                <div className="cell">
                                    <img src={treasure.image} alt=""/>
                                    <h3>{treasure.name.toUpperCase()}</h3>
                                </div>
                            </Link>
                        </div>
                    )
                })
            ) : (
                <div className="dataGallery">{row}</div>
            )}
            </>

        )
    }
}

export default TreasurePage;