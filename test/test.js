const expect = require("chai").expect;
const operations = require("../src/operations");
const path = require("path");
const MongoClient = require('mongodb').MongoClient;

xdescribe("Checking the no of matches", function(){
	it("Check the output data", async function(){
		const expectedOutput= [
			{
				name: 2013,
				y: 3
			},
			{
				name: 2014,
				y: 1
			},
			{
				name: 2015,
				y: 3
			},
			{
				name: 2016,
				y: 2
			},
			{
				name: 2017,
				y: 1
			}];			
		const url = "mongodb://localhost:27017";
		const dbName = "testDataIpl";
		const testMatchFile = "countMatchesPerYe";
		const output = await operations.getNoOfMatchesPerYear(MongoClient,dbName, testMatchFile, url)
		expect(output).deep.equals(expectedOutput);
		
	});
});

xdescribe("Checking the extra run in per team", function(){
	it("Check the output data", async function(){
		const expectedOutput= [
		{
			name: "Royal Challengers Bangalore",
			y: 1
		},
		{
			name: "Kolkata Knight Riders",
			y: 3
		},
		{
			name: "Kings XI Punjab",
			y: 4
		},
		{
			name: "Mumbai Indians",
			y: 6
		},
		{
			name: "Rising Pune Supergiant",
			y: 19
		}];
		const url = "mongodb://localhost:27017";
		const dbName = "testDataIpl";
		const testMatchFile = "seasonOfMatches";
		const testDeliveryFile = "deliveryOfExtraRun";
		const output = await operations.getExtraRunIn2016(MongoClient,dbName, testMatchFile, testDeliveryFile, url);
		expect(output).deep.equals(expectedOutput);
		
	});
});

xdescribe("Checking the top 10 economical bowler list", function(){
	it("Check the output data", async function(){
		const expectedOutput= [
		{
			name: "YS Chahal",
			y: 10
		},
		{
			name: "TS Mills",
			y: 12
		}];
		const url = "mongodb://localhost:27017";
		const dbName = "testDataIpl";
		const testMatchFile = "seasonOfMatches";
		const testDeliveryFile = "deliveryOfExtraRun";
		const output = await operations.getEconomicalBowlerIn2015(MongoClient,dbName,testMatchFile, testDeliveryFile, url, 2);
		expect(output).deep.equals(expectedOutput);		
	});
});

xdescribe("Checking the top 10 strike rate list", function(){
	it("Check the output data", async function(){
		const expectedOutput= [
		{
			name: "DJ Hooda",
			y: 180
		},
		{
			name: "Yuvraj Singh",
			y: 100
		}];
		const url = "mongodb://localhost:27017";
		const dbName = "testDataIpl";
		const testMatchFile = "seasonOfMatches";
		const testDeliveryFile = "deliveryOfExtraRun";
		const output = await operations.getTopStrikeRateIn2017(MongoClient,dbName,testMatchFile, testDeliveryFile, url, 2);
		expect(output).deep.equals(expectedOutput);		
	});
});

