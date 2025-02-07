const app = vue.createApp({
  data() {
    playerHealth: 100;
    monsterHealth: 100;
    winner: null;
    round: 0;
    logs: [];
  },
  watch: {
    playerHealth(value) {
      if (value === 0) {
        this.winner = "Monster won";
      }
    },
    monsterHealth(value) {
      if (value === 0 && this.playerHealth.value === 0) {
        this.winner = "Its a draw";
      }
    },
  },
  methods: {
    playerAttack() {
      const attack = this.getRandomNumber(5, 12);
      this.monsterHealth = Math.max(monsterHealth-attack,0);
      this.monsterAttack();
    },
    monsterAttack() {
      const attack = this.getRandomNumber(8, 12);
      this.monsterHealth = Math.max(playerHealth-attack,0);
    },
    specialAttack() {
      const attack = this.getRandomNumber(10, 25);
      this.monsterHealth = Math.max(monsterHealth-attack,0);
      this.monsterAttack();
    },
    playerHeal() {
      const healValue = this.getRandomNumber(8, 20);
      this.playerHealth = Math.min(playerHealth+healValue,100);
      this.monsterAttack();
    },
    surrender() {
      this.winner = "Monster won";
    },
    newGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.winner = null;
      this.logs = [];
      this.round = 0;
    },
  },
});

app.mount("#game");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
