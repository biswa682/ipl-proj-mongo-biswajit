const express = require("express");
const path = require("path");
const operations = require("./src/operations");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbName = "ipl-dat";

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get("/", function(req, res){
	res.render("index");
});
app.get('/first', async function(req, res){	
	const matchData = "matches";
	const data = await operations.getNoOfMatchesPerYear(MongoClient, dbName, matchData, url);
	res.render("noOfMatches", {data: JSON.stringify(data)});
});
app.get('/second', async function(req, res){
	const url = "mongodb://localhost:27017";
	const dbName = "ipl-data";
	const matchData = "matches";
	const data = await operations.getAllWinnerPerYear(MongoClient,dbName,matchData,url);
	res.render("winnerTeamPerYear", {data: JSON.stringify(data)});
});
app.get('/third', async function(req,res){
	const url = "mongodb://localhost:27017";
	const dbName = "ipl-data";
	const matchData = "matches";
	const deliveryData = "deliveries";
	const data = await operations.getExtraRunIn2016(MongoClient,dbName, matchData, deliveryData, url);
	res.render("extraRunInEachTeam",{data: JSON.stringify(data)});
});
app.get('/fourth', async function(req,res){
	const url = "mongodb://localhost:27017";
	const dbName = "ipl-data";
	const matchData = "matches";
	const deliveryData = "deliveries";
	const data = await operations.getEconomicalBowlerIn2015(MongoClient,dbName,matchData, deliveryData, url, 10);
	res.render("economicalBowlers",{data: JSON.stringify(data)});
});

app.get('/fifth', async function(req,res){
	const url = "mongodb://localhost:27017";
	const dbName = "ipl-data";
	const matchData = "matches";
	const deliveryData = "deliveries";
	const data = await operations.getTopStrikeRateIn2017(MongoClient,dbName,matchData, deliveryData, url, 10);
	res.render("strikerateOfBatsman",{data: JSON.stringify(data)});
});

app.listen(3002, function(){
	console.log("Server is running .........");
})