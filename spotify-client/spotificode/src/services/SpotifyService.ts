import {
  COOKIE,
  SP_URI_API,
  SP_URI_TOKEN,
  TOKEN,
  USER_AGENT,
} from '../constants';
import { ETIQUETA } from '../etiquetas';
/* eslint-disable @typescript-eslint/naming-convention */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Subject } from 'rxjs/internal/Subject';
import * as vscode from 'vscode';

function sanitizaItem(item: Spotify.Item): string {
  return `${item.name} - ${item.artists
    .map((artist) => artist.name)
    .join(' ')}`;
}

export class SpotifyService {
  private api!: AxiosInstance;
  private player!: Spotify.PlayerResponse;
  public playing$ = new Subject<[boolean, string]>();

  constructor(private context: vscode.ExtensionContext) {
    this._setup();
  }

  private _setup() {
    const authorization = this.context.globalState.get(TOKEN);

    this.api = axios.create({
      baseURL: SP_URI_API,
      headers: {
        authorization,
      },
    });
    this.startTimerUpdateToken();
    this.startTimerUpdatePlayer();
  }

  private startTimerUpdatePlayer() {
    setInterval(async () => {
      try {
        const { data } = await this.api.get<Spotify.PlayerResponse>(
          'v1/me/player'
        );
        this.player = data;
        this.playing$.next([data.is_playing, sanitizaItem(data.item)]);
      } catch (err) {
        console.error(err);
      }
    }, 10_000);
  }

  startTimerUpdateToken(cookie?: string, interval = 10_000) {
    setInterval(async () => {
      try {
        this.updateToken();
        this._setup();
      } catch (err) {
        console.error(err);
      }
    }, interval);
  }

  async play() {
    return this.api
      .put(`v1/me/player/play?device_id=${this.player.device.id}`)
      .then(() => {
        this.playing$.next([true, '']);
        vscode.window.showInformationMessage(ETIQUETA.play);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async pause() {
    return this.api
      .put(`v1/me/player/pause?device_id=${this.player.device.id}`)
      .then(() => {
        this.playing$.next([false, '']);
        vscode.window.showInformationMessage(ETIQUETA.pause);
      });
  }

  async prev() {
    return this.api
      .post(`v1/me/player/previous?device_id=${this.player.device.id}`)
      .then(() => vscode.window.showInformationMessage(ETIQUETA.prev));
  }

  async next() {
    return this.api
      .post(`v1/me/player/next?device_id=${this.player.device.id}`)
      .then(() => vscode.window.showInformationMessage(ETIQUETA.next));
  }

  async updateToken() {
    try {
      const cookie = this.context.globalState.get<string>(COOKIE);
      const options = {
        method: 'GET',
        url: SP_URI_TOKEN,
        headers: { cookie: `sp_dc=${cookie};`, 'user-agent': USER_AGENT },
      } as AxiosRequestConfig;

      const { data } = await axios.request(options);
      const token = `Bearer ${data.accessToken}`;

      this.context.globalState.update(TOKEN, token);
      return token;
    } catch (err) {
      vscode.window.showInformationMessage(err);
    }
  }
}
