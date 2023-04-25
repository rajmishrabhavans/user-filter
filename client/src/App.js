import { useEffect, useState } from 'react';
import './App.css';
import noresult from './img/noresult.jpg'
import {UserCard, GroupCard} from './components/MyCard';
import 'fontawesome-free/css/all.min.css';
function App() {
  const [users, setUsers] = useState([]); //for storing the users information
  const [group, setGroup] = useState([]); // for storing the city group information
  const [inputData, setInputData] = useState('1');
  const [loading, setLoading] = useState(false);

  // loads the data from the database through backend and also use type for getting
  // matched data
  const loadUsers = async (type = "1") => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/fetchUsers', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type
        })
      });

      if (res.status !== 200) {
        throw new Error(res.error);
      }
      const rdata = await res.json();
      setUsers(rdata.matchedUsers)

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  // loads the data for top 10 city with most users and their average income
  const loadGroup = async () => {
    try {
      setLoading(true);
      const res = await fetch('http://localhost:8000/fetchGroup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.status !== 200) {
        throw new Error(res.error);
      }
      const rdata = await res.json();
      setGroup(rdata.matchedGroup)

    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false);
    }
  }

  // changes the data on selection of different options
  const changeUserData=(e)=>{
    const value= e.target.value;
    setInputData(value);
    if(value<5){
      loadUsers(value);
    }else{
      loadGroup()
    }
  }
  useEffect(() => {
    loadUsers();
  }, [])
  return (
    //select menu
    <div className='container my-3'>
    <div value={inputData} onChange={(e)=>{changeUserData(e)}}>
      <select className="form-select" aria-label="Default select example">
        <option value="1">1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.</option>
        <option value="2">2. Male Users which have phone price greater than 10,000.</option>
        <option value="3">3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.</option>
        <option value="4">4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.</option>
        <option value="5">5. Show the data of top 10 cities which have the highest number of users and their average income.</option>
      </select>
    </div>

      {/* Displays cards based on useState and selected options*/}
      {inputData!=="5"?
      <UserCard userData={users} />
      :
      <GroupCard groupData={group} />
      }

      {((inputData!=="5" && users.length===0) || (inputData==="5" && group.length===0)) && !loading?<><h1> Sorry no match found<i className="fa fa-exclamation"></i></h1><img src={noresult} 
      style={{width:'100vw',maxWidth:'600px'}} alt='noresult'></img></>:loading?<h1>Loading data...</h1>:null}
    </div>
  );
}

export default App;
