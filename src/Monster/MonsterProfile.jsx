import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './MonsterProfile.css'


function MonsterProfile() {
  const {id} = useParams();
  const [monsterInfo, setMonsterInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`);
            const data = await response.json();
            setMonsterInfo(data?.data);
            setIsLoading(false);
        } catch (error) {
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
    let locations = monsterInfo.common_locations ? monsterInfo.common_locations.join(" and ") : "Unknown";
    let drops = monsterInfo.drops?.map((drop) => (
      <li>{capitalizeFirstLetter(drop)}</li>
    ))
    if (monsterInfo.drops.length == 0) {
      drops = "None";
    }
    return (
      <>
      <p>{errorMessage}</p>
      <div className="monsterPage">
        <img src = {monsterInfo.image}/>
        <div className="textInfo">
          <h1>{monsterInfo.name.toUpperCase()}</h1>
          <h4>Locations</h4>
          <p>{locations}</p>
          <h4>Consumable Drops</h4>
          <p>{drops}</p>
          <h4>Description</h4>
          <p>{monsterInfo.description}</p>
        </div>
      </div>
      </>
    )
  }
}

export default MonsterProfile;