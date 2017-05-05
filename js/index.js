/**
 * Created by Administrator on 2017/5/5.
 */
var routerApp = angular.module('routerApp', ['ui.router']);
routerApp.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    console.log("已经进入angular配置");
    /*路由重定向 $urlRouterProvider:如果没有路由引擎能匹配当前的导航状态，那它就会默认将路径路由至 home.html,
     *这个页面就是状态名称被声明的地方. */
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'html/tpls2/home.html'
        })
        /*  nested list with custom controller*/
        .state('home.list', {
            url: '/list',
            templateUrl: 'html/tpls2/home-list.html',
            controller: function($scope) {
                $scope.topics = ['Butterscotch', 'Black Current', 'Mango'];
            }
        })
        // nested list with just some random string data
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'I could sure use a scoop of ice-cream. '
        })
        .state('about', {
            url: '/about',
            /* view 用在该状态下有多个 ui-view 的情况，可以对不同的 ui-view 使用特定的 template, controller, resolve data
             绝对 view 使用 '@' 符号来区别，比如 'columnOne@about' 表明名为 'columnOne' 的 ui-view 使用了 'about' 状态的
             模板(template)，相对 view 则无*/
            views: {
                // 无名 view
                '': {
                    templateUrl: 'html/tpls2/about.html'
                },
                // for "ui-view='columnOne'"
                'columnOne@about': {//在 ui-router 内部，views属性中的每个视图都被按照viewname@statename的方式分配为绝对名称，viewname是目标模板中的ui-view对应的名称，statename是状态的名称，状态名称对应于一个目标模板。@前面部分为空表示未命名的ui-view，@后面为空则表示相对于根模板，通常是 index.html。
                    template: '这里是第一列的内容'
                },
                // for "ui-view='columnTwo'"
                'columnTwo@about': {
                    templateUrl: 'html/tpls2/table-data.html',
                    controller: 'Controller'
                }
            }
        });
}]);
routerApp.controller('Controller',['$scope',function($scope) {
    $scope.message = 'test';
    $scope.topics = [{
        name: 'Butterscotch',
        price: 50
    }, {
        name: 'Black Current',
        price: 100
    }, {
        name: 'Mango',
        price: 20
    }];
}]);