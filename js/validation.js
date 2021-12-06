var incomeText=[];
var incomeAmount=[];


function showMonth()
{
	const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	const dateObj = new Date()
	const monthNumber = dateObj.getMonth()
	const monthName = monthNames[monthNumber]
	document.write(monthName);
}

function initialise()
{
	//This function will initialise the variable to be stored
	
		var retrievedData = localStorage.getItem("income");
		var incomeText = JSON.parse(retrievedData);

		var retrievedData2 = localStorage.getItem("incomeAmount");
		var incomeAmount = JSON.parse(retrievedData2);
		var totalIncome = 0;

		//calculate total income
		for (var i = 0; i < incomeAmount.length; i++) 
		{
			totalIncome += parseInt(incomeAmount[i]);
		}
		
		document.getElementById('detailsInc').innerHTML = "";
		
		for(i=0;i<incomeText.length;i++)
		{
			document.getElementById('detailsInc').innerHTML += incomeText[i] + " :: " + incomeAmount[i] + "<br>"
		}
		document.getElementById('detailsInc').innerHTML += "Total Income: " + totalIncome + "<br>"
		
		//update top div summary
		document.getElementById('incomevalue').innerHTML = totalIncome + "<a href='#incdetails' title='more details'> [+] </a>";

		var retrievedData = localStorage.getItem("expense");
		var expenseText = JSON.parse(retrievedData);

		var retrievedData2 = localStorage.getItem("expenseAmount");
		var expenseAmount = JSON.parse(retrievedData2);
		var totalExpense = 0;

		//calculate total expense
		for (var i = 0; i < expenseAmount.length; i++) 
		{
			totalExpense += parseInt(expenseAmount[i]);
		}
		
		document.getElementById('detailsExp').innerHTML = "";
		
		for(i=0;i<expenseText.length;i++)
		{
			document.getElementById('detailsExp').innerHTML += expenseText[i] + " :: " + expenseAmount[i] + "<br>"
		}

		document.getElementById('detailsExp').innerHTML += "Total Expense: " + totalExpense + "<br>"

		//update top div summary
		document.getElementById('expensevalue').innerHTML = totalExpense + "<a href='#expdetails' title='more details'> [+] </a>";

		//update profit
		document.getElementById('profitvalue').innerHTML =  totalIncome - totalExpense;

		createExpenseChart(expenseText,expenseAmount);
		createIncomeChart(incomeText,incomeAmount);

}

function store(type,description,amount)
{
	if(type==='Expense')
	{
		var expenseText=[""];
		var expenseAmount=[""];

		try
		{
			var retrievedData = localStorage.getItem("expense");
			expenseText = JSON.parse(retrievedData);
			indexexpenseText=expenseText.length;

			var retrievedData1 = localStorage.getItem("expenseAmount");
			expenseAmount = JSON.parse(retrievedData1);
			indexexpenseAmount=expenseAmount.length;

		}
		catch(error)
		{
		  indexexpenseText=0;
		  var expenseText=[];
		  // Note - error messages will vary depending on browser
		  indexexpenseAmount = 0;

		}
		
		expenseText[indexexpenseText] = description;
		expenseAmount[indexexpenseAmount] = amount;
	
		// storing our array as a string
		localStorage.setItem("expense", JSON.stringify(expenseText));
		localStorage.setItem("expenseAmount", JSON.stringify(expenseAmount));
		 
		// retrieving our data and converting it back into an array
		var retrievedData = localStorage.getItem("expense");
		var expenseText = JSON.parse(retrievedData);

		var retrievedData2 = localStorage.getItem("expenseAmount");
		var expenseAmount = JSON.parse(retrievedData2);

		document.getElementById('detailsExp').innerHTML = "";
		for(i=0;i<expenseText.length;i++)
		{
			document.getElementById('detailsExp').innerHTML += expenseText[i] + "::" + expenseAmount[i] + "<br>"
		}

		createExpenseChart(expenseText,expenseAmount);


	}
	else if(type == 'Income')
	{
		var incomeText=[""];
		var incomeAmount=[""];

		try
		{
			var retrievedData = localStorage.getItem("income");
			incomeText = JSON.parse(retrievedData);
			indexIncomeText=incomeText.length;

			var retrievedData1 = localStorage.getItem("incomeAmount");
			incomeAmount = JSON.parse(retrievedData1);
			indexIncomeAmount=incomeAmount.length;

		}
		catch(error)
		{
		  indexIncomeText=0;
		  var incomeText=[];
		  // Note - error messages will vary depending on browser
		  indexIncomeAmount = 0;
		}
		
		incomeText[indexIncomeText] = description;
		incomeAmount[indexIncomeAmount] = amount;
	
		// storing our array as a string
		localStorage.setItem("income", JSON.stringify(incomeText));
		localStorage.setItem("incomeAmount", JSON.stringify(incomeAmount));
		 
		// retrieving our data and converting it back into an array
		var retrievedData = localStorage.getItem("income");
		var incomeText = JSON.parse(retrievedData);

		var retrievedData2 = localStorage.getItem("incomeAmount");
		var incomeAmount = JSON.parse(retrievedData2);

		document.getElementById('detailsInc').innerHTML = "";
		for(i=0;i<incomeText.length;i++)
		{
			document.getElementById('detailsInc').innerHTML += incomeText[i] + "::" + incomeAmount[i] + "<br>"
		}

		createIncomeChart(incomeText,incomeAmount);

	}
	
	initialise();
	
}


function validate()
{
	var description,amount,type_entry;

	description = document.getElementById('descriptiontxt').value;
	amount = document.getElementById('amounttxt').value;
	type_entry = document.getElementById("typeEntry").value

	//check if description is blank, show a warning message
	if (description=="")
	{
		document.getElementById('warningarea').innerHTML="Error - Type the description in the first input of this section.";
		return false;
	}

	if (amount=="")
	{
		document.getElementById('warningarea').innerHTML="Error - Type the amount in the second input of this section.";
		return false;
	}

	store(type_entry,description,amount);
}

function changeblink()
{
	document.getElementById('warningarea').innerHTML=".";
}

function clearLocal()
{
	localStorage.clear();
	incomeText=[];
	var incomeAmount=[];
	location.reload();
}

function createExpenseChart(labels,values)
{
	$('#myChart').remove();
    $('#displaychartExpense').append('<canvas id="myChart"></canvas>');

	myChart = document.getElementById('myChart').getContext('2d');
	barChart = new Chart(myChart,{
				type:'bar',//bar,pie,horizontalBar,radar
				data:{
					labels:labels,
					datasets:[{
						label:'Expense Tracker Summary',
						data:values,
						backgroundColor: [
			                'rgba(255, 99, 132, 1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)'
			            ]
					}]
				},
				options:{}
			});
	barChart.update();
}


function createIncomeChart(labels,values)
{
	$('#myChartIncome').remove();
    $('#displaychartIncome').append('<canvas id="myChartIncome"></canvas>');

	myChart = document.getElementById('myChartIncome').getContext('2d');
	barChart = new Chart(myChart,{
				type:'pie',//bar,pie,horizontalBar,radar
				data:{
					labels:labels,
					datasets:[{
						label:'Income Graph',
						data:values,
						backgroundColor: [
			                'rgba(255, 99, 132, 1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)'
			            ]
					}]
				},
				options:{}
			});

}