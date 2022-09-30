import { createApp } from 'vue';
import './style.css';
import { AgGridVue } from 'ag-grid-vue3'; // the AG Grid Vue Component
import EditFailure from './Views/EditFailure.vue';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { LicenseManager } from 'ag-grid-enterprise';
import { createRouter, createWebHashHistory } from 'vue-router';
import PrimeVue from 'primevue/config';
import Checkbox from 'primevue/checkbox';
import UrqlFailure from './Views/UrqlFailure.vue';
import App from './App.vue';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css ';
import 'primeflex/primeflex.css';
// Optional theme CSS
const app = createApp(App);
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: UrqlFailure },
  { path: '/edit-error', component: EditFailure },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

LicenseManager.setLicenseKey('Test License');
app.component('CustomGrid', AgGridVue);
app.use(PrimeVue);
app.component('Checkbox', Checkbox);
app.use(router);
app.mount('#app');
