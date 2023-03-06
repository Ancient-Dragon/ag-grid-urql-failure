import { createApp } from 'vue';
import './style.css';
import { AgGridVue } from 'ag-grid-vue3'; // the AG Grid Vue Component
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { LicenseManager } from 'ag-grid-enterprise';
import { createRouter, createWebHashHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import Checkbox from 'primevue/checkbox';
import EditFailure from './Views/EditFailure.vue';
import UrqlFailure from './Views/UrqlFailure.vue';
import App from './App.vue';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css ';
import 'primeflex/primeflex.css';
import RendererFailure from './Views/RendererFailure.vue';
import AggregationError from './Views/AggregationError.vue';

const app = createApp(App);
const routes = [
  { path: '/', component: UrqlFailure },
  { path: '/edit-error', component: EditFailure },
  { path: '/render-error', component: RendererFailure },
  { path: '/aggregation-error', component: AggregationError },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

LicenseManager.setLicenseKey('Test License');
app.component('CustomGrid', AgGridVue);
app.use(PrimeVue);
app.component('Checkbox', Checkbox);
app.use(router);
app.mount('#app');
