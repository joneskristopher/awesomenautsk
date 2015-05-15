
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
                EnemyBaseHealth : 10,
                PlayerBaseHealth : 10,
                EnemyCreepHealth : 10,
                PlayerHealth : 10,
                EnemyCreepAttack : 1,
                PlayerAttack : 2,
                //OrcBaseDamage : 10,
                //OrcBaseHealth : 100,
                //OrcBaseSpeed : 4,
                //OrcBaseDefence : 0,
                PlayerAttackTimer : 1000,
                EnemyCreepAttackTimer : 1000,
                PlayerMoveSpeed : 5,
                CreepMoveSpeed : 5,
                GameTimerManager : "",
                HeroDeathManager : "",
                Player : "",
                Exp : 0,
                Gold : 0,
                Exp1 : 0,
                Exp2 : 0,
                Exp3 : 0,
                Exp4 : 0,
                win : "",
                pausePos : "",
                buyscreen : "",
                buytext : ""
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
        
        me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0});

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
                me.pool.register("player", game.PlayerEntity, true);
                me.pool.register("Player base", game.PlayerBaseEntity);
		me.pool.register("Enemy base", game.EnemyBaseEntity);
                me.pool.register("EnemyCreep", game.EnemyCreep, true);
                me.pool.register("GameTimerManager", game.GameTimerManager);
                me.pool.register("HeroDeathManager", game.HeroDeathManager);
                me.pool.register("ExperienceManager", game.ExperienceManager);
                me.pool.register("SpendGold", game.SpendGold);
                me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());
                me.state.set(me.state.SPENDEXP, new game.SpendExp());

		// Start the game.
		me.state.change(me.state.MENU);
	}
};
