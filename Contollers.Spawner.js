let target = {
    "Upgrader": 2,
    "Builder": 1,
    "Harvester": 4,
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

    Game.spawns['spawn_'].spawnCreep(body, name,
        {memory: mem});

}

let spawner = () => {
    Object.keys(target).forEach(type => {
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == type);
        console.log(type + ": " + creeps.length + "/" + target[type]);
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
    "spawner": spawner,
    "set_target": 0
};
