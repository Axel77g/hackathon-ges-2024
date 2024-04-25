class RoomManager {
    constructor(maxUsersPerRoom = 0) {
        this.maxUsersPerRoom = maxUsersPerRoom;
        this.rooms = {}; // Tracks number of users in each room
    }

    joinRoom(instanceId) { // Returns the instanceId of the room the user is joining
        this.rooms[instanceId] = (this.rooms[instanceId] || 0) + 1; // Increment the number of users in the room
        if (this.rooms[instanceId] > this.maxUsersPerRoom) { // Room is full
            return this.generateNewInstanceId(instanceId); // Room is full, generate a new instance
        }
        return instanceId; // Room is not full, return the instanceId to be used by the user to enter the room
    }

    generateNewInstanceId(baseId) { // Generates a new instanceId to permit the user to join a new room
        return `${baseId}-${Math.random().toString(36).substring(2, 15)}`;
    }
}

export { RoomManager} 