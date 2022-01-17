import {AoeModel} from './model';

export async function fetchData(): Promise<AoeModel> {
  return new Promise<AoeModel>(resolve => {
    setTimeout(() => {
      resolve({dummy: 'aegis'});
    }, 2000);
  });
}
