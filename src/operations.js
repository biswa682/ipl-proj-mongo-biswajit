
async function getNoOfMatchesPerYear(MongoClient,dbName,testMatchFile, url){
	 const conn = await MongoClient.connect(url, {useNewUrlParser: true});
     const iplData = conn.db(dbName);
     let matchData = await iplData.collection(testMatchFile).aggregate([
		{
			$group:{
				_id:"$season",
				winner: {
					$sum: 1
				}
			}
		},
		{
			$project:{
				_id: 0,
				name: "$_id",
				y: "$winner"
			}
		},
		{
			$sort:{
				name: 1
			}
		}
		]).toArray();
	 return matchData;
}

async function getAllWinnerPerYear(MongoClient,dbName, matchsFile, url){
    const conn = await MongoClient.connect(url, {useNewUrlParser: true});
    const iplData = conn.db(dbName);
    let matchData = await iplData.collection(matchsFile).aggregate([
    {
        $group:{
            _id:{
                season : "$season",
                team: "$winner",
            },
            count: {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            _id: 1
        }
    },
    {
        $group:{
            _id:"$_id.team",
            number:{
                $push: "$count"
            },
            years:{
                $push: "$_id.season"
            }
        }
    },
    {
        $project:{
            _id: 1,
            number: 1,
            years: 1,
        }
    }
    ]).toArray();
    return matchData;
}

async function getExtraRunIn2016(MongoClient,dbName, matchesFile, deliveriesFile, url){
	const conn = await MongoClient.connect(url, {useNewUrlParser: true});
	const iplData = conn.db(dbName);
	let a = await iplData.collection(matchesFile).aggregate([
	{
		$match:{
			season: 2016
		}
	},
	{ 
        $lookup: { 
            "from": deliveriesFile, 
            "localField": 'id', 
            "foreignField": 'match_id', 
            "as": 'matchDetails' 
        } 
    },
    {
    	$unwind: "$matchDetails"
    },
    {
    	$group:{
    		_id: "$matchDetails.bowling_team",
    		y:{
    			$sum: "$matchDetails.extra_runs"
    		}
    	}
    },
    {
    	$project:{
    		_id:0,
    		name: "$_id",
    		y: 1
    	}
    },
    {
    	$sort:{
    		y: 1
    	}	
    }
	]).toArray();
	return a;
}

async function getEconomicalBowlerIn2015(MongoClient,dbName,matchsFile, deliveriesFile, url, top){
	const conn = await MongoClient.connect(url, {useNewUrlParser: true});
	const iplData = conn.db(dbName);
	let matchData = await iplData.collection(matchsFile).aggregate([
	{
		$match:{
			season: 2015
		}
	},
	{ 
        $lookup: { 
            "from": deliveriesFile, 
            "localField": 'id', 
            "foreignField": 'match_id', 
            "as": 'matchDetails' 
        } 
    },
    {
    	$unwind: "$matchDetails"
    },
    {
    	$group:{
    		_id: "$matchDetails.bowler",
    		wideRuns: {
    			$sum: "$matchDetails.wide_runs"
    		},
    		noballRuns: {
    			$sum: "$matchDetails.noball_runs"
    		},
    		batsmanRuns: {
    			$sum: "$matchDetails.batsman_runs"
    		},   		
    		noOfBowl:{
    			$sum: 1
    		}
    	}
    },
    {
    	$project:{
    		_id:0,
    		name: "$_id",
    		y: {
    			$multiply: [{$divide: [{$add: ["$wideRuns","$noballRuns","$batsmanRuns"]}, "$noOfBowl"]}, 6]
    		}
    	}
    },
    {
    	$sort:{
    		y: 1,
    		name: -1,
    	}
    },
    {
    	$limit: top
    }
	]).toArray();
	return matchData;
}


async function getTopStrikeRateIn2017(MongoClient,dbName,matchsFile, deliveriesFile, url, top){
	const conn = await MongoClient.connect(url, {useNewUrlParser: true});
	const iplData = conn.db(dbName);
	let matchData = await iplData.collection(matchsFile).aggregate([
	{
		$match:{
			season: 2017
		}
	},
	{ 
        $lookup: { 
            "from": deliveriesFile, 
            "localField": 'id', 
            "foreignField": 'match_id', 
            "as": 'matchDetails' 
        } 
    },
    {
    	$unwind: "$matchDetails"
    },
    {
    	$group:{
    		_id: "$matchDetails.batsman",
    		totalRun: {
    			$sum: "$matchDetails.batsman_runs"
    		},
    		noOfBowl:{
    			$sum: 1
    		}
    	}
    },
    {
    	$project:{
    		_id:0,
    		name: "$_id",
    		y: {
    			$multiply: [{$divide: ["$totalRun", "$noOfBowl"]}, 100]
    		}
    	}
    },
    {
    	$sort:{
    		y: -1
    	}
    },
    {
    	$limit: top
    }
	]).toArray();
	return matchData;
}
async function checkFunction(MongoClient,dbName, url){
	return true;
}


module.exports = {
	getNoOfMatchesPerYear : getNoOfMatchesPerYear,
	getAllWinnerPerYear : getAllWinnerPerYear,
	getExtraRunIn2016 : getExtraRunIn2016,
	getEconomicalBowlerIn2015 : getEconomicalBowlerIn2015,
	getTopStrikeRateIn2017 : getTopStrikeRateIn2017,
	checkFunction : checkFunction
}