import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

function MonsterPage() {
    const [monsters, setMonsters] = useState(null);
    const [isLoading, setIsLoading]= useState(true);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch("https://botw-compendium.herokuapp.com/api/v3/compendium/category/monsters");
                
                const data = await response.json();
                setMonsters(data?.data);
                console.log(monsters);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setErrorMessage("Error! Could not fetch data.");
            }
        };
        fetchData();
    }, []);

    const searchMonsters = (searchValue) => {
        setSearch(searchValue);
        if (search) {
            const filteredMonsters = monsters.filter(
                (monster) => {
                    return monster.name.toLowerCase().includes(search.toLowerCase());
                })
            setFilteredData(filteredMonsters)
        } else {
            setFilteredData(monsters);
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
        let row = monsters?.map((monster) => (
        <Link key={monster.id} to={`/monsters/entry/${monster.id}`} className="link">
            <div className="cell">
                <img src={monster.image} alt=""/>
                <h3>{monster.name.toUpperCase()}</h3>
            </div>
        </Link>     
        ))
        return (
            <>
            <p>{errorMessage}</p>
            <div className="mainPage">
                <h1>MONSTERS</h1>
                <p>Welcome to the Breath of the Wild Monster Gallery! Dive into the world of Hyrule’s fiercest foes, from towering Guardians to sly Bokoblins. Explore their traits, behaviors, and secrets to mastering the art of battle. Are you ready to face them all?</p>
            </div>
            <div className="searchBar">
                <input type="text" placeholder="Search by Name..." onChange={(e) => searchMonsters(e.target.value)} value={search}/>
                <button type="submit" onClick={clearSearch}>Clear</button>
            </div>
            {search.length > 0 ? (
                filteredData.map((monster) => {
                    return (
                        <div className="filteredGallery">
                            <Link key={monster.id} to={`/monsters/entry/${monster.id}`} className="link">
                                <div className="cell">
                                    <img src={monster.image} alt=""/>
                                    <h3>{monster.name.toUpperCase()}</h3>
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

export default MonsterPage;
