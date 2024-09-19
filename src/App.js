import style from "./index.css";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];


export default function App() {
    return (
        <div className='app'>
            <div className='sidebar'>
                <FriendsList/>
            </div>
        </div>
    );
};

function FriendsList() {
    const friends = initialFriends;
    return (
        <ul>
            {
                friends.map(el => <Friend friendItem={el} key={el.id}/>)
            }
        </ul>
    )
}

function Friend({friendItem}) {
    return (
        <li>
            <img src={friendItem.image} alt={friendItem.name}/>
            <h3>{friendItem.name}</h3>
            {
                (friendItem.balance < 0) &&
                <p className='red'>You owe {friendItem.name} {Math.abs(friendItem.balance)}$</p>

            }
            {
                (friendItem.balance > 0) &&
                <p className='green'>{friendItem.name} owes you {Math.abs(friendItem.balance)}$</p>

            }
            {
                (friendItem.balance === 0) &&
                <p>You and  {friendItem.name} are even</p>

            }

            <button className='button'>Select</button>

        </li>
    )
}