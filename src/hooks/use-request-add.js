import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAdd = () => {
	const requestAdd = (data) => {
		const todoListDbRef = ref(db, 'todos');

		push(todoListDbRef, data)
		.then((response) => {
			console.log('Задача добавлена');
		});
	};

	return { requestAdd };
};
