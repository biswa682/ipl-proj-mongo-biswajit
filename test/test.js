const expect = require("chai").expect;
const operations = require("../src/operations");
const path = require("path");
const MongoClient = require('mongodb').MongoClient;

describe("getNoOfMatchesPerYear", function(){
	it("should return the number of IPL matches per year", async function(){
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

describe("Checking the no of matches by per year per team", function(){
	it("No of matches per team list", async function(){
		let expectedOutput = [
			{
				_id: "Rising Pune Supergiant",
				number: [1],
				years: [2016]
			},
			{
				_id: "Sunrisers Hyderabad",
				number: [1],
				years: [2017]
			},
			{
				_id: "Kings XI Punjab",
				number: [1, 2],
				years: [2013, 2015]
			},
			{
				_id: "Kolkata Knight Riders",
				number: [1],
				years: [2016]
			},
			{
				_id: "Mumbai Indians",
				number: [2, 1],
				years: [2013, 2014]
			},
			{
				_id: "Royal Challengers Bangalore",
				number: [1],
				years: [2015]
			}];
		const url = "mongodb://localhost:27017";
		const dbName = "testDataIpl";
		const testMatchFile = "countMatchesPerYe";
		const output = await operations.getAllWinnerPerYear(MongoClient,dbName, testMatchFile, url)
		// console.log(output)
		expect(output).deep.equals(expectedOutput);
	});
});

describe("Checking the extra run in per team", function(){
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


describe("Checking the top 10 economical bowler list", function(){
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

describe("Checking the top 10 strike rate list", function(){
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

