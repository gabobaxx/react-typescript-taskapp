import React, { useRef, useState } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
	name: string;
	done: boolean;
}

function App(): JSX.Element {
	const [task, setTask] = useState<string>('');
	const [tasks, setTasks] = useState<ITask[]>([]);
	const taskInput = useRef<HTMLInputElement>(null);

	const addTask = (task: string): void => {
		const newTasks: ITask[] = [...tasks, { name: task, done: false }];
		setTasks(newTasks);
	};
	const handleSubmit = (e: FormElement): void => {
		e.preventDefault();
		addTask(task);
		setTask('');
		taskInput.current?.focus();
	};
	const toggleDoneTask = (i: number): void => {
		const newTasks: ITask[] = [...tasks];
		newTasks[i].done = !newTasks[i].done;
		setTasks(newTasks);
	};
	const removeTask = (i: number): void => {
		const newTasks: ITask[] = [...tasks];
		newTasks.splice(i, 1);
		setTasks(newTasks);
	};

	return (
		<div className="container p-4">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<div className="card">
						<div className="card-body">
							<form onSubmit={handleSubmit}>
								<input
									className="form-control"
									type="text"
									onChange={(e) => setTask(e.target.value)}
									value={task}
									autoFocus
									ref={taskInput}
									placeholder="Add a task"
								/>
								<button className="btn btn-success btn-block mt-2">
									Save
								</button>
							</form>
						</div>
					</div>
					{tasks.map((task: ITask, i: number) => {
						return (
							<div key={i} className="card card-body mt-2">
								<h2
									style={{
										textDecoration: task.done ? 'line-through' : '',
									}}
								>
									{task.name}
								</h2>
								<div>
									<button
										onClick={() => toggleDoneTask(i)}
										className="btn btn-secondary"
									>
										{task.done ? '✖️' : '✅'}
									</button>
									<button
										className="btn btn-danger"
										onClick={() => removeTask(i)}
									>
										🗑️
									</button>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default App;
