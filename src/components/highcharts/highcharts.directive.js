(function (ng, $) {
  ng.module('dar.statistics').directive('highcharts', highchartsDirective);

  highchartsDirective.$inject = ['T'];

  function highchartsDirective(T) {
    var isClick = false;

    return {
      restrict: 'A',
      replace: true,
      scope: {
        title: '@',
        items: '='
      },
      link: linkFn
    };

    function linkFn(scope, ele, attrs) {
      if (!window.Highcharts) {
        console.log("highcharts didn't loaded");
        return;
      }

      var defaultConfig = {
        chart: {
          type: 'spline',
          events: {
            click: highchartsClickFn
          }
        },
        credits: {
          enabled: false
        },
        colors: ['#A370AC', '#38499C'],
        title: {
          align: 'left',
          style: {
            color: '#575756',
            fontSize: '16px',
            fontWeight: 'bold'
          }
        },
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            day: '%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
          }
        },
        yAxis: {
          title: {
            text: null
          }
        },
        tooltip: {
          // crosshairs: true,
          dateTimeLabelFormats: {
            day: '%Y-%m-%d',
            week: '%m-%d',
            month: '%Y-%m',
            year: '%Y'
          },
          shared: true
        },
        plotOptions: {
          spline: {
            marker: {
              lineColor: '#666',
              lineWidth: 1
            }
          },
          series: {
            marker: {
              radius: 3
            }
          }
        },
        navigation: {
          buttonOptions: {
            enabled: false
          }
        }
      };

      $(ele).highcharts(mergeOptions(defaultConfig, scope.items, scope.title));

      var chart = $(ele).highcharts();

      scope.$watch(
        'items',
        function (newVal, oldVal) {
          if (newVal === oldVal || !newVal) return;

          var data = optionFormatter(newVal);

          ng.forEach(data.series, function (obj) {
            var chartSeries = chart.get(obj.id);
            if (chartSeries) {
              chartSeries.update(obj, false);
            } else {
              chart.addSeries(obj, false);
            }
          });

          chart.xAxis[0].update(data.xAxis, false);

          chart.redraw();
        },
        true
      );

      scope.$watch('title', function (newTitle) {
        chart.setTitle({
          text: newTitle
        });
      });

      // 点击事件回调
      function highchartsClickFn(e) {
        if (isClick) return;

        isClick = true;
        var id = $(e.target)
          .parents('.chart')
          .attr('id');
        scope.$emit('setCurPopupChart', id);

        $('.large-chart-wrapper')
          .show()
          .on('click', function (e) {
            if (e.target.className != 'large-chart-wrapper') return;
            $(this).hide();
            isClick = false;
            $(this).off('click');
            scope.$emit('setCurPopupChart', '');
          });

        $('#popup-' + id)
          .highcharts()
          .reflow();
      }
    }

    function optionFormatter(options) {
      if (!options) return;

      var newOptions = {
          series: [],
          xAxis: {}
        },
        datetime = options.people.date,
        keys = ['people', 'click'];

      for (var key in options) {
        if (options.hasOwnProperty(key) && keys.indexOf(key) > -1) {
          var count = options[key].count.map(function (item, index) {
            return [+new Date(datetime[index]), +item];
          });

          newOptions.series.push({
            id: key,
            name: T.text(key.toUpperCase()),
            data: count
          });
        }
      }

      return newOptions;
    }

    function mergeOptions(defaultOptions, options, title) {
      var options = optionFormatter(options);

      return ng.merge(
        {
          title: {
            text: title
          }
        },
        defaultOptions,
        options
      );
    }
  }
}(angular, jQuery));
