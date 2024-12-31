import {useState, useEffect} from 'react'
import {useParams} fronm 'react-router-dom'
import './MonsterProfile.css'


function MonsterProfile() {
  const {id} = useParams();
  const [monsterInfo, setMonsterInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
        try {
            const response = await fetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`);
            const data = await response.json();
        }
    }
  })
}

export default MonsterProfile