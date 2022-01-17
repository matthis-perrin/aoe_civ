import {AoeModel} from './model';

export async function fetchData(): Promise<AoeModel> {
  return new Promise<AoeModel>(resolve => {
    setTimeout(() => {
      resolve({
        civs: [
          {
            name: 'Japanese',
            imgUrl:
              'https://static.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png/revision/latest/scale-to-width-down/208?cb=20191107173240',
          },
          {
            name: 'Britons',
            imgUrl:
              'https://static.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png/revision/latest/scale-to-width-down/208?cb=20191107173130',
          },
        ],
      });
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    }, 2000);
  });
}
