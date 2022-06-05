import kakaoTranslate from './kakaoTranslate';
import naverTranslate from './naverTranslate';

export default async function translate(text: string) {
	const kakaoTranslated = await kakaoTranslate(text);
	const naverTranslated = await naverTranslate(text);
	const result = removeDuplicatedWords(
		[kakaoTranslated, naverTranslated].map(removeSpecialKeywords)
	);

	return result;
}

function removeDuplicatedWords(texts: string[]) {
	return [...new Set(texts)];
}

function removeSpecialKeywords(text: string) {
	return text.replace(/([^\w ])/g, '');
}
