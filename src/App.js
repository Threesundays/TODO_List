import { sortTodosByTitle } from './helpers';
import { useState, useEffect } from 'react';
import styles from './app.module.css';
import { Input } from './conponents';
import { useRequestAdd, useRequestDelete, useRequestGet, useRequestEdit } from './hooks';

export const App = () => {
	const [showForm, setShowForm] = useState(false);
	const [inputEditValue, setInputEditValue] = useState('');

	const [inputValue, setInputValue] = useState('');
	const [searchInputValue, setSearchInputValue] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);
	const [isSorted, setIsSorted] = useState(false);

	const [editingTaskId, setEditingTaskId] = useState(null);

	const { todos, setTodos } = useRequestGet(refreshTodosFlag);
	const { requestAdd } = useRequestAdd(refreshTodos);
	const { requestDelete } = useRequestDelete(refreshTodos);
	const { requestEdit } = useRequestEdit(refreshTodos, setEditingTaskId);

	const [filteredTodos, setFilteredTodos] = useState(todos);

	const onSubmit = (event) => {
		event.preventDefault();
		const submitData = { title: inputValue };
		requestAdd(submitData);
		setInputValue('');
	};

	const handleOpenEditForm = (id, title) => {
		setEditingTaskId(id);
		setInputEditValue(title);
		setShowForm(!showForm);
	};

	const handleSorted = () => {
		if (!isSorted) {
			const sortedTodos = sortTodosByTitle(todos);
			setTodos(sortedTodos);
			setIsSorted(true);
		} else {
			refreshTodos();
			setIsSorted(false);
		}
	};

	const onSubmitEditForm = (event) => {
		event.preventDefault();
		const submitData = { title: inputEditValue };
		requestEdit(editingTaskId, submitData);
		setShowForm(!showForm);
	};

	useEffect(() => {
		const filteredList = todos.filter((todo) => todo.title.toLowerCase().includes(searchInputValue));
		setFilteredTodos(filteredList);
	}, [searchInputValue, todos]);

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				<Input
					name="todo"
					type="text"
					placeholder="Введите задачу"
					value={inputValue}
					onChange={(event) => setInputValue(event.target.value)}
				/>
				<button>✔</button>
			</form>
			<form>
				<Input
					name="search"
					type="text"
					placeholder="Поиск"
					value={searchInputValue}
					onChange={(event) => setSearchInputValue(event.target.value)}
				/>
			</form>
			<button onClick={handleSorted}>Abc 🠗</button>
			<ol className={styles.todoList}>
				{filteredTodos.map(({ id, title }) => (
					<li key={id}>
						{title}
						<button onClick={() => requestDelete(id)}>✘</button>
						<button onClick={() => handleOpenEditForm(id, title)}>✎</button>
						{showForm && editingTaskId === id && (
							<div>
								<form onSubmit={onSubmitEditForm}>
									<Input
										type="text"
										value={inputEditValue}
										onChange={(event) => setInputEditValue(event.target.value)}
									/>
									<button type="submit">Редактировать</button>
								</form>
							</div>
						)}
					</li>
				))}
			</ol>
		</div>
	);
};
