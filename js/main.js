document.querySelector('#clickMe').addEventListener('click', getInput)

function getInput() {

  const userWordEntered = document.querySelector("#userWordEntered").value; // need to have the .value to get the thing inputted

  fetch(`/api?wordToBeCheckedForPalindrome=${userWordEntered}`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      document.querySelector("#wordEnteredByUser").textContent = data.yourWord
      document.querySelector("#wordBackWards").textContent = data.palindromeWord
      document.querySelector("#yesOrNoPalindrome").textContent = data.messageToPrint
    });
}
