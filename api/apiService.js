

const BASE_URL = 'https://opentdb.com/api.php';

export async function getQuestionsList(count, level) {
    try {
        const response = await fetch(BASE_URL + `?amount=${count}&difficulty=${level}`);
        const json = await response.json();
        return json;
    } catch (error) {
        alert(error.message);
        console.log(error.message);
    }
}