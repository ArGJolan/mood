<template>
  <div class="row">
    <div class="col s12">
      <line-chart :data="chartData" :colors="chartOptions.colors"></line-chart>
    </div>
  </div>
</template>

<script>
import api from "../api"

export default {
  data() {
    return {
      chartOptions: {
        colors: ['#ff7b7b', '#ffba92', '#a4f1b0', '#ffdb89', '#d1a3e6', '#9bcdff'],
        library: {
          legend: {
            fontColor: 'white'
          },
        }
      },
      isLoading: false,
      moods: [],
      errorMessage: "",
    };
  },
  async mounted() {
    try {
      this.isLoading = true
      const response = await api.get("http://localhost:3001/api/mood", {
        headers: {
          Authorization: localStorage.getItem('authToken'),
        },
      });
      this.isLoading = false
      this.moods = response.data;
    } catch (error) {
      this.errorMessage = "Error fetching moods";
      console.error(error);
    }
  },
  computed: {
    chartData() {
      if (!this.moods.length) return []

      const data = [
        {
          name: "Health",
          data: {}
        },
        {
          name: "Work",
          data: {}
        },
        {
          name: "Romantic Relationship",
          data: {}
        },
        {
          name: "Family Relationships",
          data: {}
        },
        {
          name: "Friends",
          data: {}
        },
        {
          name: "Physical Wellness",
          data: {}
        },
      ];

      this.moods.forEach((mood) => {
        data[0].data[mood.entry_date] = mood.health;
        data[1].data[mood.entry_date] = mood.work;
        data[2].data[mood.entry_date] = mood.romantic_relationship;
        data[3].data[mood.entry_date] = mood.family_relationships;
        data[4].data[mood.entry_date] = mood.friends;
        data[5].data[mood.entry_date] = mood.physical_wellness;
      });

      return data;
    },
  },
};
</script>

<style scoped>
.chart-container {
  background-color: #2b2b2b;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

</style>
