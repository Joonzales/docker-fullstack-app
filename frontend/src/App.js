import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
	const [lists, setLists] = useState([]);
	const [value, setValue] = useState("");

	const changeHandler = (event) => {
		setValue(event.currentTarget.value)
	}
	const submitHandler = (event) => {
		event.preventDefault();
		axios.post('/api/value', {value: value})
			.then(response => {
				if(response.data.success) {
					console.log('reponse', response)
					setLists([...lists, response.data])
					setValue("");
				} else {
					alert('값을 DB에 넣는 데 실패했습니다.')
				}
			})
	};
	
	useEffect(() => {
		//여기서 DB에 있는 값을 가져옴
		axios.get('/api/values')
			.then(response => {
				console.log('response', response.data)
				setLists(response.data)
			})
	}, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="container">
	        {lists && lists.map((list, index) => (
		        <li key={index}>{list.value}</li>
	        ))}
          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="입력해주세요..."
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;