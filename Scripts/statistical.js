function getCountryName(){
    let temp = window.location.search;
    var countrySlug = "";
    var countryName = "";
    var countryCode = "";

    let i=1;
    while(temp[i] !== "&"){
        countrySlug += temp[i];
        i++;
    }

    i++;
    while(temp[i] !== "&"){
        countryName += temp[i];
        i++;
    }

    i++;
    while(i < temp.length){
        countryCode += temp[i];
        i++;
    }

    
    countryName = countryName.replace(/-/g, " ");
    var country = [{
        Name: countryName,
        Slug: countrySlug,
        Code: countryCode
    }];

    return country;
}

function statistics(countrySlug = "", countryName = "", countryCode = ""){

    if(countrySlug === ""){
        console.log("No country given");
        console.log("Loading Global Statistics");


        let summary = getSummaryData();

        
        summary.then(summary => {
            let imgUrl = "Images\\gif\\GlobalPic.gif";
            let style = "color:rgb(139,148,155);font:sans-serif;font-size:70px;";
            let name = "Global";

            let printName = "<center>";
            printName += "<img src=" + imgUrl + " style=width:96px;height:96px;></br>"
            printName += "<span style=" + style + ">" + name + "</span>";

            

            style = "font-family:sans-serif;font-weight:bold;margin:5px 0px;";

            let printInfo = "<center>";
            printInfo += "<p style=color:#555;font-size:50px;"+ style + ">Confirmed Cases</p>";
            printInfo += "<p style=color:#ffffff;font-size:45px;"+ style + ">" + numberWithCommas(summary.Global.TotalConfirmed) + "</p>"
            printInfo += "</br></br></br>";
            printInfo += "<p style=color:#f95858;font-size:50px;"+ style + ">Deaths</p>";
            printInfo += "<p style=color:#ffffff;font-size:45px;"+ style + ">" + numberWithCommas(summary.Global.TotalDeaths) + "</p>"
            printInfo += "</br></br></br>";
            printInfo += "<p style=color:#90ee90;font-size:50px;"+ style + ">Recovered</p>";
            printInfo += "<p style=color:#ffffff;font-size:45px;"+ style + ">" + numberWithCommas(summary.Global.TotalRecovered) + "</p>"

            /*
            ===================
            Graphs
            ===================
            */

            let printGraphs = "<center>";
            printGraphs += "<div id='globalStatisticsGraph'>";
            printGraphs += "</div></center>";
            printGraphs += "<br>";

            /*
            ===================
            Table
            ===================
            */

           let printSearchBar = "<form action=''>";
           printSearchBar += "<input id='tableSearchBar' type='search' placeholder='Search for Country' onkeyup='searchTable()'>";
           printSearchBar += "<i id='tableSearchButton' class='fa fa-search' onclick='searchTable()'></i>";
           printSearchBar += "</form><br>";

           let TableHead = "<table id='countryTable' class='sexyTable'>";
           TableHead += "<thead><tr>";
           TableHead += "<th onclick='sortTable(0)' rel='Sort By Country'> Country </th>";
           TableHead += "<th> Cases </th>";
           TableHead += "<th> Deaths </th>";
           TableHead += "<th> Recovered </th>";
           TableHead += "<th> Last Updated </th>";
           TableHead += "<th></th>";
           TableHead += "</tr></thead>";
 
 
           let numCountries = Object.keys(summary.Countries).length;
           var i = 0;
           var TableBody = "<tbody>";
           var row = "";
           var totalConfirmed=0, totalDeaths=0, totalRecovered=0;
           var totalNewConfirmed=0, totalNewDeaths=0, totalNewRecovered=0;
 
           for (i=0;i<numCountries;i++){
 
             //For country links
             let countrySlug = summary.Countries[i].Slug;
             let countryName = summary.Countries[i].Country;
             let countryCode = summary.Countries[i].CountryCode;
             let link = "'statistics.html?" + countrySlug + "&" + countryName + "&" + countryCode +  "'";
             link = link.replace(/\s/g, "-");
 
             if(summary.Countries[i].TotalConfirmed === 0){
               console.log("No data for this country");
             }
 
             let code = summary.Countries[i].CountryCode;
             let imgLink = "https://www.countryflags.io/" + code + "/shiny/24.png";
             totalConfirmed += summary.Countries[i].TotalConfirmed;
             totalDeaths += summary.Countries[i].TotalDeaths;
             totalRecovered += summary.Countries[i].TotalRecovered;
 
             totalNewConfirmed += summary.Countries[i].NewConfirmed;
             totalNewDeaths += summary.Countries[i].NewDeaths;
             totalNewRecovered += summary.Countries[i].NewRecovered;
 
             row += "<tr>";
 
             row += "<td><img src="+ imgLink + "></img><span style=font-weight:bold;cursor:pointer; onclick=location.href=" + link + ";> " + summary.Countries[i].Country + "</span></td>";
 
 
             if(summary.Countries[i].TotalConfirmed === 0){ //Total Confirmed Case(s)
               row += "<td></td>";
             }
             else {
               row += "<td>" + numberWithCommas(summary.Countries[i].TotalConfirmed) + "</td>";
             }
 
 
             if(summary.Countries[i].TotalDeaths === 0){ //Total Death(s)
               row += "<td></td>";
             }
             else {
               row += "<td>" + numberWithCommas(summary.Countries[i].TotalDeaths) + "</td>";
             }
 
 
             if(summary.Countries[i].TotalRecovered === 0){ //Total Recovered
               row += "<td></td>";
             }
             else {
               row += "<td>" + numberWithCommas(summary.Countries[i].TotalRecovered) + "</td>";
             }
 
             row += "<td>" + formatDate(summary.Countries[i].Date) + "</td>";
 
 
             row += "<td><button class=SexyButton onclick=location.href=" + link + ";> Statistics </button></td>";
             row += "</tr>";
 
             if(i === (numCountries-1)){
               row += "<th><center> Total: </center></th>";
               row += "<td>" + numberWithCommas(totalConfirmed) + "</td>";
               row += "<td>" + numberWithCommas(totalDeaths) + "</td>";
               row += "<td>" + numberWithCommas(totalRecovered) + "</td>";
               row += "<td></td>";
 
               row += "<td><button class=SexyButton onclick=location.href='statistics.html';> Statistics </button></td>";
               row += "</tr>";
 
               TableBody += row;
             }
 
 
 
           }
 
           TableBody += "</tbody></table>";
           


            /*====================================================*/

            document.getElementById("CountryName").innerHTML = printName;
            document.getElementById("CountryInfo").innerHTML = printInfo;
            document.getElementById("Graphs").innerHTML = printGraphs;
            document.getElementById("Tablee").innerHTML = printSearchBar + TableHead + TableBody;

            createConfigGlobal(summary);
        });
    }
    else{
        console.log("Country given: " + countryName);
        console.log("Loading " + countryName + " Statistics");


        let summary = getCountryData(countrySlug);

        
        summary.then(summary => {

            let imgUrl = "https://www.countryflags.io/" + countryCode + "/shiny/24.png";
            let style = "color:rgb(139,148,155);font:sans-serif;font-size:70px;";

            let printName = "<center>";
            printName += "<img src=" + imgUrl + " style=width:96px;height:96px;></br>"
            printName += "<span style=" + style + ">" + countryName + "</span>";

            let data = Object.keys(summary[0].Confirmed).length - 1; //This is index of the latest data

            style = "font-family:sans-serif;font-weight:bold;margin:5px 0px;";

            let printInfo = "<center>";
            printInfo += "<p style=color:#555;font-size:50px;"+ style + ">Confirmed Cases</p>";
            printInfo += "<p style=color:#ffffff;font-size:45px;"+ style + ">" + numberWithCommas(summary[0].Confirmed[data].Cases) + "</p>"
            printInfo += "</br></br></br>";
            printInfo += "<p style=color:#f95858;font-size:50px;"+ style + ">Deaths</p>";
            printInfo += "<p style=color:#ffffff;font-size:45px;"+ style + ">" + numberWithCommas(summary[0].Deaths[data].Cases) + "</p>"
            printInfo += "</br></br></br>";
            printInfo += "<p style=color:#90ee90;font-size:50px;"+ style + ">Recovered</p>";
            printInfo += "<p style=color:#ffffff;font-size:45px;"+ style + ">" + numberWithCommas(summary[0].Recovered[data].Cases) + "</p>"


            /*
            ===================
            Graphs
            ===================
            */
            var config1 = createConfig1(summary);
            var config2 = createConfig2(summary);

            let printGraphs = "<center>";
            printGraphs += "<div id='statisticsGraph1'>";
            printGraphs += "<canvas id='canvas1' style='border: solid #000; border-width: 2px;'></canvas>";
            printGraphs += "</div></center>";
            printGraphs += "<br><br><br><br>";
            printGraphs += "<center>";
            printGraphs += "<div id='statisticsGraph2'>";
            printGraphs += "<canvas id='canvas2' style='border: solid #000; border-width: 2px;'></canvas>";
            printGraphs += "</div></center>";


            /*
            ===================
            Table
            ===================
            */

    
            let printSearchBar = "<form action=''>";
            printSearchBar += "<input id='tableSearchBar' type='search' placeholder='Search for Country' onkeyup='searchTable()'>";
            printSearchBar += "<i id='tableSearchButton' class='fa fa-search' onclick='searchTable()'></i>";
            printSearchBar += "</form><br>";
    
            let TableHead = "<table id='statisticsTable' class='sexyTable'>";
            TableHead += "<thead><tr>";
            TableHead += "<th> Cases </th>";
            TableHead += "<th> New Cases </th>";
            TableHead += "<th> Deaths </th>";
            TableHead += "<th> New Deaths </th>";
            TableHead += "<th> Recovered </th>";
            TableHead += "<th> New Recovered </th>";
            TableHead += "<th> Date </th>";
            TableHead += "</tr></thead>";


            let numEntries = Object.keys(summary[0].Confirmed).length;
            var i = 0;
            var TableBody = "<tbody>";
            var row = "";
            var x, y, diff;


            for (i=0;i<numEntries;i++){

                if(summary[0].Confirmed[i].Cases === 0){
                    console.log("No data in this array");
                }
                else{
                    row += "<tr style=height:55px>";

                    if(summary[0].Confirmed[i].Cases === 0){ //Total Confirmed Case(s)
                        row += "<td></td>";
                    }
                    else {
                        row += "<td>" + numberWithCommas(summary[0].Confirmed[i].Cases) + "</td>";
                    }


                    if(i > 0){ //New Confirmed Case(s)
                        x = summary[0].Confirmed[i].Cases;
                        y = summary[0].Confirmed[i-1].Cases;
                        diff = x - y;
                        if(diff === 0){
                            row += "<td></td>";
                        }
                        else if(diff < 0){
                            row += "<td></td>";
                        }
                        else if(diff > 0){
                            row += "<td>+" + diff + "</td>";
                        }
                    }
                    else {
                        row += "<td></td>";
                    }


                    if(summary[0].Deaths[i].Cases === 0){ //Total Death(s)
                        row += "<td></td>";
                    }
                    else {
                        row += "<td>" + numberWithCommas(summary[0].Deaths[i].Cases) + "</td>";
                    }


                    if(i > 0){ //New Death(s)
                        x = summary[0].Deaths[i].Cases;
                        y = summary[0].Deaths[i-1].Cases;
                        diff = x - y;
                        if(diff === 0){
                            row += "<td></td>";
                        }
                        else if(diff < 0){
                            row += "<td></td>";
                        }
                        else if(diff > 0){
                            row += "<td>+" + diff + "</td>";
                        }
                    }
                    else {
                        row += "<td></td>";
                    }


                    if(summary[0].Recovered[i].Cases === 0){ //Total Recovered
                        row += "<td></td>";
                    }
                    else {
                        row += "<td>" + numberWithCommas(summary[0].Recovered[i].Cases) + "</td>";
                    }


                    if(i > 0){ //New Recovered
                        x = summary[0].Recovered[i].Cases;
                        y = summary[0].Recovered[i-1].Cases;
                        diff = x - y;
                        if(diff === 0){
                            row += "<td></td>";
                        }
                        else if(diff < 0){
                            row += "<td></td>";
                        }
                        else if(diff > 0){
                            row += "<td>+" + diff + "</td>";
                        }
                    }
                    else {
                        row += "<td></td>";
                    }


                    row += "<td>" + formatDate(summary[0].Confirmed[i].Date) + "</td>";
                    row += "</tr>";

                }


            }

            TableBody += row;
            TableBody += "</tbody></table>";
            
            /*====================================================*/

            document.getElementById("CountryName").innerHTML = printName;
            document.getElementById("CountryInfo").innerHTML = printInfo;
            document.getElementById("Graphs").innerHTML = printGraphs;
            document.getElementById("Tablee").innerHTML = TableHead + TableBody;


            var ctx1 = document.getElementById('canvas1').getContext('2d');
            var ctx2 = document.getElementById('canvas2').getContext('2d');
            
            new Chart(ctx1, config1);
            new Chart(ctx2, config2);
        });
    }
}