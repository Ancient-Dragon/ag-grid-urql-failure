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
    :rowGroupPanelShow="'always'"
  />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { IAggFuncParams, ICellRendererParams, ValueGetterParams } from 'ag-grid-community';
import { flatten } from 'lodash-es';

const gridApi = ref(null); // Optional - for accessing Grid's API

// Obtain API from grid's onGridReady event
const onGridReady = (params: any) => {
  gridApi.value = params.api;
};

type Vehicle = {
  year: number, miles: number, owners: number,
};

type Car = {
  make: string,
  model: string,
  price: number,
  wheel: {
    make: string,
    name: string,
  },
  children: Vehicle[]
};

const cellRenderer = (params: ICellRendererParams<Car, string[]>) => {
  console.info('Cell Renderer', params);
  // This fails because it is a string not an array, even though both aggFunction and valueGetter return both arrays
  return params.value.join(' | ');
};

const aggregateChildren = (params: IAggFuncParams<Car, string>): string[] => {
  const result = flatten(params.values);
  console.info('Aggregate Function', params, result);
  return result;
};

const childrenGetter = (params: ValueGetterParams<Car>): string[] => {
  const carDetails = params.data?.children.map((r) => `${r.year} - ${r.miles} miles`).join(', ');
  return [`${params.data?.children.length}  (${carDetails})`];
};

const rowData = reactive<Car[]>([{
  make: 'Ford',
  model: 'Mondeo',
  price: 32000,
  wheel: {
    make: 'Pirelli',
    name: 'Soft',
  },
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
  wheel: {
    make: 'Pirelli',
    name: 'Hard',
  },
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
  wheel: {
    make: 'Pirelli',
    name: 'Mediums',
  },
  children: [],
}]); // Set rowData to Array of Objects, one Object per Row

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
    {
      field: 'Vehicles', valueGetter: childrenGetter, cellRenderer, enableRowGroup: true, aggFunc: aggregateChildren,
    },
  ],
});

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};

</script>
