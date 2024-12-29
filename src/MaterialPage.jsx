import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function MaterialPage() {
    const [materials, setMaterials] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/materials");
                const data = await response.json();
                setMaterials(data?.data);
                console.log(materials);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setErrorMessage("Error! Could not fetch data.");
            }
        };
        fetchData();
    }, [])
    
    const searchMaterials = (searchValue) => {
        setSearch(searchValue);
        if (search) {
            const filteredMaterials = materials.filter(
                (material) => {
                    return material.name.toLowerCase().includes(search.toLowerCase());
                })
            setFilteredData(filteredMaterials);
        } else {
            setFilteredData(materials);
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
        let row = materials?.map((material)=> (
            <Link key={material.id} to={`materialEntry/${material.id}`} className="link">
                <div className="cell">
                    <img src={material.image} alt=""/>
                    <h3>{material.name.toUpperCase()}</h3>
                </div>
            </Link>
        ))
        return (
            <>
            <p>{errorMessage}</p>
            <div className="mainPage">
                <h1>MATERIALS</h1>
                <p>Discover the amazing and unique materials of Hyrule!</p>
            </div>
            <div className ="searchBar" >
            <input type="text" placeholder="Search by Name..." onChange={(e) => searchMaterials(e.target.value)} value={search}/>
            <button type="submit" onClick={clearSearch}>Clear</button>
            </div>
            {search.length > 0 ? (
                filteredData.map((material) => {
                    return (
                        <div className="filteredGallery">
                            <Link key={material.id} to={`materialEntry/${material.id}`} className="link">
                                <div className="cell">
                                    <img src={material.image} alt=""/>
                                    <h3>{material.name.toUpperCase()}</h3>
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

export default MaterialPage;