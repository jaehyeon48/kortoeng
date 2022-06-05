import kakaoTranslate from './kakaoTranslate';
import naverTranslate from './naverTranslate';
import { convertToCamelCase, convertToSnakeCase } from './casing';

export default async function translate(text: string) {
	const kakaoTranslated = await kakaoTranslate(text);
	const naverTranslated = await naverTranslate(text);
	const originalTexts = removeDuplicatedWords(
		[kakaoTranslated, naverTranslated].map(removeSpecialKeywords)
	);

	return [
		...convertToCamelCase(originalTexts),
		...convertToSnakeCase(originalTexts),
		...[...originalTexts].map(word => ({
			label: word,
			detail: '원본'
		}))
	];
}

function removeDuplicatedWords(texts: string[]) {
	return [...new Set(texts)];
}

function removeSpecialKeywords(text: string) {
	return text.replace(/([^\w ])/g, '');
}
