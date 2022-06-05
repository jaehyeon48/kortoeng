import { QuickPickItem } from 'vscode';

export function convertToCamelCase(texts: string[]): QuickPickItem[] {
	function makeCamelCase(word: string[]) {
		let result = word[0];
		for (let i = 1; i < word.length; i++) {
			result += word[i].replace(/^./, match => match.toUpperCase());
		}

		return {
			label: result,
			detail: 'camelCase'
		};
	}

	return texts.map(word => word.split(' ')).map(makeCamelCase);
}
