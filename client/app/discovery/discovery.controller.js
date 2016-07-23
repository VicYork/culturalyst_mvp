// 'use strict';
// (function(){

// class DiscoveryComponent {
//   constructor($scope) {
//     this.$scope = $scope;
//     this.$scope.medium = {
//     	main: "",
//     	submedium: "yes",
//     };

//     this.$scope.test = "hello world";

//     this.$scope.mediaList = [
//       {'name': 'Music', 'submedia': ['Brass', 'Classical', 'Country', 'Experimental', 'Folk', 'Hip-hop', 'Jazz', 'Rock']},
//       {'name': 'Writing', 'submedia': ['Fiction', 'Non-Fiction', 'Poetry']},
//       {'name': 'Film', 'submedia': ['Documentaries', 'Feature Films', 'Short Films']},
//       {'name': 'Visual', 'submedia': ['Acrylics', 'Pastels', 'Watercolor', 'Charcoal', 'Pencil']},
//       {'name': 'Photography', 'submedia': ['Digital', 'Film']},
//       {'name': 'Dance', 'submedia': ['Ballet', 'Ballroom', 'Hip-hop', 'Lyrical','Theater', 'Plays', 'Musicals']},
//       {'name': 'Bearers', 'submedia': ['Mardi Gras Indians']},
//       {'name': 'Comedy', 'submedia': ['Dark', 'Upbeat']},
//       {'name': 'Crafts', 'submedia': ['Crochet', 'Cross Stitch', 'Knitting', 'Lettering Arts']},
//       {'name': 'Design'},
//       {'name': 'Code', 'submedia': ['Front-end', 'Back-end', 'Full-stack']},
//       {'name': 'Sculpture', 'submedia': ['Clay', 'Metal', 'Wood']},
//     ]

//      this.$scope.loadSubMediums = function(medium){
//       this.$scope.selectedMedium = medium.name;
//       this.$scope.submedia = medium.submedia;
//       console.log("submedia loaded");
//     };
//   }
// }

// angular.module('mvpApp')
//   .component('discovery', {
//     templateUrl: 'app/discovery/discovery.html',
//     controller: DiscoveryComponent
//   });

// })();

'use strict';

angular.module('mvpApp')
.controller('DiscoveryCtrl', function($scope, $http, $location){
 



  //ng-models
  $scope.selectedMedium;
  $scope.selectedSubmedium;

  	$scope.loadSubMediums = function(medium){
  		$scope.selectedMedium = medium.name;
      $scope.submedia = medium.submedia;
      console.log($scope.submedia);
    };

    $scope.test = function(){
    	console.log($scope.selectedSubmedium);
    }



    $scope.getArtists = function() {
    	console.log($scope.selectedMedium);
      $http.get('/api/users/discovery/' + $scope.selectedMedium + '/' + $scope.selectedSubmedium).then(function(response) {
        $scope.artists = response.data;
        console.log(response.data);
      })
    }

  	$scope.mediums = [
			{'name': 'Music', 'submedia': ['Brass', 'Classical', 'Country', 'Experimental', 'Folk', 'Hip-hop', 'Jazz', 'Rock']},
      {'name': 'Writing', 'submedia': ['Fiction', 'Non-Fiction', 'Poetry']},
      {'name': 'Film', 'submedia': ['Documentaries', 'Feature Films', 'Short Films']},
      {'name': 'Visual', 'submedia': ['Acrylics', 'Pastels', 'Watercolor', 'Charcoal', 'Pencil']},
      {'name': 'Photography', 'submedia': ['Digital', 'Film']},
      {'name': 'Dance', 'submedia': ['Ballet', 'Ballroom', 'Hip-hop', 'Lyrical','Theater', 'Plays', 'Musicals']},
      {'name': 'Bearers', 'submedia': ['Mardi Gras Indians']},
      {'name': 'Comedy', 'submedia': ['Dark', 'Upbeat']},
      {'name': 'Crafts', 'submedia': ['Crochet', 'Cross Stitch', 'Knitting', 'Lettering Arts']},
      {'name': 'Design'},
      {'name': 'Code', 'submedia': ['Front-end', 'Back-end', 'Full-stack']},
      {'name': 'Sculpture', 'submedia': ['Clay', 'Metal', 'Wood']},
  ];
  	$scope.mediaList = [
      {'name': 'Music', 'submedia': ['Brass', 'Classical', 'Country', 'Experimental', 'Folk', 'Hip-hop', 'Jazz', 'Rock']},
      {'name': 'Writing', 'submedia': ['Fiction', 'Non-Fiction', 'Poetry']},
      {'name': 'Film', 'submedia': ['Documentaries', 'Feature Films', 'Short Films']},
      {'name': 'Visual', 'submedia': ['Acrylics', 'Pastels', 'Watercolor', 'Charcoal', 'Pencil']},
      {'name': 'Photography', 'submedia': ['Digital', 'Film']},
      {'name': 'Dance', 'submedia': ['Ballet', 'Ballroom', 'Hip-hop', 'Lyrical','Theater', 'Plays', 'Musicals']},
      {'name': 'Bearers', 'submedia': ['Mardi Gras Indians']},
      {'name': 'Comedy', 'submedia': ['Dark', 'Upbeat']},
      {'name': 'Crafts', 'submedia': ['Crochet', 'Cross Stitch', 'Knitting', 'Lettering Arts']},
      {'name': 'Design'},
      {'name': 'Code', 'submedia': ['Front-end', 'Back-end', 'Full-stack']},
      {'name': 'Sculpture', 'submedia': ['Clay', 'Metal', 'Wood']},
    ];

    $scope.ageList = [
      {"age": "age-18"},
      {"age": "age18-24"},
      {"age": "age25-44"},
      {"age": "age45-64"},
      {"age": "age65+"}
    ];

    $scope.orgList = [
      {"org": "true"},
      {"org": "false"}
    ];

    $scope.nativeList = [
      {"natives": "true"},
      {"natives": "false"}
    ];
    $scope.genderList = [
      {"gender": "Female"},
      {"gender": "Male"},
      {"gender": "Transgender"},
      {"gender": "Other"}
    ];

    $scope.expList = [
      {"experience": "Beginner"},
      {"experience": "Intermediate"},
      {"experience": "Professional"},
      {"experience": "Hobbyist"}
    ];



    // //Note: populatePage = fn for when user clicks on medium button
    // //TODO: Have value of dropdown become pageMedium
    // $scope.populatePage = function() {
    //   $scope.pageMedium = $location.path().split('/').pop();
    //   $http.get('/api/users/discovery/' + $scope.pageMedium + '/undefined' ).then(function(response) {
    //     // $('#mediaID').val('Music').change();
    //     $scope.artists = response.data;
    //   })
    // }
    // $scope.populatePage()
});
