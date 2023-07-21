import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useRequestGet = () => {
	const [todos, setTodos] = useState({});

	useEffect(() => {
		const todoListDbRef = ref(db, 'todos');

		return onValue(todoListDbRef, (snapshot) => {
			const loadedTodos = snapshot.val() || {};
			setTodos(loadedTodos);
		});
	}, []);
	return {
		todos,
		setTodos,
	};
};
