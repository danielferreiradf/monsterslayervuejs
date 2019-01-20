new Vue({
    el: '#app',
    data: {
        running: false,
        playerHP: 100,
        monsterHP: 100,
        logs: []

    },
    computed: {
        hasResult() {
            return this.playerHP === 0 || this.monsterHP === 0;
        }
    },
    methods: {
        startGame() {
            this.running = true;
            this.playerHP = 100;
            this.monsterHP = 100;
            this.logs = [];
        },
        attack(special) {
            this.damage('monsterHP', 5, 10, special, 'Player', 'Monster', 'player');
            if (this.monsterHP > 0) {
                this.damage('playerHP', 7, 12, true, 'Monster', 'Player', 'monster');
            }
        },
        damage(prop, min, max, special, source, target, cls) {
            const plus = special ? 5 : 0;
            const damage = this.getRandom(min + plus, max + plus);
            this[prop] = Math.max(this[prop] - damage, 0);
            this.logRegister(`${source} attacked ${target} causing ${damage} of damage.`, cls)
        },
        heal(min, max) {
            const heal = this.getRandom(min, max);
            this.playerHP = Math.min(this.playerHP + heal, 100);
            this.logRegister(`Player was healed with ${heal}.`, 'heal');
        },
        healAndDamage() {
            this.heal(15, 20);
            this.damage('playerHP', 7, 12, false, 'Monster', 'Player', 'monster');
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        logRegister(text, cls) {
            this.logs.unshift({ text, cls })
        }
    },
    watch: {
        hasResult(value) {
            if (value) this.running = false;
        }
    }
})