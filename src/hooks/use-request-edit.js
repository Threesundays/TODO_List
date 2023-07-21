import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestEdit = () => {
	const requestEdit = (id, data) => {
		const editTodoListDbRef = ref(db, `todos/${id}`);

		set(editTodoListDbRef, data).then((response) => {
			console.log('Задача обновлена');
		});
	};

	return { requestEdit };
};
