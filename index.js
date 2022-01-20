const billInput = $('#bill');
const peopleInput = $('#people');
const buttonTip = $('.btn-tip');
const customTip = $('input.btn-tip[type=number]');
const outputNumber = $('.output-number');
const resetButton = $('#reset-button');
var tip = [];
var bill = [];
var people = [];

billInput.on('input', function() {
  var valofBill = Number(billInput.val());
  bill.push(valofBill);
  calculate();
});

buttonTip.on('click', function() {
  buttonTip.removeClass('button-selected');
  $(this).addClass('button-selected');
  var tipPercentage = $('.button-selected').val();
  tipValue(tipPercentage);
});

function tipValue(tipPercentage) {
  switch (tipPercentage) {
    case '5%':
      var valofTip = 0.05;
      break;
    case '10%':
      var valofTip = 0.10;
      break;
    case '15%':
      var valofTip = 0.15;
      break;
    case '25%':
      var valofTip = 0.25;
      break;
    case '50%':
      var valofTip = 0.50;
      break;
    default:
      customTip.on('input', function() {
        var valofTip = customTip.val() / 100;
        tip.push(valofTip);
        calculate();
      })
  }
  tip.push(valofTip);
  calculate();
}


peopleInput.on('input', function() {
  var valofPeople = Number(peopleInput.val());
  people.push(valofPeople);
  calculate();
});

peopleInput.change(function() {
  if (peopleInput.val() === '0' || peopleInput.val() === '') {
    $('#people').addClass('input-people-false');
    $('.false-notification').css('display', 'block');
  } else {
    $('#people').removeClass('input-people-false');
    $('.false-notification').css('display', 'none');
  };
});

function calculate() {

  var x = bill[bill.length - 1];
  var y = tip[tip.length - 1];
  var z = people[people.length - 1];

  var totalTip = x * y;
  var valAmount = totalTip / z;
  var tipAmount = Math.round(valAmount * 100) / 100;

  var valTotal = tipAmount + (x / z);
  var total = Math.round(valTotal * 100) / 100;


  if (isNaN(tipAmount) !== true && tipAmount !== Infinity) {
    outputNumber[0].innerHTML = '$' + tipAmount;
    outputNumber[1].innerHTML = '$' + total;
    resetButton.addClass('button-reset');
  } else if (tipAmount === Infinity) {
    outputNumber[0].innerHTML = '$0.00';
    outputNumber[1].innerHTML = '$0.00';
  };
};

function resetAll() {
  resetButton.removeClass('button-reset');
  billInput.val('');
  peopleInput.val('');
  customTip.val('');
  $('.btn-tip').removeClass('button-selected');
  outputNumber[0].innerHTML = "$0.00";
  outputNumber[1].innerHTML = "$0.00";
  tip = [];
  bill = [];
  people = [];
}

resetButton.on('click', resetAll);
$(window).on('load', resetAll);
