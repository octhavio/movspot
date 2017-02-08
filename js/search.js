
  var searchForm = document.getElementById('search-form');


searchForm.onsubmit = function(e) {
    e.preventDefault();

  var searchField = document.getElementById('search-field');

  var searchField = searchField.value;

  var searchTerms = searchField.replace(/([ .,;]+)/g,'+');

  searchTerms = searchTerms.toLowerCase();
 searchTerms = searchTerms.replace(/[á|ã|â|à]/gi, "a");
  searchTerms = searchTerms.replace(/[é|ê|è]/gi, "e");
  searchTerms = searchTerms.replace(/[í|ì|î]/gi, "i");
  searchTerms = searchTerms.replace(/[õ|ò|ó|ô]/gi, "o");
  searchTerms = searchTerms.replace(/[ú|ù|û]/gi, "u");
  searchTerms = searchTerms.replace(/[ç]/gi, "c");
  searchTerms = searchTerms.replace(/[ñ]/gi, "n");
  searchTerms = searchTerms.replace(/[á|ã|â]/gi, "a");




  //console.log(searchTerms);
  window.location.assign(siteurl+'search/'+searchTerms);

};
