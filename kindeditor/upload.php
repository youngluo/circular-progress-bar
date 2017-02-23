<?php

function actionTemp()
{
        $action = new TempAction('temp', $this);
        $return = $action->run();
        $response = Yii::$app->response;
        $request = Yii::$app->request;
    if (!$request->isOptions && !isset($return['error']) || $return['error'] != 0) {
        Yii::warning($return);
        $response->statusCode = 400;
    }
    if (isset($return['message'])) {
        $return['message'] = Yii::t('materials/errors', $return['message']);
    }
        $redirectUrl = Yii::$app->request->post('redirectUrl');
    if (!empty($redirectUrl)) {
        $response = Yii::$app->response;
        $response->off(yii\web\Response::EVENT_BEFORE_SEND);
        $return['url'] = yii\helpers\Url::to('/uploads/temp/' . $return['file'], 'http');
        unset($return['file']);
        Yii::warning($return);
        $return = $redirectUrl . '?return=' . base64_encode(json_encode($return)) . '';
        Yii::$app->response->redirect($return);
        return ;
    }
        return $return;
}


function actionConvert()
{
        Yii::$app->response->format = 'json';
        $return = base64_decode(Yii::$app->request->get('return'));
        $return = json_decode($return, true);
        $return['error'] = 0;
        return $return;
}
