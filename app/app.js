'use strict';

abiDecoder.addABI(JSON.parse('[{"anonymous":false,"inputs":[{"indexed":false,"name":"assetId","type":"bytes32"},{"indexed":false,"name":"noteHash","type":"bytes32"},{"indexed":false,"name":"sender","type":"address"}],"name":"AddConfirmatoryNote","type":"event"},{"constant":false,"inputs":[{"name":"assetId","type":"bytes32"},{"name":"noteHash","type":"bytes32"}],"name":"addConfirmatoryNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetId","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"sv","type":"uint8"},{"indexed":false,"name":"sr","type":"bytes32"},{"indexed":false,"name":"ss","type":"bytes32"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"rv","type":"uint8"},{"indexed":false,"name":"rr","type":"bytes32"},{"indexed":false,"name":"rs","type":"bytes32"},{"indexed":false,"name":"state","type":"uint8"}],"name":"DeleteAgreement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetId","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"sv","type":"uint8"},{"indexed":false,"name":"sr","type":"bytes32"},{"indexed":false,"name":"ss","type":"bytes32"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"rv","type":"uint8"},{"indexed":false,"name":"rr","type":"bytes32"},{"indexed":false,"name":"rs","type":"bytes32"},{"indexed":false,"name":"state","type":"uint8"}],"name":"SignAgreement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetId","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"v","type":"uint8"},{"indexed":false,"name":"r","type":"bytes32"},{"indexed":false,"name":"s","type":"bytes32"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"status","type":"uint8"}],"name":"CreateAgreement","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"creator","type":"address"},{"indexed":false,"name":"hash","type":"bytes32"},{"indexed":false,"name":"fileHashes","type":"bytes32[]"}],"name":"Create","type":"event"},{"constant":false,"inputs":[{"name":"assetId","type":"bytes32"}],"name":"cancel","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetId","type":"bytes32"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"},{"name":"_receiver","type":"address"}],"name":"createAgreement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_hash","type":"bytes32"},{"name":"fileHashes","type":"bytes32[]"}],"name":"createAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetId","type":"bytes32"}],"name":"deleteAgreement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetId","type":"bytes32"}],"name":"deny","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetId","type":"bytes32"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"sign","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_userManagerContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"assetId","type":"bytes32"}],"name":"getAgreement","outputs":[{"name":"","type":"address"},{"name":"","type":"uint8"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"address"},{"name":"","type":"uint8"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"assetId","type":"bytes32"}],"name":"getAsset","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"getAssetCounter","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"assetId","type":"bytes32"}],"name":"getConfirmatoryNote","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"userManagerContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]'));

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
            otherwise({
                redirectTo: '/'
            });
    }])
    .run(function($rootScope) {
        var web3 = new Web3();
        var eth_node_url = 'http://localhost:8545'; // TODO: remote URL
	web3.setProvider(new web3.providers.HttpProvider(eth_node_url));
        $rootScope.web3 = web3;
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
