import Friend from "./Friend";

export default function FriendsList({list, handelSelectedFriend, selectedFriend}) {
    return (
        <ul>
            {
                list.map((el) =>
                    <Friend
                        friendItem={el}
                        key={el.id}
                        onSelect={handelSelectedFriend}
                        selectedFriend={selectedFriend}
                    />)
            }
        </ul>
    );
}