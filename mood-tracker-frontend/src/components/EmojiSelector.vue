<template>
  <div class="emoji-selector">
    <div class="emojis">
      <span
        v-for="value in 11"
        :key="value"
        class="emoji"
        :class="{ selected: modelValue === value - 1 }"
        @click="$emit('update:modelValue', modelValue === value - 1 ? null : value - 1)"
        :data-value="value - 1"
        :style="{ color: getColor(value - 1) }"
        role="img"
        :aria-label="getAriaLabel(value - 1)"
      >
        {{ getEmoji(value - 1) }}
      </span>
    </div>
    <textarea
      v-if="modelValue !== null"
      v-model="comment"
      @input="$emit('update:comment', comment)"
      :placeholder="`Add a comment for ${moodName.toLowerCase()}...`"
      class="materialize-textarea white-text"
    ></textarea>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: Number,
    moodName: String,
  },
  data() {
    return {
      comment: '',
    };
  },

  methods: {
    getColor(value) {
      const red = 255 - Math.round((value / 10) * 255);
      const green = Math.round((value / 10) * 255);
      return `rgb(${red}, ${green}, 0)`;
    },
    getEmoji(value) {
      const emojis = ['😞', '😔', '😕', '😐', '😶', '😊', '😀', '😃', '😄', '😁', '😆'];
      return emojis[value];
    },
    getAriaLabel(value) {
      const labels = [
        'Very unhappy',
        'Unhappy',
        'Slightly unhappy',
        'Neutral',
        'Slightly happy',
        'Happy',
        'Very happy',
      ];
      return labels[Math.floor(value / 2)];
    },
  },
};
</script>

<style scoped>
.emoji-selector {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 1.5rem;
  width: 100%;
}

.emojis {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 0.5rem;
}

.emoji {
  cursor: pointer;
  opacity: 0.3;
}

.emoji.selected {
  opacity: 1;
}

.rounded-textarea {
  color: #ccc;
}
</style>
