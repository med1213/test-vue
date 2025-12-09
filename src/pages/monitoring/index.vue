<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

const apiList = [
  // Fake DOWN API
  { name: "Fake Error API", method: "GET", url: "/error-test-123" },

  {
    name: "Auth Login",
    method: "POST",
    url: "/auth/login",
    body: { username: "mor_2314", password: "83r5^_" },
  },

  // Users
  { name: "Users List", method: "GET", url: "/users" },
  { name: "User Detail", method: "GET", url: "/users/1" },
  {
    name: "Create User",
    method: "POST",
    url: "/users",
    body: { email: "test@test.com" },
  },
  {
    name: "Update User",
    method: "PUT",
    url: "/users/1",
    body: { email: "updated@test.com" },
  },
  { name: "Delete User", method: "DELETE", url: "/users/1" },

  // Products
  { name: "Products List", method: "GET", url: "/products" },
  { name: "Product Detail", method: "GET", url: "/products/1" },
  {
    name: "Create Product",
    method: "POST",
    url: "/products",
    body: {
      id: 0,
      title: "string",
      price: 0.1,
      description: 88989,
    },
  },
  {
    name: "Update Product",
    method: "PUT",
    url: "/products/1",
    body: { title: "Updated Product" },
  },
  { name: "Delete Product", method: "DELETE", url: "/products/1" },

  // Carts
  { name: "Carts List", method: "GET", url: "/carts" },
  { name: "Cart Detail", method: "GET", url: "/carts/1" },
  { name: "Create Cart", method: "POST", url: "/carts", body: { userId: 1 } },
  { name: "Update Cart", method: "PUT", url: "/carts/1", body: { userId: 2 } },
  { name: "Delete Cart", method: "DELETE", url: "/carts/1" },
];

// monitoring results
const results = ref([]);

async function checkAPI(api) {
  const start = performance.now();
  try {
    let response;

    if (api.method === "GET" || api.method === "DELETE") {
      response = await axios({
        method: api.method,
        url: BASE_URL + api.url,
      });
    } else {
      response = await axios({
        method: api.method,
        url: BASE_URL + api.url,
        data: api.body || {},
      });
    }

    const time = (performance.now() - start).toFixed(0);

    return {
      name: api.name,
      url: api.url,
      status: "UP",
      method: api.method,
      code: response.status,
      time: time + "ms",
      error: "",
      count: 1,
    };
  } catch (error) {
    const time = (performance.now() - start).toFixed(0);

    return {
      name: api.name,
      url: api.url,
      status: "DOWN",
      method: api.method,
      code: error.response?.status || "N/A",
      time: time + "ms",
      error: error.message,
      count: 1,
    };
  }
}

async function runMonitoring() {
  const tempResults = [];

  for (const api of apiList) {
    const r = await checkAPI(api);
    tempResults.push(r);
  }

  results.value = mergeUsageCounts(tempResults);
}

// count usage
const usageMap = {};

function mergeUsageCounts(temp) {
  return temp.map((item) => {
    usageMap[item.url] = (usageMap[item.url] || 0) + 1;
    return { ...item, count: usageMap[item.url] };
  });
}

const mostUsed = () => {
  let max = 0;
  let url = "";
  for (const key in usageMap) {
    if (usageMap[key] > max) {
      max = usageMap[key];
      url = key;
    }
  }
  return url;
};

onMounted(() => {
  runMonitoring();
  setInterval(runMonitoring, 5000); // auto refresh every 5 seconds
});
</script>

<template>
  <div class="monitoring">
    <h2>API Monitoring Dashboard</h2>
    <p class="most-used">
      Most Used API: <strong>{{ mostUsed() }}</strong>
    </p>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>URL</th>
          <th>Status</th>
          <th>Method</th>
          <th>HTTP Code</th>
          <th>Time</th>
          <th>Error</th>
          <th>Usage</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(i, index) in results" :key="index">
          <td>{{ i.name }}</td>
          <td>{{ i.url }}</td>
          <td :class="i.status === 'UP' ? 'up' : 'down'">{{ i.status }}</td>
          <td>{{ i.method }}</td>
          <td>{{ i.code }}</td>
          <td>{{ i.time }}</td>
          <td>{{ i.error }}</td>
          <td>{{ i.count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.monitoring {
  padding: 20px;

  h2 {
    margin-bottom: 10px;
  }

  .most-used {
    margin-bottom: 15px;
    font-size: 14px;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      border: 1px solid #ccc;
      padding: 8px;
      font-size: 14px;
    }
  }

  .up {
    color: green;
    font-weight: bold;
  }

  .down {
    color: red;
    font-weight: bold;
  }
}
</style>
