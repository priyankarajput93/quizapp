

const BASE_URL = 'https://opentdb.com/api.php';

export function storeExpense(count,level) {
    fetch(BACKEND_URL + `?amount=${count}&difficulty=${level}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            amount: expenseData.amount,
            date: expenseData.date,
            description: expenseData.description
        })
    });
}

export async function getQuestionsList(count,level){
    try {
        const response = await fetch(BASE_URL + `?amount=${count}&difficulty=${level}`);
        const json = await response.json();
        return json;
    }catch(error){
        alert(error);
        console.log('Catch called');
        console.log(error);
    }
}