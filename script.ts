
async function fetchNameInfo(name: string) {
    const response = await fetch(`https://api.nationalize.io?name=${name}`);
    const data = await response.json();
    return data;
}


function handleButtonClick() {
    const nameInput = <HTMLInputElement>document.getElementById('nameInput');
    const resultDiv = document.getElementById('result');
    fetchNameInfo(nameInput.value)
        .then(data => {
            let structuredResult = '';
            data.country.forEach(item => {
                let probabilityPercentage = (item.probability * 100).toFixed(2);
                structuredResult += `Country ID: ${item.country_id}, Probability: ${probabilityPercentage}%<br>`;
            });
            resultDiv.innerHTML = structuredResult;
        })
        .catch(error => {
            resultDiv.textContent = 'Error: ' + error;
        });
}

window.onload = () => {
    const button = document.getElementById('fetchButton');
    button.addEventListener('click', handleButtonClick);
};