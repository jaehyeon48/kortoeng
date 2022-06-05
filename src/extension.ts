import { commands, ExtensionContext, Range, window } from 'vscode';
import translate from './lib/translate';

export function activate(context: ExtensionContext) {
	const disposable = commands.registerCommand('kortoeng.kortoeng', async () => {
		const editor = window.activeTextEditor;
		if (!editor) {
			return;
		}
		const selections = editor.selections;
		const range = new Range(selections[0].start, selections[selections.length - 1].end);
		const highlightedText = editor.document.getText(range);
		try {
			if (highlightedText.trim() === '') {
				return;
			}
			if (highlightedText.length > 5000) {
				window.showErrorMessage('최대 5,000자 까지 번역할 수 있습니다.');
				return;
			}
			const translatedText = await translate(highlightedText);
			const pickedItem = await window.showQuickPick([translatedText]);
			if (!pickedItem) {
				return;
			}
			editor.edit(edit => edit.replace(range, pickedItem));
		} catch (error) {
			console.log(error);
		}
	});

	context.subscriptions.push(disposable);
}
