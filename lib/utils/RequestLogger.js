import fs from 'fs';

export default class RequestLogger {
	constrcutor(logFile) {
		this.logFile = logFile;
	}

	async log(request, status) {
		const string = `${new Date()} | ${request.url}. ${status}`; 
		
		console.log(string);
		
		this.writeToFile(string);
	}

	async errorLog(request, error, status) {
		const string = `${new Date()}, | ${request.url}. ${status}. ${error}`;

		console.log(string);

		this.writeToFile(string);
	}

	async writeToFile(string) {
		fs.writeFile(this.logFile, string, err => {
			if (err) throw err;
		});
	}
}