import * as vscode from 'vscode';
import axios from 'axios';
import {writeFile}  from 'fs';

export function activate(context: vscode.ExtensionContext) {

	console.log('Congratulations, your extension "gitignore-generator" is now active!');

	let disposable = vscode.commands.registerCommand('gitignore-generator', async () => {

		try {
			vscode.window.showInformationMessage('Enter framework, languages, code editors, etc. seperated by commas with no spaces');
	
			const keywords = await vscode.window.showInputBox();
			const response = await axios.get(`https://www.toptal.com/developers/gitignore/api/${keywords}`);

			if (response) {
				writeFile(`${__dirname}/.gitignore`, response.data, {encoding: 'utf8'}, (error) => {
					console.log('write file sync', error);
					vscode.window.showInformationMessage('.gitignore file created');
				});
			}
			
		} catch (error) {
			console.log ('Try Catch Error: ', error);
		}		
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}
