/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2024-03-06 09:28:01
 * @LastEditTime: 2024-03-07 16:05:25
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: 
 * @FilePath: \static-service\front\src\index.js
 * 
 */
import { createApp } from 'vue'
import App from "./App.vue";
import routers from './routers/index.js';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

if (!document.getElementById("root")) {
    const div = document.createElement('div');
    div.id = "root";
    document.body.appendChild(div);
}
const app = createApp(App)
app.use(ElementPlus)
app.use(routers)
app.mount('#root')