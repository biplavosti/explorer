'use strict';
var assetManagerABI = JSON.parse('[{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"}],"name":"cancelAgreement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"eventHash","type":"bytes32"}],"name":"getConfirmatoryEvent","outputs":[{"name":"asset","type":"bytes32"},{"name":"cfevent","type":"bytes32"},{"name":"sender","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"onlineFirms","type":"address[]"}],"name":"randomSelection","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"v","type":"uint8"},{"name":"r","type":"bytes32"},{"name":"s","type":"bytes32"}],"name":"signAgreement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"},{"name":"_receiver","type":"address"}],"name":"createAgreement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"eventHash","type":"bytes32"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"sendConfirmatoryEvent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"assetHash","type":"bytes32"}],"name":"getAsset","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"uint8"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"address[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"eventHash","type":"bytes32"}],"name":"cancelConfirmatoryNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"eventHash","type":"bytes32"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"signConfirmatoryEvent","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getContractDetails","outputs":[{"name":"","type":"address"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"signer","type":"address"}],"name":"allowSigner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"}],"name":"denyAgreement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_assetHash","type":"bytes32"},{"name":"_govDoc","type":"bytes32"},{"name":"fileHashes","type":"bytes32[]"},{"name":"_authType","type":"uint8"}],"name":"createAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"signer","type":"address"}],"name":"revokeSigner","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"user","type":"address"}],"name":"hasSignedGovDoc","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"eventHash","type":"bytes32"}],"name":"denyConfirmatoryNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_userManagerContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"assetHash","type":"bytes32"},{"indexed":false,"name":"govDoc","type":"bytes32"},{"indexed":false,"name":"fileHashes","type":"bytes32[]"},{"indexed":false,"name":"_authType","type":"uint8"}],"name":"Create","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetHash","type":"bytes32"},{"indexed":false,"name":"signer","type":"address"},{"indexed":false,"name":"state","type":"uint8"}],"name":"AgreementState","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetHash","type":"bytes32"},{"indexed":false,"name":"noteHash","type":"bytes32"},{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"state","type":"uint8"}],"name":"ConfirmatoryEventState","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetHash","type":"bytes32"},{"indexed":false,"name":"allowedSigner","type":"address"},{"indexed":false,"name":"status","type":"uint8"}],"name":"SignerAllowance","type":"event"}]');
var assetManagerAddress = "0x23A241c2A91f8A34F17f0Fc565bA3EC5b83f951C".toLowerCase();
abiDecoder.addABI(assetManagerABI);
var assetManagerInstance;

function intTimeToReadableShort(timeString){
	var date = new Date(null);
	date.setSeconds(timeString); // specify value for SECONDS here
	return date.toString().split(" ")[4];
}

function intTimeToReadableLong(timeString){
	var date = new Date(null);
	date.setSeconds(timeString); // specify value for SECONDS here
	return date.toString();
}


angular.module('ethExplorer', ['ngRoute','ui.bootstrap'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/main.html',
                controller: 'mainCtrl'
            }).
            when('/block/:blockId', {
                templateUrl: 'views/blockInfos.html',
                controller: 'blockInfosCtrl'
            }).
            when('/transaction/:transactionId', {
                templateUrl: 'views/transactionInfos.html',
                controller: 'transactionInfosCtrl'
            }).
            when('/address/:addressId', {
                templateUrl: 'views/addressInfo.html',
                controller: 'addressInfoCtrl'
            }).
			when('/asset/:assetHash', {
				templateUrl: 'views/assetInfo.html',
				controller : 'assetCtrl'
			}).
            otherwise({
                redirectTo: '/'
            });
    }])
    .run(function($rootScope) {
        var web3 = new Web3();
        var eth_node_url = 'https://explorer.legalfab.com:8547'; // TODO: remote URL
		web3.setProvider(new web3.providers.HttpProvider(eth_node_url));
        $rootScope.web3 = web3;
		assetManagerInstance = web3.eth.contract(assetManagerABI).at(assetManagerAddress);
        function sleepFor( sleepDuration ){
            var now = new Date().getTime();
            while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
        }
        var connected = false;
        if(!web3.isConnected()) {
            $('#connectwarning').modal({keyboard:false,backdrop:'static'}) 
            $('#connectwarning').modal('show') 
        }
    });
