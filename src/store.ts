/* eslint-disable import/prefer-default-export */
import type { RecoilState } from 'recoil';
import { atom } from 'recoil';

const initialAppState: AppState = {
  map: { title: '', type: '', region: 'Africa' },
  userData: { data: [], ready: false },
  currentStep: 0,
  dataKeys: {},
};

export const recoilState: RecoilState<AppState> = atom({
  default: initialAppState,
  key: 'initialAppState',
});
