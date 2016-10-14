(function() {
    var leaderboard = angular.module('leaderboard', ['ngAnimate', 'angularScreenfull']);

    leaderboard.controller("LeaderboardController", ['$window', '$scope', '$interval', '$timeout', '$http', function($window, $scope, $interval, $timeout, $http) {

        $http.get('https://apis.trainheroic.com/public/leaderboard/468425').success(function(data) {
            $scope.leaderboard = data;
            $scope.results = data.results;
            $scope.index = 1;
            $scope.items = 8;
            $scope.sH = $window.screen.height;

            //If it is a 1080p TV show more items
            if ($scope.sH === 1080)
                $scope.items = 12;

            $scope.next = function() {
                //arrIndex to iterate the collection
                $scope.arrIndex = ($scope.index) * $scope.items;
                if ($scope.arrIndex >= $scope.results.length)
                    $scope.index = 1;
                else
                    $scope.index = $scope.index + 1;

                //Array: Colletction of objects
                $scope.collection = $scope.results.slice($scope.arrIndex - $scope.items, $scope.arrIndex - 1);
                return $scope.collection;
            }
            $scope.leaders = $scope.next();
        });
    }]);


    leaderboard.directive('fade', ['$window', '$animate', '$interval', '$timeout', function($window, $animate, $interval, $timeout) {

        var revs = 5000;
        var sH = $window.screen.height;
        if (sH === 1080)
        //If it is a 1080p TV, don't need to go too fast
            revs = 4000;

        return function($scope, element, attrs) {
            $timeout(function() {
                $animate.enter(element, element.parent());
            }, 0);

            $interval(function() {
                $animate.enter(element, element.parent());
                $scope.leaders = $scope.next();
            }, revs);
        }
    }]);
})();
