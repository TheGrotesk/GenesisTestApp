import fs   		from 'fs';
import * as appRoot from 'app-root-path';

export default class RequestLogger {
	constructor(config) {
		this.logFile = config.logFileName;
		this.logFolder = `${appRoot}/${config.logFolder}/`;
	}

	async log(path, status) {
		const string = `${new Date()} | ${path.method || ''} ${path.url || path}. ${status}\n`; 
		
		console.log(string);
		
		this.appendToFile(string);
	}

	async errorLog(path, error, status) {
		const string = `${new Date()}, | ${path.method || ''} ${path.url || path}. ${status}. ${error}\n`;

		console.error(string);

		this.appendToFile(string);
	}

	async checkFolder(callback) {
		fs.exists(this.logFolder, exists => {
			if (!exists) {
				fs.mkdir(this.logFolder, err => {
					if (err) throw err;
				});
			}

			callback();
		});
	}

	async appendToFile(string) {
		await this.checkFolder(() => {
			fs.appendFile(`${this.logFolder}${this.logFile}`, string, err => {
				if (err) throw err;
			});
		});
	}
}