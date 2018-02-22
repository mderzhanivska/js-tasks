function openTab(tabName) {
  var i;
  const tab = document.getElementsByClassName('tabs__tab');
  for (i = 0; i < tab.length; i++) {
    tab[i].style.display = 'none';
  }
  document.getElementById(tabName).style.display = 'block';
}

