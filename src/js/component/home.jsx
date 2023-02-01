import React, {useState, useEffect} from "react";


//create your first component
const Home = () => {

	const [name, setName] = useState('');
	const [tasks, setTasks] = useState([]);

	let nextTask = tasks.length;

	const addTask = (event) => {
		if (event.key === 'Enter') {
		  	if ( name.length !== 0 ) {
				let tempTask = [...tasks, { "label": name, "done": false }];
				setTasks(tempTask);
				console.log('tempTask');
				console.log(tempTask);
				fetch('https://assets.breatheco.de/apis/fake/todos/user/alesanchezr', {
					method: 'PUT',
					headers: {
						'Content-Type': 'aplication/json',
					},
					body: JSON.stringify(tempTask),
				})
				.then( (resp) => {
					console.log('status');
					console.log(resp.status);
					return resp.json();
				} )
				.then( (data) => {
					console.log(data);
				})
				.catch( (error) => {
					console.log(error);
				});
			};
		  	setName('');
		};
	};

	const removeTask = (item) => {
		let removeList = tasks.filter((task) => item.label !== task.label);
		setTasks(removeList);
	}


	return (
		<div className="container text-center">
			<h1>ToDos</h1>
			<div className="main">
				<ul className="list">
					<li className="box border-0 text-muted fs-4 container-fluid rounded-2 p-2">
						<input 
							className="border-0 rounded-2"
							value={name}
							onChange={e => setName(e.target.value) }
							placeholder="What needs to be done?"
							onKeyDown={addTask}
						/>
					</li>
					{tasks.map((task) => (
						<li className="task mx-auto d-flex justify-content-between border-0 text-muted fs-4 container-fluid rounded-2">{task.label}
						<button className="delete rounded-2 border-1 mt-1 mb-1" onClick={() => {removeTask(task)}}>
							X
						</button>
						</li>
					))}
					<li className="items mx-auto rounded-2" >{nextTask} Items left</li>
				</ul>
			</div>
		</div>
	);
};

export default Home;
