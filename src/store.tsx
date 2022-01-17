import AsyncStorageLib from '@react-native-async-storage/async-storage';

import {createDataStore} from './data_store';
import {error} from './logger';
import {AoeModel} from './model';

const modelStorageKey = 'aoe-model';

const {getData, setData, useData} = createDataStore<AoeModel>(undefined as unknown as AoeModel);

export function setModel(model: AoeModel): void {
  setData(model);
  AsyncStorageLib.setItem(modelStorageKey, JSON.stringify(model)).catch(error);
}

export async function loadModelFromDisk(): Promise<boolean> {
  const data = await AsyncStorageLib.getItem(modelStorageKey);
  // eslint-disable-next-line no-null/no-null
  if (data === null) {
    return false;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  setModel(JSON.parse(data));
  return true;
}

export const getModel = getData;
export const useModle = useData;
