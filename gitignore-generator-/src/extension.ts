import * as vscode from "vscode";
import Generator from "./generator";

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand(
        "extension.gitignoreGenerate",
        () => {
            try {
                const generator = new Generator();
                generator.init();
            } catch (e) {
                console.log("failed");
                console.log(e.message);
            }
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}
