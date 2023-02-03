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
                console.log('Task');
                console.log(tasks);
                console.log(JSON.stringify(tempTask));
                fetch("https://assets.breatheco.de/apis/fake/todos/user/sebastnt", {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(tempTask),
				})
					.then((resp) => {
						console.log("STATUS");
						console.log(resp.status);
						return resp.json();
					})
					.then((data) => {
						console.log("console de la data");
						console.log(data);
					})
					.catch((error) => {
						console.log(error);
					});
				};
            setName('');
        };
    };

	const removeTask = (item) => {
		let removeList = tasks.filter((task) => item.label !== task.label);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/sebastnt", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(removeList),
		})
		.then((resp) => {
			console.log("STATUS");
			console.log(resp.status);
			return resp.json();
		})
		.then((data) => {
			console.log("console de la data");
			console.log(data);
		})
		.catch((error) => {
			console.log(error);
		});
		setTasks(removeList);
	};


	useEffect( () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/sebastnt", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			})
			.then((resp) => {
				console.log("STATUS");
				console.log(resp.status);
				return resp.json();
			})
			.then((data) => {
				console.log("console de la data");
				console.log(data);
				setTasks(data);
			})
			.catch((error) => {
				console.log(error);
			});
		}, []);

	
		

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
					{tasks.map((task, index) => (
						<li key={index} 
						className="task mx-auto d-flex justify-content-between border-0 text-muted fs-4 container-fluid rounded-2">{task.label}
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
