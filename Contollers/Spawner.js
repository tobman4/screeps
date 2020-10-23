let target = {
    "Harvester": 4,
    "Upgrader": 2,
    "Builder": 1,
}

let set_target = (type, new_val) => {
    try {
        target[type] = new_val;
    } catch(err) {
        return false;
    }
    return true;
}

function do_spawn(type,frends) {
    let id = Game.time;
    let name = type + "-" + id;
    let body = [WORK,CARRY,MOVE];
    let mem = {
        role: type,
        id: id,
    };

    Game.spawns['Spawn1'].spawnCreep(body, name, 
        {memory: mem});

}

let Spawner = () => {
    Object.keys(target).forEach(type => {
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == type);

        if(creeps) {
            if(creeps.length < target[type]) {
                do_spawn(type,creeps);
            }
        }

    });

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
}

module.exports = {
    "Targets": target,
    "Spawner": spawner,
    "set_target": 0
};
/*
module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    if(harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
            {memory: {role: 'harvester'}});        
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}
*/