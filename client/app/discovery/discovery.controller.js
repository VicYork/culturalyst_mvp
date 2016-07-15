'use strict';
(function () {

  class DiscoveryComponent {
    constructor($scope) {
      this.$scope = $scope;
      this.$scope.medium = {
        main: '',
        submedium: 'yes'
      };

      this.$scope.test = 'hello world';

      this.$scope.mediaList = [
        {
          name: 'Music',
          submedia: ['Brass', 'Classical', 'Country', 'Experimental', 'Folk', 'Hip-hop', 'Jazz', 'Rock']
        },
        {name: 'Writing', submedia: ['Fiction', 'Non-Fiction', 'Poetry']},
        {
          name: 'Film',
          submedia: ['Documentaries', 'Feature Films', 'Short Films']
        },
        {
          name: 'Visual',
          submedia: ['Acrylics', 'Pastels', 'Watercolor', 'Charcoal', 'Pencil']
        },
        {name: 'Photography', submedia: ['Digital', 'Film']},
        {
          name: 'Dance',
          submedia: ['Ballet', 'Ballroom', 'Hip-hop', 'Lyrical', 'Theater', 'Plays', 'Musicals']
        },
        {name: 'Bearers', submedia: ['Mardi Gras Indians']},
        {name: 'Comedy', submedia: ['Dark', 'Upbeat']},
        {
          name: 'Crafts',
          submedia: ['Crochet', 'Cross Stitch', 'Knitting', 'Lettering Arts']
        },
        {name: 'Design'},
        {name: 'Code', submedia: ['Front-end', 'Back-end', 'Full-stack']},
        {name: 'Sculpture', submedia: ['Clay', 'Metal', 'Wood']}
      ];

      this.$scope.loadSubMediums = function (medium) {
        this.$scope.selectedMedium = medium.name;
        this.$scope.submedia = medium.submedia;
        console.log('submedia loaded');
      };
    }
  }

  angular.module('mvpApp')
    .component('discovery', {
      templateUrl: 'app/discovery/discovery.html',
      controller: DiscoveryComponent
    });

})();

// var app = angular.module('mvpApp')

// app.controller('DiscoveryController', ['$scope','Auth', '$mdBottomSheet',
//   function($scope, Auth, $mdBottomSheet) {
//   	$scope.test ="hello";

//   	$scope.getCurrentUser = function(){
//     	return Auth.getCurrentUser();
//     	console.log('current user', Auth.getCurrentUser());
//   	}

// }];

// app.component('discovery',{
//   templateUrl:'app/discovery/discovery.html',
//   controller: 'DiscoveryController'
// })