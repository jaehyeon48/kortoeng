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

export function convertToSnakeCase(texts: string[]): QuickPickItem[] {
	return texts
		.map(word => word.replace(/ /g, '_'))
		.map(word => ({
			label: word,
			detail: 'snake_case'
		}));
}

export function convertToKebabCase(texts: string[]): QuickPickItem[] {
	return texts
		.map(word => word.replace(/ /g, '-'))
		.map(word => ({
			label: word,
			detail: 'kebab-case'
		}));
}
