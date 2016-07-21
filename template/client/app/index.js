// 整个应用入口

import app from 'bootstrap/app';

import { appConfig, redirect } from './configs/app';
import { beatConfig, beatErrorHandle } from './configs/beat';
import { analyticsConfig, analyticsInit } from './configs/analytics';
import routeConfig from './configs/routes';

app
  .config(appConfig)
  .config(beatConfig)
  .config(analyticsConfig)
  .config(routeConfig)

  .run(redirect)
  .run(beatErrorHandle)
  .run(analyticsInit);

// 引入其他模块
