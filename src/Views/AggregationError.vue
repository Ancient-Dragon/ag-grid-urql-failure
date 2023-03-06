<template>

  <h2 class="text-left">Aggregation Issue with wrapHeaderText</h2>
  <div class="flex">
    <button class="p-button mb-1 p-button-rounded" @click="wrapHeaderText != wrapHeaderText">Toggle Wrap Headers</button>
  </div>
  <CustomGrid
    class="ag-theme-alpine"
    style="height: 500px; width: 97vw"
    :columnDefs="newColumnDefs"
    :rowData="rowData"
    :defaultColDef="defaultColDef"
    rowSelection="multiple"
    animateRows="true"
    @grid-ready="onGridReady"
    :rowGroupPanelShow="'always'"
  />
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import {
  ColDef, IAggFuncParams, ICellRendererParams, ValueGetterParams,
} from 'ag-grid-community';
import { flatten, sum } from 'lodash-es';

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
  available: number,
  children: Vehicle[]
};

const aggregateAvailable = (params: IAggFuncParams<Car, number>): number => {
  console.info('Aggregating available');
  return sum(params.values);
};

const rowData = reactive<Car[]>([{
  make: 'Ford',
  model: 'Mondeo',
  price: 32000,
  wheel: {
    make: 'Pirelli',
    name: 'Soft',
  },
  available: 2,
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
  available: 2,
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
  available: 2,
  wheel: {
    make: 'Pirelli',
    name: 'Mediums',
  },
  children: [],
}, {
  make: 'Ford',
  model: 'Fiesta',
  price: 32000,
  available: 2,
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
}]); // Set rowData to Array of Objects, one Object per Row

// Each Column Definition results in one Column.
const columnDefs = reactive({
  value: [
    { field: 'make', enableRowGroup: true, rowGroup: true },
    { field: 'model', headerName: 'Test Really Column name because this is where we see the issue, issueissueissueissue' },
    { field: 'price' },
    { field: 'available', aggFunc: aggregateAvailable },
  ],
});

const wrapHeaderText = ref(true);

const newColumnDefs = computed<ColDef[]>(() => columnDefs.value.map((r) => ({
  ...r,
  wrapHeaderText: wrapHeaderText.value,
  headerTooltip: r.headerName,
  tooltipValueGetter: undefined,
  tooltipField: undefined,
})));

// DefaultColDef sets props common to all Columns
const defaultColDef = {
  sortable: true,
  filter: true,
  flex: 1,
};

</script>
