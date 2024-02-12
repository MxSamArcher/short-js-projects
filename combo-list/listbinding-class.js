class ListBinding {
  // Constructor for initializing a new ListBinding object
  constructor (listName) {
    // Assign passed listName to the instance
    this.listName = listName;

    // Generate a unique ID based on the list name and current time
    this.listElement = listName + '.' + new Date().getTime();
    
    // Initialize an empty array to store list items
    this.objectList = [];

    // Create the main container for this list
    this.createAndAttachElement ('parentDiv', 'div', document.getElementById('main-container'));

    // Create and append elements related to the header
    this.createAndAttachElement ('headerDiv', 'div', this.parentDiv);
    this.createAndAttachElement ('listHeader', 'h3', this.headerDiv);
    this.listHeader.innerHTML = this.listName;

    // Create and append elements related to the text box for list items
    this.createAndAttachElement ('listItemTextBoxDiv', 'div', this.parentDiv);
    this.createAndAttachElement ('listItemTextBox', 'input', this.listItemTextBoxDiv);
    this.listItemTextBox.type = 'text';
    // Date picker:
    this.createAndAttachElement ('dueDateSelector', 'input', this.listItemTextBoxDiv);
    this.dueDateSelector.type = 'date';
    
    // Event listener to detect 'Enter' key press in the text box
    this.listItemTextBox.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        this.add(this.listItemTextBox.value);
      }
    }.bind(this));
    
    // Create and append button to add a list item
    this.createAndAttachElement ('addLiButton', 'button', this.listItemTextBoxDiv);
    this.addLiButton.innerHTML = 'Add a list item'
    this.addLiButton.onclick = function () {
      const listItemTextBoxValue = this.listItemTextBox.value;
      const dueDateSelectorValue = this.dueDateSelector.value;
      this.add(`${listItemTextBoxValue} - Due date: ${dueDateSelectorValue}`);
    }.bind(this);
    
    // Create and append elements related to the controller
    this.createAndAttachElement ('controllerDiv', 'div', this.parentDiv);

    // Create and append elements related to the view  
    this.createAndAttachElement ('viewDiv', 'div', this.parentDiv);

    // Create and append unordered list to display list items
    this.createAndAttachElement ('pageULElement', 'ul', this.viewDiv);
    this.pageULElement.addEventListener ('click', function(event) {
      if (event.target.tagName.toLowerCase() === 'li') {
        this.remove (event.target.textContent);
      }
    }.bind(this));

    this.update();
  }

  // Method to create and append a new element
  createAndAttachElement (elementVarName, elementTypeString, parentContainer) {
    let element = document.createElement(elementTypeString);
    parentContainer.appendChild(element);
    this[elementVarName] = element;
    console.log(this[elementVarName])
  }

   // Static method to create a list item element (<li>)  - used in update()
  static createListItem (listItem) {
    const li = document.createElement('li');

    li.innerHTML = listItem;

    return li;
  }

  // Method to update the display of list items
  update () {
    this.pageULElement.innerHTML = '';

    for (const listItem of this.objectList) {
      // Create an <li> element and put it inside the objectList array.
      this.pageULElement.appendChild(ListBinding.createListItem(listItem));
    }
  }

  add (itemToAdd) {
    this.objectList.push(itemToAdd);
    this.update();
    this.listItemTextBox.value = '';
  }

  // Remove any element with the referred property from the this.objectList
  remove (itemToRemove) {
    this.objectList = this.objectList.filter(listItem => listItem !== itemToRemove);
    this.update();
  }
}