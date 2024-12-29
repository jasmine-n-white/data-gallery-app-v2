import React from 'react'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import './Materials.css'

function Materials() {
    const {id} = useParams();
    const [materialInfo, setMaterialInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await fetch('https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}');
                const data = await response.json();
                setMaterialInfo(data?.data);
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
        let locations = materialInfo.common_locations ? materialInfo.common_locations.join(" and ") : "Unknown";
        let cookingEffect = materialInfo.cooking_effect ? materialInfo.cooking_effect.join(" and ") : "Unkown";
        return (
            <>
            <p>{errorMessage}</p>
            <div className="materialPage">
                <img src = {materialInfo.image}/>
                <div className="textInfo">
                    <h1>{materialInfo.name.toUpperCase()}</h1>
                    <h4>Locations</h4>
                    <p>{locations}</p>
                    <h4>Cooking Effect</h4>
                    <p>{cookingEffect}</p>
                    <h4>Description</h4>
                    <p>{materialInfo.description}</p>
                </div>
            </div>
            </>
        )
    }
  
}
export default Materials