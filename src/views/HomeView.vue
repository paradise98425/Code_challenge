<script>
import mixin from "../services/globals/mixin";

export default {
	mixins: [mixin],
};
</script>

<template>
	<header>
		<!-- div for all three images of pokemons begins -->
		<div class="image-wrapper">
			<div
				:class="`image-container ${
					pokemon.name.toLowerCase() == activePokemon.toLowerCase() && 'active'
				}`"
				v-for="pokemon in pokemons"
				:key="pokemon.id"
				@click="selectPokemon(pokemon.name)"
			>
				<img
					alt="pokemon image"
					class="logo"
					:src="`src/assets/${pokemon.image}`"
				/>
			</div>
		</div>
		<!-- div for all three images of pokemons ends -->
		<!-- div for search bar begins -->
		<div class="search-container">
			<div class="form-wrapper">
				<input
					v-model="searchWord"
					@keyup.enter="handleSearch"
					placeholder="Search for..."
					type="text"
					id="search"
					required
				/>
				<button
					type="submit"
					:class="`search-button ${this.isDisabled && 'disabled'}`"
					@click="handleSearch"
					:disabled="this.isDisabled"
				>
					Search
				</button>
			</div>
		</div>
		<!-- div for search bar ends -->
		<!-- div for post container begins -->
		<div class="post-container">
			<h1>{{ activePokemon }}</h1>
			<div class="loading-container" v-if="this.loading">Loading ...</div>
			<div class="loading-container" v-else-if="this.errMessasge.length > 0">
				{{ this.errMessasge }}
			</div>
			<div class="information-container" v-else>
				<div class="abilities-list">
					<h2>Abilities</h2>
					<ul>
						<li v-for="(item, index) in pokemon_abilities" :key="index">
							<span>{{ item }}</span>
						</li>
					</ul>
				</div>
				<div class="moves-list">
					<h2>Moves</h2>
					<ul>
						<li v-for="(item, index) in pokemon_moves" :key="index">
							<span>{{ item }}</span>
						</li>
					</ul>
				</div>
				<div class="stats">
					<h2>Stats</h2>
					<ul>
						<li v-for="(item, index) in pokemon_stats" :key="index">
							<span>{{ item.stat_name + ":" + item.base_stat }}</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- div for post container ends -->
	</header>
</template>

<style scoped></style>
