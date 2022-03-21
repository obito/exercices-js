const formElement = document.getElementById("todo-form");
const deleteButton = document.getElementById("todo-delete-all");
const todoInput = document.getElementById("todo-input");
const todoContainer = document.getElementById("todo-list");

var todoCount = 0;

deleteButton.addEventListener("click", function (event) {
  // clear inner html
  todoContainer.innerHTML = "";
});

formElement.addEventListener("submit", function (event) {
  // dont refresh
  event.preventDefault();

  const value = todoInput.value;

  if (value == "") {
    return;
  }

  // delete li
  const listElement = document.createElement("li");

  listElement.id = todoCount;
  listElement.innerText = value + " ";

  // add delete button
  const deleteElem = document.createElement("button");
  deleteElem.innerText = "delete";
  deleteElem.onclick = function () {
    // remove list item here
    listElement.remove();

    return;
  };
  listElement.appendChild(deleteElem);

  // when click, show input, with confirm and cancel button

  listElement.onclick = function (event) {
    elementList = event.target;
    if (elementList) {
      elementList.style.display = "none";

      // check if element has been remove (L#34)
      if (elementList.children.length == 0) {
        return
      }

      // remove delete button (otherwise will be in the innerText)
      elementList.removeChild(deleteElem);

      text = elementList.innerText;

      // Create an input
      input = document.createElement("input");
      input.type = "text";
      input.value = text;
      input.size = Math.max((text.length / 4) * 3, 4);
      elementList.parentNode.insertBefore(input, elementList);

      // add cancel button
      const cancelElem = document.createElement("button");
      cancelElem.innerText = "cancel";
      cancelElem.onclick = function () {
        // Remove the input
        elementList.parentNode.removeChild(input);

        // Show the elementList again
        elementList.style.display = "";

        // Remove the button
        elementList.parentNode.removeChild(confirmElem);
        elementList.parentNode.removeChild(cancelElem);

        // Add remove button
        elementList.appendChild(deleteElem);

        return;
      };

      // add confirm button
      const confirmElem = document.createElement("button");
      confirmElem.innerText = "confirm";
      confirmElem.onclick = function () {
        // Remove the input
        elementList.parentNode.removeChild(input);

        // Update the text
        elementList.innerHTML = input.value == "" ? "&nbsp;" : input.value;

        // Show the elementList again
        elementList.style.display = "";

        // Remove the button
        elementList.parentNode.removeChild(confirmElem);
        elementList.parentNode.removeChild(cancelElem);

        // Add remove button
        elementList.appendChild(deleteElem);

        return;
      };

      // add button
      elementList.parentNode.appendChild(confirmElem);
      elementList.parentNode.appendChild(cancelElem);
    }
  };

  // ajouter le li
  todoContainer.appendChild(listElement);

  // vider l'input
  todoInput.value = "";
});
