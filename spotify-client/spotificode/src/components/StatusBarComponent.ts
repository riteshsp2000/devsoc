import * as vscode from 'vscode';
import { StatusBarAlignment } from 'vscode';
import { COMANDO } from '../comandos';
import { ETIQUETA } from '../etiquetas';
import { ICONE } from '../icones';

export class StatusBarComponent {
  prev!: vscode.StatusBarItem;
  play!: vscode.StatusBarItem;
  next!: vscode.StatusBarItem;
  pause!: vscode.StatusBarItem;
  song!: vscode.StatusBarItem;

  constructor(private context: vscode.ExtensionContext) {
    this.configuraBarraStatus();
  }

  private configuraBarraStatus() {
    this.prev = this.criaBotaoIcone('prev', COMANDO.prev, 'prev');
    this.play = this.criaBotaoIcone('play', COMANDO.play, 'play', false);
    this.pause = this.criaBotaoIcone('pause', COMANDO.pause, 'pause', false);
    this.next = this.criaBotaoIcone('next', COMANDO.next, 'next');
    this.song = vscode.window.createStatusBarItem(StatusBarAlignment.Left);
  }

  private criaBotaoIcone(
    icon: keyof typeof ICONE,
    command: string,
    tooltip?: keyof typeof ETIQUETA,
    visible = true
  ) {
    const botao = vscode.window.createStatusBarItem(StatusBarAlignment.Left);
    botao.text = ICONE[icon];
    botao.command = command;
    botao.tooltip = tooltip && ETIQUETA[tooltip];
    visible && botao.show();
    return botao;
  }
}
