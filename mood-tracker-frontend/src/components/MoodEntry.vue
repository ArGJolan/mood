<template>
  <div class="container">
    <!-- <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="true"></loading> -->
    <h1>New Mood Entry</h1>
    <p>{{ submitMessage }}</p>
    <form @submit.prevent="submitMoodEntry">
      <label for="entry_date">Date:</label>
      <input type="date" id="entry_date" v-model="entry_date" required />

      <div class="item">
        <label for="health">Health:</label>
        <emoji-selector
          v-model="mood.health"
          @update:comment="mood.health_comment = $event"
          mood-name="health"
        />
      </div>

      <div class="item">
        <label for="work">work:</label>
        <emoji-selector
          v-model="mood.work"
          @update:comment="mood.work_comment = $event"
          mood-name="work"
        />
      </div>

      <div class="item">
        <label for="romantic_relationship">romantic_relationship:</label>
        <emoji-selector
          v-model="mood.romantic_relationship"
          @update:comment="mood.romantic_relationship_comment = $event"
          mood-name="romantic_relationship"
        />
      </div>

      <div class="item">
        <label for="family_relationships">family_relationships:</label>
        <emoji-selector
          v-model="mood.family_relationships"
          @update:comment="mood.family_relationships_comment = $event"
          mood-name="family_relationships"
        />
      </div>

      <div class="item">
        <label for="friends">friends:</label>
        <emoji-selector
          v-model="mood.friends"
          @update:comment="mood.friends_comment = $event"
          mood-name="friends"
        />
      </div>

      <div class="item">
        <label for="physical_wellness">physical_wellness:</label>
        <emoji-selector
          v-model="mood.physical_wellness"
          @update:comment="mood.physical_wellness_comment = $event"
          mood-name="physical_wellness"
        />
      </div>

      <textarea
        style="margin-bottom:10px"
        v-model="mood.entry_comment"
        placeholder="What happened today?"
      ></textarea>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import EmojiSelector from './EmojiSelector.vue';

export default {
  components: {
    EmojiSelector,
  },
  data() {
    return {
      isLoading: false,
      submitMessage: '',
      entry_date: new Date().toISOString().substr(0, 10),
      mood: {
        health: null,
        work: null,
        romantic_relationship: null,
        family_relationships: null,
        friends: null,
        physical_wellness: null,
        entry_comment: "",
        health_comment: "",
        work_comment: "",
        romantic_relationship_comment: "",
        family_relationships_comment: "",
        friends_comment: "",
        physical_wellness_comment: "",
      },
    };
  },
  beforeMount() {
    if (!localStorage.getItem('authToken')) {
      this.$router.push('/');
    }
  },
  methods: {
    async submitMoodEntry() {

      try {
        const formData = {
          entry_date: this.mood.entry_date,
          health: this.mood.health,
          work: this.mood.work,
          romantic_relationship: this.mood.romantic_relationship,
          family_relationships: this.mood.family_relationships,
          friends: this.mood.friends,
          physical_wellness: this.mood.physical_wellness,
          entry_comment: this.mood.entry_comment,
          health_comment: this.mood.health_comment,
          work_comment: this.mood.work_comment,
          romantic_relationship_comment: this.mood.romantic_relationship_comment,
          family_relationships_comment: this.mood.family_relationships_comment,
          friends_comment: this.mood.friends_comment,
          physical_wellness_comment: this.mood.physical_wellness_comment,
        };
        this.isLoading = true
        await axios.post(
          'http://localhost:3001/api/mood',
          formData,
          {
            headers: {
              Authorization: localStorage.getItem('authToken'),
            },
          }
        );
        this.isLoading = false
        this.submitMessage = 'Mood entry successfully created! Redirecting to frontpage...';
        setTimeout(() => this.$router.push('/'), 3000)
      } catch (error) {
        console.error(error);
        this.submitMessage = 'An error occurred while submitting the entry.';
      }
    },
  },
};
</script>

<style scoped>
.emoji-selector {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  width: 100%;
}

.emoji {
  cursor: pointer;
  opacity: 0.3;
}

.emoji.selected {
  opacity: 1;
}
.item {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
