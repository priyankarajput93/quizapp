import {BASE_URL} from '../util/Constants';

// get data from API
export async function getQuestionsList(count, level) {
  try {
    const response = await fetch(
      BASE_URL + `?amount=${count}&difficulty=${level}`,
    );
    const json = await response.json();
    return json;
  } catch (error) {
    alert(error.message);
    console.log(error.message);
  }
}
