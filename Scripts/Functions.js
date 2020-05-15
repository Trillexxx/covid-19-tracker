function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function formatDate(givenDate) {
  var temp = "";
  for(let i=0;i<10;i++){
    temp += givenDate[i];
  }

  let day = temp[8] + temp[9];
  let month = temp[5] + temp[6];
  let year = temp[0] + temp[1] + temp[2] + temp[3];


  let date = new Date(year, month-1, day);
  temp = date.toDateString();
  date = "";
  for(let i=3; i < 15; i++){
    date += temp[i];
  }


  return date;
}

function searchTable() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("tableSearchBar");
  filter = input.value.toUpperCase();
  table = document.getElementById("countryTable") || document.getElementById("statisticsTable");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}