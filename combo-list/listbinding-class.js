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
      this.createAndAttachElement ('parentDiv', 'div', 'main-container');

      // Create and append elements related to the header
      this.createAndAttachElement ('headerDiv', 'div', this.parentDiv.id);
      this.createAndAttachElement ('listHeader', 'h3', this.headerDiv.id);
      this.listHeader.innerHTML = this.listName;

      // Create and append elements related to the text box for list items
      this.createAndAttachElement ('listItemTextBoxDiv', 'div', this.parentDiv.id);
      this.createAndAttachElement ('listItemTextBox', 'input', this.listItemTextBoxDiv.id);
      this.listItemTextBox.type = 'text';
      
      // Event listener to detect 'Enter' key press in the text box
      let thisTextBoxId = this.listItemTextBox.id
      document.getElementById(thisTextBoxId).addEventListener('keydown', function(event) {
          if (event.key === 'Enter') {
              let listItemTextBoxValue = document.getElementById(thisTextBoxId).value;
              this.add(listItemTextBoxValue);
          }
      }.bind(this));
      
      // Create and append button to add a list item
      this.createAndAttachElement ('addLiButton', 'button', this.listItemTextBoxDiv.id);
      this.addLiButton.innerHTML = 'Add a list item'
      this.addLiButton.onclick = function () {
          let listItemTextBoxValue = document.getElementById(thisTextBoxId).value;
          this.add(listItemTextBoxValue);
      }.bind(this);
      
      // Create and append elements related to the controller
      this.createAndAttachElement ('controllerDiv', 'div', this.parentDiv.id);

      // Create and append elements related to the view  
      this.createAndAttachElement ('viewDiv', 'div', this.parentDiv.id);

      // Create and append unordered list to display list items
      this.createAndAttachElement ('pageULElement', 'ul', this.viewDiv.id);
      this.pageULElement.addEventListener ('click', function(event) {
          if (event.target.tagName.toLowerCase() === 'li') {
              this.remove (event.target.textContent);
          }
      }.bind(this));

      this.update();
  }

  // Method to create and append a new element
  createAndAttachElement (elementVarName, elementTypeString, parentContainerString) {
      let element = document.createElement(elementTypeString);
      element.id = this.listElement + elementVarName;
      document.getElementById(parentContainerString).appendChild(element);
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
      document.getElementById(this.listItemTextBox.id).value = '';
  }

  // Remove any element with the referred property from the this.objectList
  remove (itemToRemove) {
      this.objectList = this.objectList.filter(listItem => listItem !== itemToRemove);
      this.update();
  }
}