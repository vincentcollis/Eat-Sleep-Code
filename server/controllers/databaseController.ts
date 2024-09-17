interface DatabaseController {
	getAllQuestions: () => void;
}

const databaseController: DatabaseController = {
	getAllQuestions: () => {
		console.log('getAllQuestions');
	},
};

export default databaseController;
