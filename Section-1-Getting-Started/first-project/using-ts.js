var btn = document.querySelector("button");
var input_1 = document.getElementById("num1");
var input_2 = document.getElementById("num2");
function addNum(num1, num2) {
    return num1 + num2;
}
btn.addEventListener("click", function () {
    console.log(addNum(+input_1.value, +input_2.value));
});
