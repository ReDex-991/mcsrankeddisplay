import { useEffect, useState } from 'react';
import './App.css'

const API_URL = 'https://mcsrranked.com/api/users/'

function millisToMinAndSec(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

function App() {
  const [playerData,setPlayerData] = useState([]);
  const [searchTerm, setsearchPlayer] = useState('');

  // update the board every 15 minutes
  setInterval(() => {searchTerm==''? '':searchPlayer(searchTerm)}, 900000)

  const searchPlayer = async (name) =>{
    const response = await fetch(`${API_URL}${name}`);
    const data = await response.json();
    setPlayerData(data.data);

  }
  return (
    <>
        {/* input field */}
        <div className="searchField" id='searchField'>
          {/* for bule skin makes the bg blue*/}
          <button className='blueButton' id='bgBtn'
            onClick={()=>{
              const root = document.getElementsByTagName('html')[0];
              const btn = document.getElementById('bgBtn');
              root.classList.contains("blue") == true ? root.setAttribute( 'class', 'green' ): root.setAttribute( 'class', 'blue' );
              root.classList.contains("blue") == true ? btn.innerHTML = 'Have a green skin?': btn.innerHTML = 'Have a blue skin?';
            }}
          >Have a green skin?</button>
          <input
           type="text" 
           placeholder='Search for a nickname' 
           value={searchTerm}
           onChange={(e) => setsearchPlayer(e.target.value)}
           required/>
          <button
            onClick={()=>{
              searchTerm != '' ?searchPlayer(searchTerm.split(' ').join('').replace(/</g, "&lt;").replace(/>/g, "&gt;")): '';
              searchTerm != ''?(document.getElementById('searchField').remove()): '';
            }}
          >Search</button>
        </div>
        {/* display player data */}
        <div className="playerData">
          {
          (playerData == null || playerData.records == null || playerData.data == "Too many requests" )?
          (<h1>none</h1>):
          (<>
              <img src={`https://minotar.net/helm/${playerData.nickname}`} alt="" />
              <div className='firstGroup'> 
                <span>
                  <p>Best Elo:</p>
                  <h4>{playerData.best_elo_rate}</h4>
                </span>
                <span>
                  <p>Elo:</p>
                  <h4>{playerData.elo_rate != -1 ? playerData.elo_rate : 'none'}</h4>
                </span>
                <span>
                  <p>Best Time:</p>
                  <h4>{millisToMinAndSec(playerData.best_record_time)}</h4>
                </span>
              </div>
              <div className='secondGroup'>
                <span>
                  <p>Winstreak:</p>
                  <h4>{playerData.current_winstreak}</h4>
                </span>
                <span>
                  <p>Ranking:</p>
                  <h4>{playerData.elo_rank != null ? playerData.elo_rank : 'none'}</h4>
                </span>
                <span>
                  <p>W/L:</p>
                  <h4>{playerData.records[2].win}-{playerData.records[2].lose}</h4>
                </span>
              </div>
            </>
          )}
        </div>
    </> 
  )
}

export default App
