import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';
import router from './router'


let app: any;

// 如果不是在qiankun环境下，直接用原来的代码渲染app
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  createApp(App).use(router).mount('#app');
} else {
  renderWithQiankun({
    // 子应用挂载时候触发，切换页面，当切换出来的时候就会触发
    mount(props) {
      app = createApp(App);
      app.use(router).mount(props.container.querySelector('#app'));
    },
    // 子应用初始化的时候触发，只有第一次初始化的时候触发
    bootstrap() {
      console.log('vue app bootstrap');
    },
    update() {
      console.log('vue app update');
    },
    // 切换页面的时候，切换到别的子应用的时候就会触发
    unmount() {
      console.log('vue app unmount');
      app?.unmount();
    }
  });
}
