import { commands, ExtensionContext, Range, window } from 'vscode';
import naverTranslate from './lib/naverTranslate';

export function activate(context: ExtensionContext) {
	const disposable = commands.registerCommand('kortoeng.kortoeng', async () => {
		const editor = window.activeTextEditor;
		if (!editor) {
			return;
		}
		const selections = editor.selections;
		const range = new Range(selections[0].start, selections[selections.length - 1].end);
		const highlightedText = editor.document.getText(range);
		if (highlightedText.trim() === '') {
			return;
		}
		if (highlightedText.length > 5000) {
			window.showErrorMessage('최대 5,000자 까지 번역할 수 있습니다.');
			return;
		}

		const translatedText = await naverTranslate(highlightedText);
		const pickedItem = await window.showQuickPick([translatedText]);
		if (!pickedItem) {
			return;
		}
		editor.edit(edit => edit.replace(range, pickedItem));
	});

	context.subscriptions.push(disposable);
}
