async function getSummaryData()
{
    var url = "https://api.covid19api.com/summary";
	var requestOptions = {
		method: 'GET',
		headers: {
			method: 'GET',
			redirect: 'follow'
		}
	};


	try{
		let response = await fetch(url, requestOptions);
        let summary = await response.json();       

		console.log(summary);
		//console.log(summary.Global.TotalConfirmed);

        return summary;
	  }catch(e){

		  document.getElementById("main").innerHTML = createErrorPage();
		  console.log(e);
      }
      
}


async function getCountryData(country)
{
	var urlConfirmed = "https://api.covid19api.com/total/country/" + country + "/status/confirmed";
	var urlDeaths = "https://api.covid19api.com/total/country/" + country + "/status/deaths";
	var urlRecovered = "https://api.covid19api.com/total/country/" + country + "/status/recovered";

	var requestOptions = {
		method: 'GET',
		headers: {
			method: 'GET',
			redirect: 'follow'
		}
	};


	try{
		let response1 = await fetch(urlConfirmed, requestOptions);
		let Confirmed = await response1.json();
		
		let response2 = await fetch(urlDeaths, requestOptions);
		let Deaths = await response2.json();
		
		let response3 = await fetch(urlRecovered, requestOptions);
		let Recovered = await response3.json();


		let summary = [
			{ 
			  Confirmed: Confirmed, 
			  Deaths: Deaths, 
			  Recovered: Recovered
			}
		];



		//console.log(summary);
		//console.log(summary[0].Confirmed[0].Cases);
		//console.log(formatDate(summary[0].Confirmed[0].Date));

        return summary;
	  }catch(e){
		document.getElementById("main").innerHTML = createErrorPage();
		console.log(e);
      }
      
}


function createErrorPage(){
	var printErrorScreen = "";
	printErrorScreen += "<div class='errorContainer'>";
	printErrorScreen += "<div class='error'>";
	printErrorScreen += "<div class='tear1 tear'></div>";
	printErrorScreen += "<div class='tear2 tear'></div>";
	printErrorScreen += "<div class='face'>";
	printErrorScreen += "<div class='eyebrow'>︶</div>";
	printErrorScreen += "<div class='eyebrow'>︶</div>";
	printErrorScreen += "<div class='eye'></div>";
	printErrorScreen += "<div class='eye'></div>";
	printErrorScreen += "<div class='mouth'></div>";
	printErrorScreen += "</div>";
	printErrorScreen += "</div>";

	printErrorScreen += "<br><br><br><br><br><br>";

	printErrorScreen += "<span style='color:#939393;font-size:75px;font:Arial;font-weight:bold;'>429</span>";
	printErrorScreen += "<br><br>";
	printErrorScreen += "<span style='color:#939393;font-size:35px;'>(Too Many Requests)</span>";
	printErrorScreen += "<br><br><br>";
	printErrorScreen += "<span style='color:#939393;font-size:20px;'>";
	printErrorScreen += "The information requested has been denied due to spam requests. <br>";
	printErrorScreen += "Please wait a few seconds then refresh page";
	printErrorScreen += "</span>";

	printErrorScreen += "</div>";
	printErrorScreen += "<br><br><br><br><br><br><br><br><br><br><br><br>";

	return printErrorScreen;
}
