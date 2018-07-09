angular.module('ethExplorer')
    .controller('assetCtrl', function ($rootScope, $scope, $location, $routeParams,$q) {

	var web3 = $rootScope.web3;
console.log("asset controller");
        $scope.init = function()
        {
			
			console.log($routeParams.assetHash);
			$scope.assetManagerAddress = assetManagerAddress;
            //$scope.assetHash = $routeParams.assetHash;
			var asset = {};
            if($routeParams.assetHash!==undefined) {
			console.log("hello asset");
				
				
				assetManagerInstance.getAsset($routeParams.assetHash,function(error, result) {
					asset.assetHash = result[1];
					asset.fileHashes = result[2];
					console.log(asset.fileHashes[0]);
					asset.confirmatoryNotes = result[3];
				});
				
				
            
            } else {
                $location.path("/");
            }

			$scope.asset = asset;    

        };
		$scope.init();

		var block = {};
		var found = false;
		assetManagerInstance.Create({},{fromBlock : 0, toBlock : 'latest'},function(error,result) {
			if(result.args.assetHash == $routeParams.assetHash && !found){
				found = true;
				console.log(result);
				
				block.hash = result.blockHash;
				block.number = result.blockNumber;
				block.txHash = result.transactionHash;
				$scope.block = block;
			}
			
		});
		
		
				
		
        

function hex2a(hexx) {
    var hex = hexx.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}
});
