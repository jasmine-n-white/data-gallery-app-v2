import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './TreasureProfile.css'

function TreasureProfile() {
  const {id} = useParams();
  const [treasureInfo, setTreasureInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`);
            const data = await response.json();
            setTreasureInfo(data?.data);
            setIsLoading(false);
        } catch(error) {
            console.log(error);
            setErrorMessage("Error! Could not fetch data.");
        }
    }
    fetchData();
  }, [id])
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
    let locations = treasureInfo.common_locations ? treasureInfo.common_locations.join(" and ") : "Unknown";
    let drops = treasureInfo.drops ? treasureInfo.drops.join(", ") : "Unknown";
    return (
        <>
        <p>{errorMessage}</p>
        <div className="treasurePage">
            <img src = {treasureInfo.image}/>
            <div className="textInfo">
                <h1>{treasureInfo.name.toUpperCase()}</h1>
                <h4>Locations</h4>
                <p>{locations}</p>
                <h4>Drops</h4>
                <p>{drops}</p>
                <h4>Description</h4>
                <p>{treasureInfo.description}</p>
            </div>
        </div>
        </>
    )
  }
}

export default TreasureProfile;