<template>
  <CustomGrid
    class="ag-theme-alpine"
    style="height: 500px; width: 97vw"
    :columnDefs="columnDefs.value"
    :rowData="rowData"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    @grid-ready="onGridReady"
    :masterDetail="true"
    :detailCellRenderer="ChildGrid"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import ChildGrid from '../components/ChildGrid.vue';

const gridApi = ref(null); // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params: any) => {
  gridApi.value = params.api;
};

const rowData: any = reactive([{
  make: 'Ford',
  model: 'Mondeo',
  price: 32000,
  children: [
    {
      year: 2020,
      miles: 10000,
      owners: 2,
    },
    {
      year: 2019,
      miles: 15000,
      owners: 1,
    },
  ],
}, {
  make: 'Toyota',
  model: 'Celica',
  price: 35000,
  children: [
    {
      year: 2015,
      miles: 34534,
      owners: 3,
    },
    {
      year: 2017,
      miles: 23155,
      owners: 5,
    },
  ],
}, {
  make: 'Porsche',
  model: 'Boxter',
  price: 72000,
  children: [],
}]); // Set rowData to Array of Objects, one Object per Row

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: [
    { field: 'make', cellRenderer: 'agGroupCellRenderer' },
    { field: 'model' },
    { field: 'price' },
  ],
});

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};

</script>
