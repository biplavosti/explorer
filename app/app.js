'use strict';
var assetManagerABI = JSON.parse('[{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"}],"name":"cancelAgreement","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"signAgreement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"},{"name":"_receiver","type":"address"}],"name":"createAgreement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"assetHash","type":"bytes32"}],"name":"getAsset","outputs":[{"name":"","type":"address"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"noteHash","type":"bytes32"}],"name":"cancelConfirmatoryNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"noteHash","type":"bytes32"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"sendConfirmatoryNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getAssetCounter","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"noteHash","type":"bytes32"},{"name":"_v","type":"uint8"},{"name":"_r","type":"bytes32"},{"name":"_s","type":"bytes32"}],"name":"signConfirmatoryNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"noteHash","type":"bytes32"}],"name":"resendConfirmatoryNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_assetHash","type":"bytes32"},{"name":"fileHashes","type":"bytes32[]"}],"name":"createAsset","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"}],"name":"resendAgreement","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"noteHash","type":"bytes32"}],"name":"getConfirmatoryNotes","outputs":[{"name":"sender","type":"address"},{"name":"_sv","type":"uint8"},{"name":"_sr","type":"bytes32"},{"name":"_ss","type":"bytes32"},{"name":"receiver","type":"address"},{"name":"_rv","type":"uint8"},{"name":"_rr","type":"bytes32"},{"name":"_rs","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"}],"name":"denyAgreement","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"userManagerContract","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"assetHash","type":"bytes32"}],"name":"getAgreement","outputs":[{"name":"","type":"address"},{"name":"","type":"uint8"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"address"},{"name":"","type":"uint8"},{"name":"","type":"bytes32"},{"name":"","type":"bytes32"},{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"assetHash","type":"bytes32"},{"name":"noteHash","type":"bytes32"}],"name":"denyConfirmatoryNote","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_userManagerContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetHash","type":"bytes32"},{"indexed":false,"name":"fileHashes","type":"bytes32[]"},{"indexed":false,"name":"owner","type":"address"}],"name":"Create","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetHash","type":"bytes32"},{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"state","type":"uint8"}],"name":"AgreementState","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"assetHash","type":"bytes32"},{"indexed":false,"name":"noteHash","type":"bytes32"},{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"state","type":"uint8"}],"name":"ConfirmatoryEventState","type":"event"}]');
var assetManagerAddress = "0xE8064F544Af71a307eaa4A2EB4feE85Ad579a7Fd".toLowerCase();
abiDecoder.addABI(assetManagerABI);

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
