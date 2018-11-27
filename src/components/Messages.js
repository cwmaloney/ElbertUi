"use strict";

const Messages = {
  name: 'messages',

  methods: {
    onDismissClicked(id) {
      this.$store.dispatch('deleteMessage', id);
    }
  },

  template: `
    <div v-if="this.$store.getters.messages.length > 0" class="hl-messages">
      <h1>Messages</h1>

      <div v-for="message in this.$store.getters.messages"
           class="alert" :class="[message.messageClass]" role="alert">
        <button type="button"
                class="close"
                @click="onDismissClicked(message.id)">
          <span aria-hidden="true">&times;</span>
        </button>
        {{message.message}}
      </div>

    </div>
  `
};

