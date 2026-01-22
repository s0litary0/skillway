import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks";
import GroupsService from "../../../services/GroupsService";
import { useSearchParams } from "react-router-dom";
import Search from "../../UI/Search/Search";
import "./Groups.css";
import Block from "../../UI/Block/Block";
import Spinner from "../../UI/Spinner/Spinner";
import Button from "../../UI/Button/Button";
import AuthService from "../../../services/AuthService";
import CreateGroupModal from "../../UI/Modal/Modal";
import { useTranslation } from "react-i18next";

export default function Groups() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const currentUser = user;
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [error, setError] = useState(null);

  const [group, setGroup] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Load user's current friends
  useEffect(() => {
    if (!user) return;
    const loadFriends = async () => {
      try {
        const data = await GroupsService.getFriends(user.id);

        const friendsWithAvatars = await Promise.all(
          data.map(async (friend) => {
            const friend1Data = await AuthService.getUser(friend.user1.id);
            const friend2Data = await AuthService.getUser(friend.user2.id);

            return {
              ...friend,
              user1_avatar: friend1Data.profile.avatar_base64,
              user2_avatar: friend2Data.profile.avatar_base64,
            };
          }),
        );

        setFriends(friendsWithAvatars);
      } catch (err) {
        console.error(err);
        setError(t("friends_load_failed"));
      }
    };
    loadFriends();
  }, [user, t]);

  const searchForUsers = async (search) => {
    const usersData = await GroupsService.searchUsersByUsername(search);

    const usersWithAvatars = await Promise.all(
      usersData.map(async (usr) => {
        const usrData = await AuthService.getUser(usr.id);

        return {
          ...usr,
          profile: usrData.profile,
        };
      }),
    );

    setSearchedUsers(usersWithAvatars);
  };

  useEffect(() => {
    searchForUsers(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (!user) return;

    const fetchGroup = async () => {
      try {
        console.log(user.id)
        const data = await GroupsService.getGroup(user.id);
        if (data.length == 0) {
          // const notOwner = await Groups.getGroup
          setGroup(null)
          return 
        }
        const memberIds = data[0].members.map(member => member.id);

        const membersWithAvatars = await Promise.all(
          memberIds.map(async (userId) => {
            const userData = await AuthService.getUser(userId);
            return {
              id: userData.user.id,
              username: userData.user.username,
              avatar: userData.profile?.avatar_base64 || null,
            };
          }),
        );

        const enrichedGroup = {
          ...data[0],
          members: membersWithAvatars,
        };
        setGroup(enrichedGroup);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchGroup();
  }, [user]);

  const handleAddFriend = async (friendId) => {
    try {
      const newFriend = await GroupsService.addFriend(user.id, friendId);
      setFriends((prev) => [...prev, newFriend]);
    } catch (err) {
      console.error(err);
      setError(t("friend_add_failed"));
    }
  };

  const openModal = () => setIsCreateOpen(true);
  const closeModal = () => setIsCreateOpen(false);

  const createGroup = async ({ name, members }) => {
    const data = await GroupsService.createGroup(name, user.id, members);

    const memberIds = [user.id, ...members];

    const membersWithAvatars = await Promise.all(
      memberIds.map(async (userId) => {
        const userData = await AuthService.getUser(userId);
        return {
          id: userData.id,
          username: userData.username,
          avatar: userData.profile?.avatar_base64 || null,
        };
      }),
    );

    const enrichedGroup = {
      ...data,
      members: membersWithAvatars,
    };
    setGroup(enrichedGroup);
  };

  const addMember = async () => {};
  const removeMember = async () => {};

  if (!currentUser) {
    return <Spinner />;
  }

  return (
    <div className="groups-page">
      <h1>{t("find_friends")}</h1>
      <Block className="users-search-block">
        <Search placeholder={t("search_friends")} />

        {searchQuery && (
          <div className="search-results">
            <h3>{t("search_results")}</h3>

            {searchQuery && !searchedUsers.length && <p>{t("no_users_found")}</p>}

            <ul className="users-list">
              {searchedUsers.map((user) => {
                if (user.id === currentUser.id) return null;
                return (
                  <li key={user.id} className="users-list__record">
                    <div>
                      <img className="user-img" src={user.profile.avatar_base64} />
                      <span>{user.username}</span>
                      <Button onClick={() => handleAddFriend(user.id)}>
                        {t("add_friend")}
                      </Button>
                    </div>
                  </li>
                );
              })}
            </ul>
            {error && <p className="error">{error}</p>}
          </div>
        )}
      </Block>

      <Block className="friends-list">
        <h3 className="friends-title">{t("your_friends")}</h3>

        {friends.length === 0 ? (
          <p className="friends-empty">{t("no_friends_yet")}</p>
        ) : (
          <ul className="friends-items">
            {friends.map((f) => (
              <li key={f.id} className="friend-item">
                <span>
                  <img className="user-img" src={f.user2.id == user.id ? f.user1_avatar : f.user2_avatar} />
                </span>
                <span className="friend-name">{f.user2.id == user.id ? f.user1.username : f.user2.username}</span>
              </li>
            ))}
          </ul>
        )}
      </Block>

      <CreateGroupModal
        isOpen={isCreateOpen}
        onClose={closeModal}
        onCreate={createGroup}
        friends={friends}
      />

      {!group ? (
        <Block className="group-block create">
          <Button onClick={openModal}>{t("create_group")}</Button>
        </Block>
      ) : (
        <Block className="group-block">
          <header className="group-header">
            <h2 className="group-title">{group?.name}</h2>
            <span className="group-count">
              {t("member_count", { count: group?.members?.length })}
            </span>
          </header>

          <ul className="group-members">
            {group?.members?.length === 0 ? (
              <li className="group-empty">{t("no_members_yet")}</li>
            ) : (
              group?.members?.map((member) => (
                <li key={member.id} className="group-member">
                  <div className="member-info">
                    <img src={member.avatar} alt={member.username} className="user-img" />
                    <span className="member-name">{member.username}</span>
                  </div>

                  <Button className="member-remove" onClick={() => removeMember(member.user_id)}>
                    ✕
                  </Button>
                </li>
              ))
            )}
          </ul>

          <Button className="group-add-btn" onClick={addMember}>
            + {t("add_member")}
          </Button>
        </Block>
      )}
    </div>
  );
}
