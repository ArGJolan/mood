<template>
  <div>
    <h1>New Mood Entry</h1>
    <p>{{ submitMessage }}</p>
    <form @submit.prevent="submitMoodEntry">
      <label for="entry_date">Date:</label>
      <input type="date" id="entry_date" v-model="entry_date" required />

      <label for="health">Health:</label>
      <emoji-selector
        v-model="mood.health"
        @update:comment="mood.health_comment = $event"
        mood-name="health"
      />
      <EmojiSelector v-model="health" />

      <label for="work">work:</label>
      <emoji-selector
        v-model="mood.health"
        @update:comment="mood.health_comment = $event"
        mood-name="work"
      />
      <!-- <EmojiSelector v-model="work" /> -->

      <label for="romantic_relationship">romantic_relationship:</label>
      <emoji-selector
        v-model="mood.health"
        @update:comment="mood.health_comment = $event"
        mood-name="romantic_relationship"
      />
      <!-- <EmojiSelector v-model="romantic_relationship" /> -->

      <label for="family_relationships">family_relationships:</label>
      <emoji-selector
        v-model="mood.health"
        @update:comment="mood.health_comment = $event"
        mood-name="family_relationships"
      />
      <!-- <EmojiSelector v-model="family_relationships" /> -->

      <label for="friends">friends:</label>
      <emoji-selector
        v-model="mood.health"
        @update:comment="mood.health_comment = $event"
        mood-name="friends"
      />
      <!-- <EmojiSelector v-model="friends" /> -->

      <label for="physical_wellness">physical_wellness:</label>
      <emoji-selector
        v-model="mood.health"
        @update:comment="mood.health_comment = $event"
        mood-name="physical_wellness"
      />
      <!-- <EmojiSelector v-model="physical_wellness" /> -->

      <!-- Add similar input elements for other mood categories -->

      <textarea
        v-model="mood.entry_comment"
        placeholder="Add a comment for the entire entry..."
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
      mood: {
        entry_date: new Date().toISOString().substr(0, 10),
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
        await axios.post(
          'http://localhost:3001/api/mood',
          formData,
          {
            headers: {
              Authorization: localStorage.getItem('authToken'),
            },
          }
        );
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

.emoji[data-value='0'] {
  color: #FF0000;
}

.emoji[data-value='5'] {
  color: #FFD700;
}

.emoji[data-value='10'] {
  color: #00FF00;
}
</style>
