import axios, { AxiosRequestConfig } from 'axios';
import { NAVER_CLIENT_ID, NAVER_CLIENT_SECRET } from '../configs';

interface NaverTranslateResult {
	srcLangType: string;
	tarLangType: string;
	translatedText: string;
}

interface NaverTranslateResponse {
	data: {
		message: {
			result: NaverTranslateResult;
		};
	};
}

export default async function naverTranslate(text: string) {
	try {
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
	
		const { data }: NaverTranslateResponse = await axios.post(
			'https://openapi.naver.com/v1/papago/n2mt',
			reqBody,
			config
		);
	
		return data.message.result.translatedText.toLowerCase();
	} catch (error) {
		return '';
	}
}
