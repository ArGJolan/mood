<template>
  <div>
    <h2>Mood Chart</h2>
    <line-chart :data="chartData" :colors="['#F00', '#0F0', '#00F', '#FF0', '#0FF', '#F0F']"></line-chart>
  </div>
</template>

<script>
import axios from "axios";
// import { LineChart } from "vue-chartkick";

export default {
  // components: {
  //   LineChart,
  // },
  data() {
    return {
      moods: [],
      errorMessage: "",
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:3001/api/moods", {
        headers: {
          Authorization: localStorage.getItem('authToken'),
        },
      });
      this.moods = response.data.moods;
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
