<template>
	<div id="app">
		<h1>Vue WebSocket Client</h1>
		<input v-model="message" placeholder="Type a message" />
		<button @click="sendMessage">Send</button>
		<ul>
			<li v-for="(msg, index) in messages" :key="index">{{ msg }}</li>
		</ul>
	</div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
	data() {
		return {
			socket: null,
			message: '',
			messages: [],
		};
	},
	mounted() {
		// Kết nối đến server WebSocket
		this.socket = io(`${process.env.API_URL}/notify`);

		// Lắng nghe sự kiện 'connect'
		this.socket.on('connect', () => {
			console.log('Connected to server');
		});

		// Lắng nghe sự kiện 'message'
		this.socket.on('message', (msg) => {
			this.messages.push(msg);
		});
	},
	methods: {
		sendMessage() {
			if (this.message.trim() !== '') {
				this.socket.emit('message', this.message);
				this.message = '';
			}
		},
	},
	beforeDestroy() {
		// Đóng kết nối khi component bị hủy
		if (this.socket) {
			this.socket.disconnect();
		}
	},
};
</script>

<style>
/* CSS styles cho component */
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	margin-top: 60px;
}
input {
	padding: 10px;
	margin-right: 10px;
}
button {
	padding: 10px;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	padding: 5px 0;
}
</style>
