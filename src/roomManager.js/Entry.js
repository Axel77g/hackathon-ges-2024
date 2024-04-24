class RoomManager {
    constructor(maxUsersPerRoom = 25) {
        this.maxUsersPerRoom = maxUsersPerRoom;
        this.rooms = {}; // Tracks number of users in each room
    }

    joinRoom(instanceId) {
        this.rooms[instanceId] = (this.rooms[instanceId] || 0) + 1;
        if (this.rooms[instanceId] > this.maxUsersPerRoom) {
            return this.generateNewInstanceId(instanceId); // Room is full, generate a new instance
        }
        return instanceId;
    }

    generateNewInstanceId(baseId) {
        return `${baseId}-${Math.random().toString(36).substring(2, 15)}`;
    }
}
