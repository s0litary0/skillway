import Block from "../Block/Block";
import Button from "../Button/Button";
import "./Modal.css";
import { useState } from "react";

export default function CreateGroupModal({
  isOpen,
  onClose,
  onCreate,
  friends,
}) {
  const [name, setName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);

  if (!isOpen) return null;

  const toggleFriend = (id) => {
    setSelectedFriends((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const handleCreate = () => {
    onCreate({ name, members: selectedFriends });
    onClose();
  };

  console.log(selectedFriends)

  return (
    <div className="modal-overlay">
      <Block className="modal">
        <h2>Create Group</h2>

        <input
          type="text"
          placeholder="Group name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <h3>Select friends</h3>
        <ul className="friends-select">
          {friends.map((f) => (
            <li key={f.id}>
              <label>
                <span>{f.user1.username}</span>
                <input
                  type="checkbox"
                  checked={selectedFriends.includes(f.user1.id)}
                  onChange={() => toggleFriend(f.user1.id)}
                />
              </label>
            </li>
          ))}
        </ul>

        <div className="modal-actions">
          <Button onClick={handleCreate} disabled={!name}>
            Create
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Block>
    </div>
  );
}
