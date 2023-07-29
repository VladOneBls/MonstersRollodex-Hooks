import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  // DEF: useState gives us 2 values [value, setValue]; 1st is the value we want to store; 2nd is a setter function
  const [searchField, setSearchField] = useState(''); // inside 'useState()' we need to pass the initial value
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);


  // DEF: useEffect takes 2 arguments (() => {}, []); 1st is a callback function; 2nd is an array of dependencies
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []); // whenever any of the values inside of the dependency array change, is when the callback function will be run
          // the callback function will be run the first time the function App is executed no matter what


   useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilteredMonsters);
   }, [monsters, searchField]);


  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }


  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>

      <SearchBox 
        className='monsters-search-box'
        onChangeHandler={onSearchChange} 
        placeholder='search monsters' 
      />

      <CardList monsters={filteredMonsters} />
    </div>
  );
};

export default App;