const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      winner: null,
      round: 0,
      logs: [],
    };
  },
  watch: {
    monsterHealth(value) {
      if (value === 0 && this.playerHealth === 0) {
        this.winner = "It's a draw!";
      } else if (value === 0) {
        this.winner = "Player won!";
      }
    },
    playerHealth(value) {
      if (value === 0) {
        this.winner = "Monster won!";
      }
    },
  },
  methods: {
    playerAttack() {
      this.round = ++this.round % 3;
      const attack = getRandomNumber(5, 12);
      this.monsterHealth = Math.max(this.monsterHealth - attack, 0);
      this.logs.unshift(`Player attack -${attack}`);
      this.monsterAttack();
    },
    monsterAttack() {
      const attack = getRandomNumber(8, 12);
      this.playerHealth = Math.max(this.playerHealth - attack, 0);
      this.logs.unshift(`Monster attack -${attack}`);
    },
    specialAttack() {
      this.round = ++this.round % 3;
      const attack = getRandomNumber(10, 25);
      this.monsterHealth = Math.max(this.monsterHealth - attack, 0);
      this.logs.unshift(`Player special attack -${attack}`);
      this.monsterAttack();
    },
    heal() {
      this.round = ++this.round % 3;
      const healValue = getRandomNumber(8, 20);
      this.playerHealth = Math.min(this.playerHealth + healValue, 100);
      this.logs.unshift(`Player heal -${healValue}`);
      this.monsterAttack();
    },
    surrender() {
      this.winner = "Monder won!";
      this.logs.unshift(`Player surrender`);
    },
    newGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.winner = null;
    },
  },
});

app.mount("#game");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}