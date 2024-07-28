<script>
import {
    RouterView
} from 'vue-router'
export default {
    mounted() {
        window.addEventListener('keydown', this.disableShortcuts);
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.disableShortcuts);
    },
    methods: {
        disableShortcuts(event) {
            // Ngăn chặn phím F12
            if (event.keyCode === 123) {
                event.preventDefault();
            }
            // Ngăn chặn Ctrl+Shift+I, Ctrl+Shift+J, và Ctrl+U
            if ((event.ctrlKey && event.shiftKey && (event.keyCode === 73 || event.keyCode === 74)) || (event.ctrlKey && event.keyCode === 85)) {
                event.preventDefault();
            }
            // Ngăn chặn Ctrl+Shift+C
            if (event.ctrlKey && event.shiftKey && event.keyCode === 67) {
                event.preventDefault();
            }
        }
    }
};
</script>

<template>
    <div @contextmenu.prevent>
        <RouterView />
    </div>
</template>

<style>
  
</style>
