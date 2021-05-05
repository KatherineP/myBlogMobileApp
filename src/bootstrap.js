import * as Font from 'expo-font';
import { DB } from './db'

const bootstrap = async () => {
  try {
    await Font.loadAsync({
      'open-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
      'open-regular': require('../assets/fonts/OpenSans-Regular.ttf'),
    });
    await DB.init()
  }
  catch (error) {
    console.log('Error: ', error)
}
  
};

export { bootstrap };
