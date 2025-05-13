--- author ---
author 'SkyLightFox'
description 'An awesome, but short, description'
version '1.0.0'
resource_type 'gametype' { name = 'Roleplay' }
client_script 'mymode_client.js' 
this_is_a_map 'yes' -- can be any value

--- Manifest Files ---

fx_version 'cerulean'
game 'gta5'

resource_type 'gametype' { name = 'My awesome game type!' }

client_script 'mymode_client.js'

const spawnPos = [686.245, 577.950, 130.461];

on('onClientGameTypeStart', () => {
  exports.spawnmanager.setAutoSpawnCallback(() => {
    exports.spawnmanager.spawnPlayer({
      x: spawnPos[0],
      y: spawnPos[1],
      z: spawnPos[2],
      model: 'a_m_m_skater_01'
    }, () => {
      emit('chat:addMessage', {
        args: [
          'Welcome to the party!~'
        ]
      })
    });
  });

  exports.spawnmanager.setAutoSpawn(true)
  exports.spawnmanager.forceRespawn()
});

--- Writing Code 2 ---
// Define a local variable called `spawnPos` with a coordinate somewhere on the map
const spawnPos = [686.245, 577.950, 130.461];

/* 
 * Add an event handler for the (local) event called 'onClientGameTypeStart'. It takes
 * no arguments in this case, since our resource is a game type and you can only run one
 * at once, that means this will basically run when we start ourselves on the client. Nice!
 */
on('onClientGameTypeStart', () => {
  /*
   * Set an automatic spawn callback for the spawn manager. Normally, this works using
   * hardcoded spawn points, but since this is a scripting tutorial we'll do it this way.
   * The spawn manager will call this when the player is dead or when forceRespawn is called.
   */
  exports.spawnmanager.setAutoSpawnCallback(() => {
    // spawnmanager has said we should spawn, let's spawn!
    exports.spawnmanager.spawnPlayer({
      // this argument is basically an object containing the spawn location...
      x: spawnPos[0],
      y: spawnPos[1],
      z: spawnPos[2],
      // ... and the model to spawn as.
      model: 'a_m_m_skater_01'
    }, () => {
      /*
       * A callback to be called once the player is spawned in and the game is visible
       * in this case, we just send a message to the local chat box.
      */
      emit('chat:addMessage', {
        args: [
          'Welcome to my Hangout!~'
        ]
      })
    });
  });

  // Enable auto-spawn.
  exports.spawnmanager.setAutoSpawn(true)

  // And force respawn when the game type starts.
  exports.spawnmanager.forceRespawn()
});

--- Restarting Resources ---
// Restarting resources is a common task in FiveM development. You can do this using the command line or in-game console. To restart a resource, use the following command:
const spawnPos = [-275.522, 6635.835, 7.425]

--- Expanding on this ---
RegisterCommand('car', (source, args, raw) => {
    // TODO: make a vehicle! fun!
    emit('chat:addMessage', {
      args: [`I wish I could spawn this ${(args.length > 0 ? `${args[0]} or` : ``)} adder but my owner was too lazy. :(`]
    });
  }, false);
  // 0x5fa79b0f
// RegisterCommand
void REGISTER_COMMAND(char* commandName, func handler, BOOL restricted);

--- Implementing a car spawner ---
Delay = (ms) => new Promise(res => setTimeout(res, ms));

RegisterCommand('car', async (source, args, raw) => {
  // account for the argument not being passed
  let model = "adder";
  if (args.length > 0)
  {
    model = args[0].toString();
  }

  // check if the model actually exists
  const hash = GetHashKey(model);
  if (!IsModelInCdimage(hash) || !IsModelAVehicle(hash))
  {
    emit('chat:addMessage', {
      args: [`It might have been a good thing that you tried to spawn a ${model}. Who even wants their spawning to actually ^*succeed?`]
    });
    return;   
  }

  // Request the model and wait until the game has loaded it
  RequestModel(hash);
  while (!HasModelLoaded(hash))
  {
    await Delay(500);
  }

  const ped = PlayerPedId();

  // Get the coordinates of the player's Ped (their character)
  const coords = GetEntityCoords(ped);

  // Create a vehicle at the player's position
  const vehicle = CreateVehicle(hash, coords[0], coords[1], coords[2], GetEntityHeading(ped), true, false);

  // Set the player into the drivers seat of the vehicle
  SetPedIntoVehicle(ped, vehicle, -1);

  // Allow the game engine to clean up the vehicle and model if needed
  SetEntityAsNoLongerNeeded(vehicle);
  SetModelAsNoLongerNeeded(model);

  // Tell the player the car spawned
  emit('chat:addMessage', {
    args: [`Woohoo! Enjoy your new hangout^*${model}!`]
  });
}, false);

