import {api} from '../api';

export function getLanguage() {
  return api.getLanguage();
}

export function setLanguage(value: string) {
  return api.setLanguage(value);
}

export function getViewMode() {
  return api.getViewMode();
}

export function setViewMode(value: boolean) {
  return api.setViewMode(value);
}

export function getTabernak(lat: number, long: number, text?: string) {
  return api.getTabernak(lat, long, text);
}
