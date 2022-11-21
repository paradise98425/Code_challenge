import axios from "axios";

export default {
	get(name) {
		name = name.toLowerCase();
		return axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
	},
};
