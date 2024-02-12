function createNewList () {
  const listName = getTextBoxContents();
  if (listName) {
    lists[listName + '.' + new Date().getTime()] = new ListBinding(listName)
    console.log(`${listName} has been added successfully!`);
  } else {
    console.log('Text field is empty')
  }
  document.getElementById('list-name-text-box').value = '';
}

function getTextBoxContents () {
  const listNameTextBoxContents = document.getElementById('list-name-text-box').value;
  return listNameTextBoxContents;
}

document.getElementById('list-name-text-box').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    createNewList();
  }
})