import React from 'react'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './CreatureProfile.css'

function CreatureProfile() {
    const {id} = useParams();
    const [creatureInfo, setCreatureInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`);
                const data = await response.json();
                setCreatureInfo(data?.data);
                setIsLoading(false);
            } catch(error) {
                console.log(error);
                setErrorMessage("Error! Could not fetch data.")
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
           let locations = creatureInfo.common_locations ? creatureInfo.common_locations.join(" and ") : "Unknown";
        return (
            <>
            <p>{errorMessage}</p>
            <div className="creaturePage">      
            <img src = {creatureInfo.image}/>
            <div className="textInfo">
                <h1>{creatureInfo.name.toUpperCase()}</h1>
                <h4>Locations</h4>
                <p>{locations}</p>       
                <h4>Description</h4>
                <p>{creatureInfo.description}</p>      
            </div> 
            </div>
            </>
           

        )
    }
}
export default CreatureProfile