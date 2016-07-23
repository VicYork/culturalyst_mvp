'use strict';

// (function() {

// class MainController {

//   constructor($http, $scope, socket) {
//     this.$http = $http;
//     this.socket = socket;
//     this.awesomeThings = [];

//     // TODO:Setup API call to get hero photographer + hero artist name
//     $scope.photographer = 'Photographer: Alex Glustrom';
//     $scope.artist = 'Musician: Andrew Wiseman';

//     $scope.$on('$destroy', function() {
//       socket.unsyncUpdates('thing');
//     });
//   }

//   $onInit() {
//     this.$http.get('/api/things').then(response => {
//       this.awesomeThings = response.data;
//       this.socket.syncUpdates('thing', this.awesomeThings);
//     });
//   }

//   addThing() {
//     if (this.newThing) {
//       this.$http.post('/api/things', { name: this.newThing });
//       this.newThing = '';
//     }
//   }

//   deleteThing(thing) {
//     this.$http.delete('/api/things/' + thing._id);
//   }
// }

// angular.module('mvpApp')
//   .component('main', {
//     templateUrl: 'app/main/main.html',
//     controller: MainController
//   });

// })();

var app = angular.module('mvpApp')


app.controller('MainController', ['$scope','Auth', '$mdBottomSheet',
  function($scope, Auth, $mdBottomSheet) {

  $scope = this;
  $scope.isLoggedIn = function(){
    return Auth.isLoggedIn();
  }

  $scope.getCurrentUser = function(){
    return Auth.getCurrentUser();
    console.log('current user', Auth.getCurrentUser());
  }

  $scope.print = function(){
    console.log('print');
  }

  this.test ='hello world';

  $scope.demo = {
        isOpen: false,
        count: 0,
        selectedDirection: 'left'
      };

  // BottomSheet
  // TODO: Refactor so that the bottomsheet is an independent html
  var listTemplate = '<md-bottom-sheet class="md-list md-has-header"><md-subheader><md-card-header>\
      <md-card-avatar><img class="md-user-avatar" src="../../assets/images/artist_profiles/bMike_profile.png"/></md-card-avatar>\
      <md-card-header-text><span class="md-title">Brandan Odums</span><span class="md-subhead">Graffiti</span>\
      </md-card-header-text></md-card-header></md-subheader><md-list><p>Brandan “Bmike” Odums is a highly sought after visual artist and filmmaker who uses these chosen mediums to tell stories and make statements that transform the minds of viewers as well as the spaces in which his work appears.</p></md-list></md-bottom-sheet>';

// TODO: Refactor so that the bottomsheet opens on each independent card
  $scope.openBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: listTemplate,
      controller: 'MainController',
      parent        : angular.element(document.getElementById('content')),
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  // BottomSheet End

  $scope.featured = [{
    name: 'Brandan Odums',
    medium: 'Visual Art',
    submedium: 'Graffiti',
    story: "Brandan “Bmike” Odums is a highly sought after visual artist and filmmaker who uses these chosen mediums to tell stories and make statements that transform the minds of viewers as well as the spaces in which his work appears.",
    profile: 'bMike_profile.png',
    cover: 'bMike_cover'
  }, {
    name: 'Mwende Katwiwa',
    medium: 'Performance Art',
    submedium: 'Spoken Word',
    story: "Mwende Katwiwa is a 24-year-old Black, Kenyan, Immigrant, Queer, Womyn poet in New Orleans, LA. Ranked 3rd at the 2015 Individual World Poetry Slam, FreeQuency is an Anti-Racist and Reproductive Justice organizer who has spent most of her life living and writing at the intersection of arts, education and activism. In New Orleans, she organizes & advocates with BYP100-NOLA and Women With A Vision, does youth work & poetry with the New Orleans Youth Open Mic and Team Slam New Orleans (Team SNO) and is an African Culture/Fashion Blogger with Noirlinians. View her work at www.FreeQuencySpeaks.com & www.Noirlinians.com.",
    profile: 'mwende_profile.png',
    cover: 'mwende_cover'
  }];
}])

// Bottom Sheet Controller
app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.story="Brandan “Bmike” Odums is a highly sought after visual artist and filmmaker who uses these chosen mediums to tell stories and make statements that transform the minds of viewers as well as the spaces in which his work appears."
})

app.component('main',{
  templateUrl:'app/main/main.html',
  controller: 'MainController'
})