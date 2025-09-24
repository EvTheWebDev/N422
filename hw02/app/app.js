function higherOrder(num1, num2, callback) {
    const addition = num1 + num2;
    const subtraction = num1 - num2;
    const multiplication = num1 * num2;
    const division = num1 / num2;

    const results = [addition, subtraction, multiplication, division];
    console.log(`Results: ${results}`);
    return callback(results);
}

function calculateAverage(results) {
    const total = results[0] + results[1] + results[2] + results[3];
    const average = total / 4;
    return {
        average: average,
        total: total
    };
}
function displayTodayDate() {
    const today = new Date();
    let dateHolder = document.querySelector('.date');
    const formattedDate = today.toLocaleDateString();
    $(dateHolder).text(formattedDate);
}


function initListeners() {
    const calculateButton = $('.submitButton');

    $(calculateButton).on('click', function (event) {
        event.preventDefault();

        $('.card').css('visibility', 'visible');
        
        const num1 = parseFloat($('.num1').val());
        const num2 = parseFloat($('.num2').val());
        
        console.log(`Num1: ${num1}, Num2: ${num2}`);

        if (isNaN(num1) || isNaN(num2)) {
            alert('Please enter valid numbers in both fields.');
            return;
        }

        const results = higherOrder(num1, num2, calculateAverage);
        $(`.numbers`).text(`The numbers you entered are ${num1} and ${num2}`);
        $('.average').text(`The average of the results is: ${results.average.toFixed(2)}`);
        $('.total').text(`The total of the results is: ${results.total}`);
    });
}
 
$(document).ready(function () {
initListeners();
displayTodayDate();
});