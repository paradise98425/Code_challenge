import fetchPokemons from "../apis/pokemons";

export default {
	data() {
		return {
			storage: {},
			pokemons: [
				{
					id: 1,
					name: "Charmander",
					image: "charmander.jpg",
					alt: "Charmander pokemon image",
				},
				{
					id: 2,
					name: "Pikachu",
					image: "Pikachu.jpg",
					alt: "Pikachu pokemon image",
				},
				{
					id: 3,
					name: "Ditto",
					image: "Ditto.png",
					alt: "Ditto pokemon image",
				},
			],
			activePokemon: "Pikachu",
			pokemon_abilities: [],
			pokemon_moves: [],
			pokemon_stats: [],
			loading: false,
			errMessasge: "",
			searchWord: "",
			isDisabled: true,
		};
	},
	created: function () {
		this.fetchItem(this.activePokemon);
	},
	methods: {
		selectPokemon(name) {
			this.errMessasge = "";
			this.activePokemon = name;
			// check the global storage to see if the  data exist there
			if (this.storage.hasOwnProperty(name)) {
				this.handleAbilities(this.storage[name]["abilities"]); // handling abilities
				this.handleMoves(this.storage[name]["moves"]); // handling  moves
				this.handleStats(this.storage[name]["stats"]); // handling  stats
			} else {
				this.fetchItem(name);
			}
		},
		async fetchItem(value) {
			this.loading = true;
			fetchPokemons
				.get(value)
				.then((res) => {
					this.storage[value] = res.data;
					this.handleAbilities(res.data["abilities"]); // handling abilities
					this.handleMoves(res.data["moves"]); // handling  moves
					this.handleStats(res.data["stats"]); // handling  stats
					this.loading = false;
				})
				.catch((error) => {
					//error handling
					this.loading = false;
					if (error.response) {
						if (error.response.status === 404) {
							this.errMessasge =
								"Pokemon you requested does exist on database!  ";
						} else {
							this.errMessasge = "Something went wrong! ";
						}
						this.pokemon_abilities = [];
						this.pokemon_moves = [];
						this.pokemon_stats = [];
					}
				});
		},
		handleAbilities(value) {
			var x = [];
			value.map((item) => {
				x.push(item.ability.name);
			});
			this.pokemon_abilities = x;
		},
		handleMoves(value) {
			var y = [];
			value.map((item) => {
				y.push(item.move.name);
			});
			this.pokemon_moves = y;
		},
		handleStats(value) {
			var z = [];
			value.map((item) => {
				z.push({ base_stat: item.base_stat, stat_name: item.stat.name });
			});
			this.pokemon_stats = z;
		},

		handleSearch() {
			if (this.searchWord.trim().length > 0) {
				this.errMessasge = "";
				this.activePokemon = this.searchWord.trim();
				if (this.storage.hasOwnProperty(this.searchWord.trim())) {
					this.handleAbilities(
						this.storage[this.searchWord.trim()]["abilities"]
					); // handling abilities
					this.handleMoves(this.storage[this.searchWord.trim()]["moves"]); // handling  moves
					this.handleStats(this.storage[this.searchWord.trim()]["stats"]); // handling  stats
				} else {
					this.fetchItem(this.searchWord.trim());
				}
			}
		},
	},
	watch: {
		searchWord(value) {
			if (value.trim().length < 1) {
				this.isDisabled = true;
			} else {
				this.isDisabled = false;
			}
		},
	},
};
