
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDelete = () => {

	const requestDelete = (id) => {
		const editTodoListDbRef = ref(db, `todos/${id}`);

		remove(editTodoListDbRef)
		.then(() => {
		  console.log('Задача удалена');
		})
		.catch((error) => {
		  console.error('Ошибка при удалении задачи:', error.message);
		});
	};

	return {
		requestDelete,
	};
};
