var ListView = function(listItems){
  this.render(listItems);
}

ListView.prototype = {
  render: function(listItems){
    console.log(listItems);
    listItems.forEach( function(item){
      var li = document.createElement('li');
      var text = document.createElement('p');
      var ul = document.getElementById('bucket-list');
      text.innerText = item.name;
      li.appendChild(text);
      ul.appendChild(li);
    })
  }
}

module.exports = ListView;