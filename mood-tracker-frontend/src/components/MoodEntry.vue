<template>
  <div class="container">
    <h1>New Mood Entry</h1>
    <p>{{ submitMessage }}</p>
    <form class="col s12" @submit.prevent="submitMoodEntry">
      <div class="row">
        <div class="input-field col s12">
          <input type="date" id="entry_date" v-model="mood.entry_date" required />
          <label for="entry_date">Date:</label>
        </div>
      </div>
      <div v-for="(item, index) in moodItems" :key="index" class="row">
        <div class="col s12">
          <label :for="item.key">{{ item.label }}</label>
          <emoji-selector
            v-model="mood[item.key]"
            @update:comment="mood[`${item.key}_comment`] = $event"
            :mood-name="item.label"
          />
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <textarea
            id="entry_comment"
            class="materialize-textarea"
            v-model="mood.entry_comment"
          ></textarea>
          <label for="entry_comment">What happened today?</label>
        </div>
      </div>
      <div class="row">
        <div class="col s12">
          <button class="btn waves-effect waves-light" type="submit">
            Submit
          </button>
        </div>
      </div>
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
       moodItems: [
        { key: "health", label: "Health" },
        { key: "work", label: "Work" },
        { key: "romantic_relationship", label: "Romantic Relationship" },
        { key: "family_relationships", label: "Family Relationships" },
        { key: "friends", label: "Friends" },
        { key: "physical_wellness", label: "Physical Wellness" },
      ],
      isLoading: false,
      submitMessage: '',
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
.materialize-textarea:focus {
  outline: none;
  border: 1px solid var(--highlight-color);
  box-shadow: 0 0 5px var(--highlight-color);
}
</style>
