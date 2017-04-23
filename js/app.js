var app = angular.module('API', []);

app.controller('WeatherController', function($http, $scope) {
	$http.get('http://api.openweathermap.org/data/2.5/weather?q=Bekasi&units=metric&mode=json&APPID=f9585deb2d84ed107c7f0c72f30819ac').
	then(function(resp) {
		$scope.Data = resp.data;
		$scope.Data.city = resp.data.name;
		$scope.Data.country = resp.data.sys.country;
		$scope.Data.temp = resp.data.main.temp;
		$scope.Data.deg = 'C';
		$scope.Data.change = false;
		$scope.Data.desc = resp.data.weather[0].main;

	$scope.Data.sys = function() {
		if ($scope.Data.change) {
			$scope.Data.deg = 'C';
			$scope.Data.temp = Math.round(resp.data.main.temp);
			return $scope.Data.change = false;
		} else {
			$scope.Data.deg = 'F';
			$scope.Data.temp = Math.round((resp.data.main.temp * 9)/5 + 32);
			return $scope.Data.change = true;
		}
	};

	var climate = resp.data.weather[0].main;
	if (climate === 'Clouds') {
		$('div.cloud').removeClass('hide');
	} else if (climate === 'Clear') {
		$('div.sunny').removeClass('hide');
	} else if (climate === 'Drizzle' || climate === 'Rain') {
		$('div.rainy').removeClass('hide');
	} else if (climate === 'Thunderstorm') {
		$('div.lightning').removeClass('hide');
	} else {
		console.log("Error!!! There's no climate like that in Indonesia");
	}
	});
});

