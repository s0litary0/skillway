import api from "./api";

export default class GroupsService {
  static async searchUsersByUsername(username) {
    const response = await api.get(`accounts/users/`, {
      params: {
        search: username,
      },
    });
    console.log("Response:", response.data);
    return response.data;
  }

  static async addFriend(userId, friendId) {
    console.log(userId, friendId);
    const response = await api.post(`/groups/friends/`, {
      user1_id: userId,
      user2_id: friendId,
    });
    // console.log(response.data);
    return response.data; 
  }

  static async getFriends(userId) {
    const response = await api.get(`groups/friends/`, {
      params: { user_id: userId },
    });
    return response.data;
  }

  static async createGroup(groupName, ownerId, members) {
    const groupResponse = await api.post(`groups/groups/`, {
        name: groupName,
        owner_id: ownerId
    })

    const group = groupResponse.data;

    const membershipRequests = [
        // owner membership
        api.post("groups/memberships/", {
          group_id: group.id,
          user_id: ownerId,
        }),
    
        // friends memberships
        ...members.map((userId) =>
          api.post("groups/memberships/", {
            group_id: group.id,
            user_id: userId,
          })
        ),
      ];
    
      await Promise.all(membershipRequests);

    return group
  }
  static async getGroup(ownerId) {
    const response = await api.get(`groups/groups/`, {
        params: {
            owner_id: ownerId
        }
    })
    return response.data
  }

}
