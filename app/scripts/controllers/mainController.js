
angular.module('ethExplorer')
    .controller('mainCtrl', function ($rootScope, $scope, $location) {

	var web3 = $rootScope.web3;
	var maxBlocks = 5; // TODO: into setting file or user select
	var blockNum = $scope.blockNum = parseInt(web3.eth.blockNumber, 10);
	if (maxBlocks > blockNum) {
	    maxBlocks = blockNum + 1;
	}

	// get latest 50 blocks
	$scope.blocks = [];
	var block;
	for (var i = 0; i < maxBlocks; ++i) {
		block = web3.eth.getBlock(blockNum - i);
		block.timestamp = unixTimeToReadable(block.timestamp);
	    $scope.blocks.push(block);
	}
	
        $scope.processRequest = function() {
             var requestStr = $scope.ethRequest.split('0x').join('');

            if (requestStr.length === 40)
              return goToAddrInfos(requestStr)
            else if(requestStr.length === 64) {
              if(/[0-9a-zA-Z]{64}?/.test(requestStr))
                return goToTxInfos('0x'+requestStr)
              else if(/[0-9]{1,7}?/.test(requestStr))
                return goToBlockInfos(requestStr)
            }else if(parseInt(requestStr) > 0)
              return goToBlockInfos(parseInt(requestStr))

            alert('Don\'t know how to handle '+ requestStr)
        };


        function goToBlockInfos(requestStr) {
            $location.path('/block/'+requestStr);
        }

        function goToAddrInfos(requestStr) {
            $location.path('/address/'+requestStr);
        }

         function goToTxInfos (requestStr) {
             $location.path('/transaction/'+requestStr);
        }
	// query latest block every 5 seconds
	var newBlockNum = 0;
	$scope.newBlock = function(){
		newBlockNum = parseInt(web3.eth.blockNumber, 10);
		console.log(newBlockNum);
		if(newBlockNum > $scope.blockNum){
			$scope.blockNum = newBlockNum;
			block = web3.eth.getBlock(newBlockNum);
			block.timestamp = unixTimeToReadable(block.timestamp);
			$scope.blocks.unshift(block);
			$scope.blocks.pop();
		}
		//blockNum.$apply();
		$scope.$apply();
	};
	setInterval(function(){
		$scope.newBlock();
	}, 5000);
    });
