import axios, { AxiosRequestConfig } from 'axios';
import { KAKAO_REST_API_KEY } from '../configs';

interface KaKaoTranslateResponse {
	data: {
		translated_text: string[][];
	};
}

const BASE_REQ_URL = 'https://dapi.kakao.com/v2/translation/translate';

export default async function kakaoTranslate(text: string) {
	try {
		const config: AxiosRequestConfig = {
			headers: {
				Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`
			}
		};

		const { data }: KaKaoTranslateResponse = await axios.get(
			`${BASE_REQ_URL}?src_lang=kr&target_lang=en&query=${encodeURIComponent(text)}`,
			config
		);
    return data.translated_text[0][0].toLowerCase();
	} catch (error) {
		console.error(error);
		return '';
	}
}
