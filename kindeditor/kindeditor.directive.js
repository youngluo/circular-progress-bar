;
(function (ng) {
    'use strict';

    ng.module('dar.ngKindeditor.directive', [])
        .directive('kindeditor', kindeditorDirective);

    kindeditorDirective.$inject = ['$timeout'];

    function kindeditorDirective($timeout) {
        return {
            restrict: 'A',
            replace: true,
            require: '?ngModel',
            scope: {
                ngModel: '=',
                config: '=',
                initValue: '='
            },
            link: linkFn
        };

        function linkFn(scope, ele, attr, ngModel) {
            if (!window.KindEditor) {
                console.log('kindeditor didn\'t loaded');
                return;
            }

            var keConfig = {
                width: '100%',
                height: '300px',
                minWidth: 0,
                items: [
                    'undo', 'redo', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste',
                    'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'insertorderedlist',
                    'insertunorderedlist', 'indent', 'outdent', 'subscript', 'superscript', 'clearhtml',
                    'quickformat', 'selectall', 'fullscreen', 'formatblock', 'fontname',
                    'fontsize', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough',
                    'lineheight', 'removeformat', 'table', 'hr', 'emoticons',
                    'image', 'baidumap', 'pagebreak', 'anchor', 'link', 'unlink', 'about'
                ],
                pluginsPath: '/assets/kindeditor/'
            };

            if (scope.config) {
                keConfig = ng.merge(keConfig, scope.config);
            }

            keConfig.afterChange = function () {
                var html = '';

                if (!this.isEmpty()) {
                    html = this.html();
                }

                ngModel.$setViewValue(html);
            }

            $(ele).ready(function () {
                var editor = window.KindEditor.create(ele[0], keConfig),
                    editorContainer = $(editor.container[0]);

                $(editor.edit.iframe[0].contentDocument.body)
                    .focus(function () {
                        editorContainer.addClass('ke-container-active');
                    })
                    .blur(function () {
                        editorContainer.removeClass('ke-container-active');
                    });

                if (scope.initValue) {
                    editor.html(scope.initValue);
                }

                scope.$watch('ngModel', function (newVal, oldVal) {
                    if (newVal == oldVal) return;

                    if (newVal === false) {
                        editor.html('');
                    }
                });
            });
        }
    }

}(angular));


//图文信息kindeditor配置
// vm.kindeditorConfig = {
//     width: '100%',
//     uploadJson: config.urls.materialsUploadTemp,
//     extraFileUploadParams: {
//         redirectUrl: config.urls.htmlRedirectUrl
//     }
// }