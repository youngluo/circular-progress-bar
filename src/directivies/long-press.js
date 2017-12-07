export default function longPress($timeout, $parse, $swipe) {
    'ngInject';

    return {
        restrict: 'A',
        scope: true,
        link(scope, element, attr) {
            const longPressHandler = $parse(attr.longPress);
            const ON_HOLD_TIMEMS = 500;  // 长按触发事件需要的时间
            let timer = null;

            $swipe.bind(element, {
                start(coords, event) {
                    timer = $timeout(() => {
                        // element.triggerHandler('longPress');
                        longPressHandler(scope, {$event: event});
                    }, ON_HOLD_TIMEMS);
                },
                cancel() {
                    if (timer) $timeout.cancel(timer);
                },
                move() {
                    if (timer) $timeout.cancel(timer);
                },
                end() {
                    if (timer) $timeout.cancel(timer);
                }
            });
        }
    };
}
