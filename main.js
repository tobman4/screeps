//#region Roles
const roleHarvester = require('role/harvester');
const roleUpgrader = require('role/upgrader');
const roleBuilder = require('role/builder');
//#endregion 

//#region Controllers
const Spawner = require('Contollers/Spawner');
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

    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    Spawner.Spawner();

    for(let name in Game.creeps) {
        // TODO: try regex
        let creep = Game.creeps[name];
        try {
            Roles[creep.memory.role](creep);
        } catch (err) {
            console.error("Failed to find role for creep: " + name);
        }
               
    }
}