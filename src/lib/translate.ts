import axios, { AxiosRequestConfig } from 'axios';
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from '../configs';

interface TranslateResult {
	srcLangType: string;
	tarLangType: string;
	translatedText: string;
}

interface TranslateResponse {
	data: {
		message: {
			result: TranslateResult;
		};
	};
}

export default async function translate(text: string) {
	const reqBody = {
		source: 'ko',
		target: 'en',
		text
	};

	const config: AxiosRequestConfig = {
		headers: {
			'X-Naver-Client-Id': NAVER_CLIENT_ID,
			'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
		}
	};

	const { data }: TranslateResponse = await axios.post(
		'https://openapi.naver.com/v1/papago/n2mt',
		reqBody,
		config
	);

	return data.message.result.translatedText;
}
