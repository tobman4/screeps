//#region Roles
const roleHarvester = require('Role.harvester');
const roleUpgrader = require('Role.upgrader');
const roleBuilder = require('Role.builder');
//#endregion

//#region Controllers
const Spawner = require('Contollers.Spawner');
//#endregion

let Roles = {
    "Harvester": roleHarvester.run,
    "Upgrader": roleBuilder.run,
    "Builder": roleUpgrader.run,
}

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    //console.log("Spawn: " + spawn_name);

    if(Game.spawns['spawn_'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['spawn_'].spawning.name];
        Game.spawns['spawn_'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['spawn_'].pos.x + 1,
            Game.spawns['spawn_'].pos.y,
            {align: 'left', opacity: 0.8});
    }
    Spawner.spawner();


    for(let name in Game.creeps) {
        // TODO: regex -- NO -- use meme
        let creep = Game.creeps[name];
        try {
            Roles[creep.memory.role](creep);
        } catch (err) {
            console.error("Failed to find role for creep: " + name);
        }

    }
}
