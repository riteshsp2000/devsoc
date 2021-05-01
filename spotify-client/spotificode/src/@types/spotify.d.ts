/* eslint-disable @typescript-eslint/naming-convention */

declare module Spotify {
  export interface Device {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number;
  }

  export interface ExternalUrls {
    spotify: string;
  }

  export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }

  export interface ExternalUrls2 {
    spotify: string;
  }

  export interface Image {
    height: number;
    url: string;
    width: number;
  }

  export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls2;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  }

  export interface ExternalUrls3 {
    spotify: string;
  }

  export interface Artist2 {
    external_urls: ExternalUrls3;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }

  export interface ExternalIds {
    isrc: string;
  }

  export interface ExternalUrls4 {
    spotify: string;
  }

  export interface Item {
    album: Album;
    artists: Artist2[];
    available_markets: any[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls4;
    href: string;
    id: string;
    is_local: boolean;
    is_playable: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    tags: any[];
    track_number: number;
    type: string;
    uri: string;
  }

  export interface Disallows {
    resuming: boolean;
    toggling_repeat_context: boolean;
    toggling_repeat_track: boolean;
    toggling_shuffle: boolean;
  }

  export interface Actions {
    disallows: Disallows;
  }

  export interface PlayerResponse {
    device: Device;
    shuffle_state: boolean;
    repeat_state: string;
    timestamp: number;
    context?: any;
    progress_ms: number;
    item: Item;
    currently_playing_type: string;
    actions: Actions;
    is_playing: boolean;
  }
}
